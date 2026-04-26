import os
import joblib
import smtplib
import numpy as np
import pandas as pd
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from jose import jwt, JWTError
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app import models, schemas, auth
from app.database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ademy API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- LOAD AI MODEL ---
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'student_model.pkl')
trained_model = joblib.load(MODEL_PATH)

# --- AUTHENTICATION DEPENDENCY ---
def get_current_user(db: Session = Depends(get_db), token: str = Depends(auth.oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email: str = payload.get("sub")
        if email is None: raise credentials_exception
    except JWTError: raise credentials_exception
    
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None: raise credentials_exception
    return user

# --- EMAIL SENDER TASK ---
def send_guidance_email(recipient_email: str, student_name: str):
    mail_user = os.getenv("MAIL_USERNAME")
    mail_pass = os.getenv("MAIL_PASSWORD")
    mail_from = os.getenv("MAIL_FROM")
    mail_server = os.getenv("MAIL_SERVER")
    mail_port = int(os.getenv("MAIL_PORT", 587))

    msg = MIMEMultipart()
    msg['From'] = mail_from
    msg['To'] = recipient_email
    msg['Subject'] = "Ademy Academic Guidance Alert"

    body = f"Hello {student_name},\n\nYour instructor has issued a guidance alert based on your recent performance. Please review your dashboard for recommendations."
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP(mail_server, mail_port)
        server.starttls()
        server.login(mail_user, mail_pass)
        server.send_message(msg)
        server.quit()
    except Exception as e:
        print(f"SMTP Error: {e}")

# --- 1. AUTH ENDPOINTS ---
@app.post("/api/signup", response_model=schemas.Token)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user: raise HTTPException(status_code=400, detail="Email already registered")
    hashed_pwd = auth.get_password_hash(user.password)
    new_user = models.User(full_name=user.full_name, email=user.email, hashed_password=hashed_pwd, role=user.role.lower().strip())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    access_token = auth.create_access_token(data={"sub": new_user.email, "role": new_user.role})
    return {"access_token": access_token, "token_type": "bearer", "role": new_user.role, "full_name": new_user.full_name}

@app.post("/api/login", response_model=schemas.Token)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not db_user.hashed_password: raise HTTPException(status_code=401, detail="Invalid credentials")
    if not auth.verify_password(user.password, db_user.hashed_password): raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = auth.create_access_token(data={"sub": db_user.email, "role": db_user.role})
    return {"access_token": access_token, "token_type": "bearer", "role": db_user.role, "full_name": db_user.full_name}

@app.post("/api/auth/google", response_model=schemas.Token)
def google_auth(token_data: schemas.GoogleToken, db: Session = Depends(get_db)):
    user_info = auth.verify_google_token(token_data.token)
    if not user_info: raise HTTPException(status_code=401, detail="Invalid Google Token")
    email = user_info.get("email")
    name = user_info.get("name")
    db_user = db.query(models.User).filter(models.User.email == email).first()
    if not db_user:
        db_user = models.User(full_name=name, email=email, role="student")
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    access_token = auth.create_access_token(data={"sub": db_user.email, "role": db_user.role})
    return {"access_token": access_token, "token_type": "bearer", "role": db_user.role, "full_name": db_user.full_name} 

# --- 2. INSTRUCTOR RISK & INTERVENTION ---
@app.get("/api/instructor/dashboard-stats")
def get_dashboard_stats(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "teacher": raise HTTPException(status_code=403)
    students = db.query(models.User).filter(models.User.role == "student").all()
    all_scores = db.query(func.avg(models.QuizResult.score)).scalar() or 0
    at_risk_list = []
    total_prob = 0
    for s in students:
        avg_s = sum([r.score for r in s.scores]) / len(s.scores) if s.scores else 65.0
        input_df = pd.DataFrame([[3, 1, avg_s]], columns=['study_time', 'absences', 'quiz_score'])
        prob = trained_model.predict_proba(input_df)[0][1]
        total_prob += prob
        if prob < 0.8: at_risk_list.append(s)
    
    modules = db.query(models.Module).all()
    chart = [{"name": f"Mod {m.id}", "avg": round(db.query(func.avg(models.QuizResult.score)).filter_by(module_id=m.id).scalar() or 0)} for m in modules[:6]]

    return {
        "active_students": len(students),
        "avg_proficiency": f"{round(all_scores, 1)}%",
        "at_risk_alerts": str(len(at_risk_list)).zfill(2),
        "success_prediction": f"{round((total_prob/len(students))*100)}%" if students else "100%",
        "bottleneck_chart": chart,
        "priority_list": [{"name": s.full_name, "risk": "High", "score": "38%", "img": f"https://ui-avatars.com/api/?name={s.full_name}"} for s in at_risk_list[:3]]
    }

@app.get("/api/instructor/risk-analysis")
def get_risk_analysis(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "teacher": raise HTTPException(status_code=403)
    students = db.query(models.User).filter(models.User.role == "student").all()
    risk_report = []
    for s in students:
        avg_score = sum([r.score for r in s.scores]) / len(s.scores) if s.scores else 65.0
        input_df = pd.DataFrame([[3, 1, avg_score]], columns=['study_time', 'absences', 'quiz_score'])
        prob = trained_model.predict_proba(input_df)[0][1]
        
        # INCREASED SENSITIVITY: Flag if prob < 85% or if any quiz failed
        failed_quizzes = [r for r in s.scores if r.score < 50]
        if prob < 0.85 or failed_quizzes:
            risk_report.append({
                "student_name": s.full_name,
                "email": s.email,
                "pass_probability": round(prob * 100, 1),
                "reason": f"Failed {len(failed_quizzes)} modules" if failed_quizzes else "Inconsistent performance",
                "risk_level": "High" if prob < 0.5 else "Medium",
                "avatar": f"https://ui-avatars.com/api/?name={quote(s.full_name)}&background=fff1f2&color=e11d48"
            })
    return risk_report

@app.post("/api/instructor/send-guidance")
def send_guidance(student_email: str, student_name: str, background_tasks: BackgroundTasks, current_user: models.User = Depends(get_current_user)):
    if current_user.role != "teacher": raise HTTPException(status_code=403)
    background_tasks.add_task(send_guidance_email, student_email, student_name)
    return {"status": "success"}

# --- 3. COMMON DATA ENDPOINTS ---
@app.get("/api/instructor/students")
def get_instructor_students(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    students = db.query(models.User).filter(func.lower(models.User.role) == "student").all()
    total_lessons = db.query(models.Lesson).count()
    return [{"id": s.id, "name": s.full_name, "email": s.email, "role": s.role, "gpa": round((sum([r.score for r in s.scores])/len(s.scores) if s.scores else 0)/20, 2), "progress": round(len(s.progress)/total_lessons*100, 1) if total_lessons > 0 else 0, "risk": "At Risk", "avatar": f"https://ui-avatars.com/api/?name={s.full_name}"} for s in students]

@app.get("/api/instructor/class-analytics")
def get_faculty_analytics(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    modules = db.query(models.Module).all()
    perf = [{"module": m.title, "avg": round(db.query(func.avg(models.QuizResult.score)).filter_by(module_id=m.id).scalar() or 0, 1)} for m in modules[:6]]
    return {"module_performance": perf, "risk_dist": [{"name": "At Risk", "value": 2, "color": "#f43f5e"}, {"name": "On Track", "value": 8, "color": "#10b981"}]}

@app.get("/api/instructor/curriculum-overview")
def get_curr_overview(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    courses = db.query(models.Course).all()
    return [{"id": c.id, "title": c.title, "category": c.category, "modules_count": len(c.modules), "lessons_count": sum(len(m.lessons) for m in c.modules), "instructor": c.instructor, "thumbnail": c.thumbnail} for c in courses]

# --- 4. STUDENT CORE ---
@app.get("/api/user/ai-status")
def student_status(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    res = db.query(models.QuizResult).filter_by(user_id=current_user.id).order_by(models.QuizResult.taken_at.desc()).first()
    score = res.score if res else 65.0
    input_df = pd.DataFrame([[3, 1, score]], columns=['study_time', 'absences', 'quiz_score'])
    return {"status": "On Track" if trained_model.predict(input_df)[0] == 1 else "At Risk", "pass_probability": round(trained_model.predict_proba(input_df)[0][1]*100, 1), "recommendation": "Maintain consistency"}

@app.get("/api/user/grades")
def get_user_grades(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return db.query(models.QuizResult).filter_by(user_id=current_user.id).all()

@app.get("/api/user/progress")
def get_user_progress(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return [p.lesson_id for p in db.query(models.LessonProgress).filter_by(user_id=current_user.id, is_completed=True).all()]

@app.get("/api/courses")
def get_all_courses(db: Session = Depends(get_db)):
    return db.query(models.Course).all()

@app.get("/api/courses/{course_id}")
def get_one_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter_by(id=course_id).first()
    return {"id": course.id, "title": course.title, "modules": [{"id": m.id, "title": m.title, "lessons": [{"id": l.id, "title": l.title, "content": l.content} for l in m.lessons]} for m in course.modules]}

@app.post("/api/lessons/{lesson_id}/complete")
def mark_lesson(lesson_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not db.query(models.LessonProgress).filter_by(user_id=current_user.id, lesson_id=lesson_id).first():
        db.add(models.LessonProgress(user_id=current_user.id, lesson_id=lesson_id, is_completed=True))
        db.commit()
    return {"status": "success"}

@app.get("/api/modules/{module_id}/quiz")
def get_quiz(module_id: int, db: Session = Depends(get_db)):
    quiz = db.query(models.Quiz).filter_by(module_id=module_id).first()
    return quiz.questions if quiz else []

@app.post("/api/modules/{module_id}/quiz/submit")
def submit_quiz(module_id: int, answers: List[str], db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    quiz = db.query(models.Quiz).filter_by(module_id=module_id).first()
    correct = sum(1 for i, q in enumerate(quiz.questions) if i < len(answers) and answers[i] == q['answer'])
    score = (correct / len(quiz.questions)) * 100
    db.add(models.QuizResult(user_id=current_user.id, module_id=module_id, score=score, total_questions=len(quiz.questions), correct_answers=correct))
    db.commit()
    return {"score": score, "correct": correct, "total": len(quiz.questions)}

def quote(s):
    from urllib.parse import quote
    return quote(s)