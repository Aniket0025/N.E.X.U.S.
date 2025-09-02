import React from 'react';
import { NavLink } from 'react-router-dom';
import nexusLogo from '../assets/nexus-logo.png';
import { teacherTheme } from '../themes/teacherTheme';

const options = [
  { path: '/teacher/dashboard', icon: '🏠', label: 'Dashboard' },
  { path: '/teacher/students', icon: '👥', label: 'Students' },
  { path: '/teacher/subjects', icon: '📚', label: 'Subjects' },
  { path: '/teacher/attendance', icon: '🗓️', label: 'Attendance' },
  { path: '/teacher/meetings', icon: '📹', label: 'Add Meeting' },
  { path: '/teacher/assignments', icon: '📝', label: 'Assignments' },
  { path: '/teacher/submissions', icon: '📤', label: 'Submissions' },
  { path: '/teacher/library', icon: '📖', label: 'Digital Library' },
  { path: '/teacher/profile', icon: '👤', label: 'Profile' },
];

const TeacherSidebar = ({ teacherName }) => (
  <aside style={teacherTheme.components.sidebar}>
    <div style={{ 
      padding: `${teacherTheme.spacing.xl} 0 ${teacherTheme.spacing.lg} 0`, 
      textAlign: 'center', 
      borderBottom: `1px solid ${teacherTheme.colors.sidebarBorder}` 
    }}>
      <img src={nexusLogo} alt="Nexus Logo" style={{ width: 48, marginBottom: 8 }} />
      <div style={{ 
        fontWeight: teacherTheme.typography.fontWeight.bold, 
        fontSize: teacherTheme.typography.fontSize['2xl'], 
        letterSpacing: 2, 
        color: teacherTheme.colors.primary 
      }}>NEXUS</div>
      <div style={{ 
        fontSize: teacherTheme.typography.fontSize.base, 
        marginTop: 4, 
        color: teacherTheme.colors.primary,
        fontWeight: teacherTheme.typography.fontWeight.medium
      }}>{teacherName}</div>
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
                padding: `${teacherTheme.spacing.lg} ${teacherTheme.spacing.xl}`,
                color: isActive ? teacherTheme.colors.primary : teacherTheme.colors.sidebarText,
                background: isActive ? teacherTheme.colors.sidebarActive : 'transparent',
                textDecoration: 'none',
                fontWeight: teacherTheme.typography.fontWeight.medium,
                fontSize: teacherTheme.typography.fontSize.lg,
                gap: 16,
                borderLeft: isActive ? `4px solid ${teacherTheme.colors.primary}` : '4px solid transparent',
                transition: 'all 0.2s ease',
                fontFamily: teacherTheme.typography.fontFamily
              })}
            >
              <span style={{ fontSize: '1.2rem' }}>{opt.icon}</span>
              {opt.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default TeacherSidebar;
