import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Public Landing Components
import Header from './components/Header/Header';
import About from './components/About/About';
import Features from './components/Features/Features';
import Ecosystem from './components/Ecosystem/Ecosystem';
import Workflow from './components/Workflow/Workflow';
import CTA from './components/CTA/CTA';

// Auth Pages
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import AuthChoice from './pages/Instructor/AuthChoice';
import InstructorSignup from './pages/Instructor/InstructorSignup';
import InstructorLogin from './pages/Instructor/InstructorLogin';

// Dashboard Shared Layout
import DashboardLayout from './layouts/DashboardLayout';

// Student Dashboard Pages
import Overview from './pages/Dashboard/Overview';
import Courses from './pages/Dashboard/Courses';
import CoursePlayer from './pages/Dashboard/CoursePlayer';
import QuizPage from './pages/Dashboard/QuizPage';
import Assessments from './pages/Dashboard/Assessments';
import Analytics from './pages/Dashboard/Analytics';
import Recommendations from './pages/Dashboard/Recommendations';
import Settings from './pages/Dashboard/Settings';

// Instructor Dashboard Pages
import InstructorDashboard from './pages/Instructor/InstructorDashboard';
import StudentRoster from './pages/Instructor/StudentRoster';
import ClassAnalytics from './pages/Instructor/ClassAnalytics';
import ManageCurriculum from './pages/Instructor/ManageCurriculum';
import RiskMonitoring from './pages/Instructor/RiskMonitoring';

const GOOGLE_CLIENT_ID = "596077338526-grq6o5du48oh7m3pfn9l7deajgv68qko.apps.googleusercontent.com";

const HomePage = () => (
  <div className="bg-slate-50 min-h-screen">
    <Header />
    <About />
    <Features />
    <Ecosystem />
    <Workflow />
    <CTA />
  </div>
);

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instructor-auth" element={<AuthChoice />} />
          <Route path="/instructor/signup" element={<InstructorSignup />} />
          <Route path="/instructor/login" element={<InstructorLogin />} />

          {/* --- STUDENT PORTAL ROUTES --- */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:id" element={<CoursePlayer />} />
            <Route path="quiz/:moduleId" element={<QuizPage />} />
            <Route path="assessments" element={<Assessments />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* --- INSTRUCTOR PORTAL ROUTES --- */}
          <Route path="/instructor" element={<DashboardLayout />}>
            <Route path="dashboard" element={<InstructorDashboard />} />
            
            {/* Placeholders for remaining Instructor pages */}
            <Route path="students" element={<StudentRoster />} />
            <Route path="analytics" element={<ClassAnalytics />} />
            <Route path="curriculum" element={<ManageCurriculum />} />
            <Route path="reports" element={<RiskMonitoring />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;