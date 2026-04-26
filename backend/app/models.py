from sqlalchemy import Column, Integer, String, Text, ForeignKey, Float, DateTime, JSON, Boolean
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

# 1. Course Table
class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    instructor = Column(String)
    category = Column(String)
    thumbnail = Column(String)
    
    modules = relationship("Module", back_populates="course", cascade="all, delete-orphan")

# 2. Module Table
class Module(Base):
    __tablename__ = "modules"
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    title = Column(String)
    order = Column(Integer)
    
    course = relationship("Course", back_populates="modules")
    lessons = relationship("Lesson", back_populates="module", cascade="all, delete-orphan")
    quiz = relationship("Quiz", back_populates="module", uselist=False)
    # Link to quiz results
    quiz_results = relationship("QuizResult", back_populates="module")

# 3. Lesson Table
class Lesson(Base):
    __tablename__ = "lessons"
    id = Column(Integer, primary_key=True, index=True)
    module_id = Column(Integer, ForeignKey("modules.id"))
    title = Column(String)
    content = Column(Text) 
    order = Column(Integer)
    
    module = relationship("Module", back_populates="lessons")
    progress = relationship("LessonProgress", back_populates="lesson")

# 4. Quiz Table (The template/questions)
class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(Integer, primary_key=True, index=True)
    module_id = Column(Integer, ForeignKey("modules.id"))
    questions = Column(JSON) 
    
    module = relationship("Module", back_populates="quiz")

# 5. LessonProgress Table (Who finished what lesson)
class LessonProgress(Base):
    __tablename__ = "lesson_progress"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    lesson_id = Column(Integer, ForeignKey("lessons.id"))
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="progress")
    lesson = relationship("Lesson", back_populates="progress")

# 6. QuizResult Table (Scores)
class QuizResult(Base):
    __tablename__ = "quiz_results"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    module_id = Column(Integer, ForeignKey("modules.id"))
    score = Column(Float)
    total_questions = Column(Integer)
    correct_answers = Column(Integer)
    taken_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="scores")
    module = relationship("Module", back_populates="quiz_results")

# 7. User Table (At the bottom so it can reference everything above)
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String)
    email = Column(String, unique=True)
    hashed_password = Column(String, nullable=True)
    role = Column(String, default="student")
    
    progress = relationship("LessonProgress", back_populates="user")
    scores = relationship("QuizResult", back_populates="user")