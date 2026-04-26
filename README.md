# Ademy: Intelligent E-Learning System

![License](https://img.shields.io/badge/License-MIT-blue.svg) 
![Python](https://img.shields.io/badge/Python-3.9+-3776AB.svg?logo=python) 
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg?logo=fastapi) 
![React](https://img.shields.io/badge/React-18+-61DAFB.svg?logo=react) 
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4.svg?logo=tailwindcss)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-316192.svg?logo=postgresql)
![AI/ML](https://img.shields.io/badge/AI/ML-Scikit--learn-F7931E.svg?logo=scikit-learn)

## 🎯 Executive Summary
The **Ademy Intelligent E-Learning System** is a full-stack web application designed to automate and enhance academic monitoring. It replaces traditional static learning platforms with a dynamic, **AI-driven predictive engine** that analyzes student performance, identifies learning gaps, and provides proactive interventions.

The system caters to two primary user roles:
-   **Students** receive a personalized learning dashboard, AI-driven recommendations, and real-time progress tracking.
-   **Instructors** gain access to a powerful faculty portal for class-wide performance analytics, at-risk student identification, and streamlined curriculum management.

Built with modern web technologies (FastAPI for backend, React for frontend, Supabase for PostgreSQL), Ademy ensures transparent and data-driven academic support for all stakeholders.

## ✨ Key Features

### For Students:
-   **Personalized Dashboard:** Overview of CGPA, quiz evaluations, and AI-predicted pass probability.
-   **Comprehensive Course Library:** Access to specialized technical courses with detailed modules and lessons.
-   **Interactive Classroom Player:** Engaging reading experience with lesson progress tracking and completion marks.
-   **AI-Generated Quizzes:** Module-specific evaluations with real-time scoring.
-   **AI Recommendations:** Tailored study paths and remediation suggestions based on performance.
-   **Academic Transcript:** Exportable PDF of all AI-verified examination results.

### For Instructors:
-   **Faculty Dashboard:** Key Performance Indicators (KPIs) for class health, average proficiency, and AI-driven at-risk alerts.
-   **Student Roster:** Detailed, searchable list of all students with individual GPAs, progress, and AI risk status.
-   **Class Analytics:** Visual charts (Bar & Pie) highlighting curriculum mastery bottlenecks and overall risk distribution.
-   **Risk Monitoring & Intervention:** Proactive identification of struggling students with the ability to send personalized email guidance.
-   **Curriculum Management:** Overview of course structure, module counts, and lesson counts with a printable Syllabus Audit.

## 🧠 AI & Machine Learning Core

Ademy's intelligence is powered by a **Random Forest Classifier**, a supervised machine learning model that was **trained on a synthetic student performance dataset**. This model is integrated into the FastAPI backend and provides:
-   **Student Risk Prediction:** Calculates a "Pass Probability" for each student based on their quiz scores, study habits (simulated), and engagement. Flags students as "On Track" or "At Risk."
-   **Targeted Recommendations:** Uses risk assessments to guide students to specific modules requiring review.
-   **Quiz Generation:** While the core prediction uses the trained model, module quizzes are intelligently crafted based on the content of the module's lessons, providing relevant and challenging evaluations.

## 🛠️ Technology Stack

### Backend:
-   **Python 3.12:** Primary language.
-   **FastAPI:** High-performance web framework for API development.
-   **SQLAlchemy:** ORM for database interactions.
-   **PostgreSQL (via Supabase):** Robust relational database.
-   **Scikit-learn:** For the trained AI / Machine Learning model (`student_model.pkl`).
-   **Bcrypt:** Secure password hashing.
-   **JWT (python-jose):** Secure user authentication.
-   **python-dotenv:** Environment variable management.
-   **smtplib:** For sending email notifications.

### Frontend:
-   **React 18 (with TypeScript):** UI library for building interactive interfaces.
-   **Vite:** Fast development server and build tool.
-   **Tailwind CSS 3:** Utility-first CSS framework for rapid styling.
-   **Framer Motion:** For smooth UI animations and transitions.
-   **React Router DOM v6:** Client-side routing.
-   **Recharts:** Powerful library for data visualization (charts).
-   **jsPDF & jspdf-autotable:** For generating high-quality PDF reports (Transcripts, Roster, Syllabus).
-   **Axios:** HTTP client for API requests with interceptors for auth handling.
-   **@react-oauth/google:** Google OAuth integration.
-   **react-hot-toast:** For sleek, animated notifications.

## 🚀 Local Installation & Setup

### Prerequisites:
-   Python 3.9+
-   Node.js (LTS version) & npm
-   Git

### 1. Clone the Repository:
```bash
git clone https://github.com/your-username/Ademy.git
cd Ademy

2. Backend Setup:
code Bash

cd backend
python -m venv venv
source venv/Scripts/activate  # On Windows Git Bash/WSL; use `venv\Scripts\activate` on Windows CMD
pip install -r requirements.txt
python train_model.py       # This trains and saves your AI model as student_model.pkl
python seed.py              # This populates your database with courses, modules, and lessons
# Ensure you've set up your .env file in the backend root as per documentation!
uvicorn app.main:app --reload

Note: The train_model.py creates student_model.pkl and seed.py creates ademy.db (SQLite) with your curriculum. For email functionality, configure MAIL_* variables in .env.
3. Frontend Setup:
code Bash

cd ../frontend
npm install
# Ensure you've set up your .env file in the frontend root with `VITE_API_URL=http://localhost:8000`
npm run dev

4. Database (Local Development):

The backend uses SQLite (ademy.db) locally. If you wish to reset the database and content, simply delete backend/ademy.db and re-run python seed.py.
🌐 Deployment (Cloud Architecture)

    Frontend: Hosted on Vercel (frontend directory). Connected to GitHub for automatic deployments.

    Backend: Hosted on Render.com (backend directory). Connected to GitHub for automatic deployments.

    Database: Supabase (PostgreSQL).

Note: For cloud deployment, ensure DATABASE_URL, SECRET_KEY, GOOGLE_CLIENT_ID, and MAIL_* environment variables are configured on Render for the backend. On Vercel, VITE_API_URL should point to your Render backend URL.
🚀 How to Use

    Access: Navigate to http://localhost:5173/ (frontend local URL).

    Student Flow:

        Register on /signup (or Google Login).

        Explore My Courses, Assessments, Analytics, AI Recommendations.

        Take quizzes to update your AI performance profile.

    Instructor Flow:

        Register on /instructor/signup (specify role="teacher" in form data for a new instructor account via backend, or use the InstructorSignup page which defaults to role: "teacher").

        Navigate to /instructor/dashboard.

        Monitor Student Roster, Class Analytics, and Risk Monitoring.

        Send Guidance Emails to at-risk students.

📄 Full Technical Documentation

For a complete, in-depth overview of the system's architecture, API reference, security protocols, and future considerations, please refer to the detailed Technical Documentation.
🤝 Contributing

Contributions are welcome! Please fork the repository and submit pull requests.
📝 License

This project is licensed under the MIT License.