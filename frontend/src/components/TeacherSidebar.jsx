import React from 'react';
import { NavLink } from 'react-router-dom';
import nexusLogo from '../assets/nexus-logo.png';

const options = [
  { path: '/teacher/dashboard', icon: '🏠', label: 'Dashboard' },
  { path: '/teacher/students', icon: '👥', label: 'Students' },
  { path: '/teacher/subjects', icon: '📚', label: 'Subjects' },
  { path: '/teacher/attendance', icon: '🗓️', label: 'Attendance' },
  { path: '/teacher/assignments', icon: '📝', label: 'Assignments' },
  { path: '/teacher/submissions', icon: '📤', label: 'Submissions' },
  { path: '/teacher/library', icon: '📖', label: 'Digital Library' },
  { path: '/teacher/profile', icon: '👤', label: 'Profile' },
];

const TeacherSidebar = ({ teacherName }) => (
  <aside style={{ width: 240, background: '#222', color: '#fff', minHeight: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 100 }}>
    <div style={{ padding: '2rem 0 1rem 0', textAlign: 'center', borderBottom: '1px solid #333' }}>
      <img src={nexusLogo} alt="Nexus Logo" style={{ width: 48, marginBottom: 8 }} />
      <div style={{ fontWeight: 700, fontSize: '1.6rem', letterSpacing: 2, color: '#00b894' }}>NEXUS</div>
      <div style={{ fontSize: '1rem', marginTop: 4, color: '#00b894' }}>{teacherName}</div>
    </div>
    <nav style={{ width: '100%' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {options.map(opt => (
          <li key={opt.label}>
            <NavLink
              to={opt.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                padding: '1rem 2rem',
                color: isActive ? '#00b894' : '#fff',
                background: isActive ? 'rgba(0,184,148,0.1)' : 'transparent',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '1.1rem',
                gap: 16,
                borderLeft: isActive ? '4px solid #00b894' : '4px solid transparent',
                transition: 'all 0.2s'
              })}
            >
              <span>{opt.icon}</span>
              {opt.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default TeacherSidebar;
