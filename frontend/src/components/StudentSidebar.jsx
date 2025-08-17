import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NexusLogo from '../assets/nexus-logo.png';

const options = [
  { path: '/student/dashboard', icon: '🏠', label: 'Dashboard' },
  { path: '/student/attendance', icon: '🗓️', label: 'Attendance' },
  { path: '/student/assignments', icon: '📝', label: 'Assignments' },
  { path: '/student/library', icon: '📖', label: 'Digital Library' },
  { path: '/student/announcements', icon: '📢', label: 'Announcements' },
  { path: '/student/profile', icon: '👤', label: 'Profile' },
];

const StudentSidebar = ({ studentName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <aside style={{ width: 220, background: '#fff', height: '100vh', position: 'fixed', left: 0, top: 0, boxShadow: '2px 0 12px rgba(0,0,0,0.05)', zIndex: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 0 1rem 0' }}>
        <img src={NexusLogo} alt="Nexus" style={{ width: 48, height: 48, marginBottom: 10 }} />
        <div style={{ fontWeight: 700, fontSize: 22, color: '#0984e3', letterSpacing: 1 }}>NEXUS</div>
        <div style={{ margin: '1.2rem 0 0.5rem 0', color: '#636e72', fontWeight: 500, fontSize: 16 }}>{studentName}</div>
      </div>
      <nav style={{ marginTop: 10 }}>
        {options.map(opt => (
          <div
            key={opt.path}
            onClick={() => navigate(opt.path)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '0.9rem 2rem', cursor: 'pointer',
              background: location.pathname === opt.path ? '#f1f2f6' : 'transparent', color: location.pathname === opt.path ? '#0984e3' : '#222', fontWeight: 500, fontSize: 16
            }}
          >
            <span style={{ fontSize: 22 }}>{opt.icon}</span>
            <span>{opt.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default StudentSidebar;
