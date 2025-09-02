import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NexusLogo from '../assets/nexus-logo.png';
import { studentTheme } from '../themes/studentTheme';

const options = [
  { path: '/student/dashboard', icon: '🏠', label: 'Dashboard' },
  { path: '/student/attendance', icon: '🗓️', label: 'Attendance' },
  { path: '/student/assignments', icon: '📝', label: 'Assignments' },
  { path: '/student/meetings', icon: '📹', label: 'Online Meetings' },
  { path: '/student/library', icon: '📖', label: 'Digital Library' },
  { path: '/student/announcements', icon: '📢', label: 'Announcements' },
  { path: '/student/profile', icon: '👤', label: 'Profile' },
];

const StudentSidebar = ({ studentName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <aside style={studentTheme.components.sidebar}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: `${studentTheme.spacing.xl} 0 ${studentTheme.spacing.lg} 0`,
        borderBottom: `1px solid ${studentTheme.colors.sidebarBorder}`
      }}>
        <img src={NexusLogo} alt="Nexus" style={{ width: 48, height: 48, marginBottom: 10 }} />
        <div style={{ 
          fontWeight: studentTheme.typography.fontWeight.bold, 
          fontSize: studentTheme.typography.fontSize.xl, 
          color: studentTheme.colors.primary, 
          letterSpacing: 1 
        }}>NEXUS</div>
        <div style={{ 
          margin: `${studentTheme.spacing.lg} 0 ${studentTheme.spacing.sm} 0`, 
          color: studentTheme.colors.sidebarText, 
          fontWeight: studentTheme.typography.fontWeight.medium, 
          fontSize: studentTheme.typography.fontSize.base
        }}>{studentName}</div>
      </div>
      <nav style={{ marginTop: studentTheme.spacing.md }}>
        {options.map(opt => (
          <div
            key={opt.path}
            onClick={() => navigate(opt.path)}
            style={{
              display: 'flex', 
              alignItems: 'center', 
              gap: 14, 
              padding: `${studentTheme.spacing.lg} ${studentTheme.spacing.xl}`, 
              cursor: 'pointer',
              background: location.pathname === opt.path ? studentTheme.colors.sidebarActive : 'transparent', 
              color: location.pathname === opt.path ? studentTheme.colors.primary : studentTheme.colors.sidebarText, 
              fontWeight: studentTheme.typography.fontWeight.medium, 
              fontSize: studentTheme.typography.fontSize.base,
              transition: 'all 0.2s ease',
              borderLeft: location.pathname === opt.path ? `4px solid ${studentTheme.colors.primary}` : '4px solid transparent',
              fontFamily: studentTheme.typography.fontFamily
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{opt.icon}</span>
            <span>{opt.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default StudentSidebar;
