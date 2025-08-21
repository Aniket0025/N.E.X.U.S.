import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';
import SignInSelect from './pages/SignInSelect';
import TeacherLogin from './pages/TeacherLogin';
import StudentLogin from './pages/StudentLogin';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import Classes from './pages/Classes';
import Subjects from './pages/Subjects';
import Teachers from './pages/Teachers';
import Students from './pages/Students';
import Announcements from './pages/Announcements';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherSubjects from './pages/TeacherSubjects';
import TeacherStudents from './pages/TeacherStudents';
import TeacherAttendance from './pages/TeacherAttendance';
import StudentDashboard from './pages/StudentDashboard';
import StudentAttendance from './pages/StudentAttendance';
import TeacherMeetings from './pages/TeacherMeetings';
import StudentMeetings from './pages/StudentMeetings';
import GoogleMeetPage from './pages/GoogleMeetPage';

// Protected Route for Admin
const RequireAdminAuth = ({ children }) => {
  const token = localStorage.getItem('nexus_admin_token');
  const location = useLocation();
  // Optionally, validate JWT here (e.g., expiration)
  if (!token) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
};

// Protected Route for Teacher
const RequireTeacherAuth = ({ children }) => {
  const token = localStorage.getItem('nexus_teacher_token');
  const location = useLocation();
  if (!token) {
    return <Navigate to="/teacher/login" state={{ from: location }} replace />;
  }
  return children;
};

// Protected Route for Student
const RequireStudentAuth = ({ children }) => {
  const token = localStorage.getItem('nexus_student_token');
  const location = useLocation();
  if (!token) {
    return <Navigate to="/student/login" state={{ from: location }} replace />;
  }
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/signin" element={<SignInSelect />} />
      <Route path="/teacher/login" element={<TeacherLogin />} />
      <Route path="/teacher/dashboard" element={<RequireTeacherAuth><TeacherDashboard /></RequireTeacherAuth>} />
      <Route path="/teacher/subjects" element={<RequireTeacherAuth><TeacherSubjects /></RequireTeacherAuth>} />
      <Route path="/teacher/students" element={<RequireTeacherAuth><TeacherStudents /></RequireTeacherAuth>} />
      <Route path="/teacher/attendance" element={<RequireTeacherAuth><TeacherAttendance /></RequireTeacherAuth>} />
      <Route path="/teacher/meetings" element={<RequireTeacherAuth><TeacherMeetings /></RequireTeacherAuth>} />
      <Route path="/teacher/google-meet" element={<RequireTeacherAuth><GoogleMeetPage /></RequireTeacherAuth>} />
      <Route path="/student/login" element={<StudentLogin />} />
<Route path="/student/dashboard" element={<RequireStudentAuth><StudentDashboard /></RequireStudentAuth>} />
<Route path="/student/attendance" element={<RequireStudentAuth><StudentAttendance /></RequireStudentAuth>} />
<Route path="/student/meetings" element={<RequireStudentAuth><StudentMeetings /></RequireStudentAuth>} />
      <Route path="/admin/dashboard" element={<RequireAdminAuth><AdminDashboard /></RequireAdminAuth>} />
      <Route path="/admin/classes" element={<RequireAdminAuth><Classes /></RequireAdminAuth>} />
      <Route path="/admin/subjects" element={<RequireAdminAuth><Subjects /></RequireAdminAuth>} />
      <Route path="/admin/teachers" element={<RequireAdminAuth><Teachers /></RequireAdminAuth>} />
      <Route path="/admin/students" element={<RequireAdminAuth><Students /></RequireAdminAuth>} />
      <Route path="/admin/announcements" element={<RequireAdminAuth><Announcements /></RequireAdminAuth>} />
      {/* Add protected routes for other /admin pages here */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
