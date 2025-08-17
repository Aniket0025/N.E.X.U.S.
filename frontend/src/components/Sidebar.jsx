import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaChalkboardTeacher, FaBook, FaUserGraduate, FaBookOpen, FaBullhorn, FaUser, FaHome, FaLayerGroup } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';

const options = [
  { path: '/admin/dashboard', icon: <FaHome />, label: 'Dashboard' },
  { path: '/admin/classes', icon: <FaLayerGroup />, label: 'Classes' },
  { path: '/admin/students', icon: <FaUserGraduate />, label: 'Students' },
  { path: '/admin/subjects', icon: <FaBook />, label: 'Subject' },
  { path: '/admin/teachers', icon: <FaChalkboardTeacher />, label: 'Teachers' },
  { path: '/admin/library', icon: <MdLibraryBooks />, label: 'Digital Library' },
  { path: '/admin/announcements', icon: <FaBullhorn />, label: 'Announcement' },
  { path: '/admin/profile', icon: <FaUser />, label: 'Profile' },
];

import logo from '../assets/nexus-logo.png';

const Sidebar = () => (
  <aside style={{
    width: 240,
    background: '#222',
    color: '#fff',
    minHeight: '100vh',
    padding: '1.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    left: 0,
    top: 0
  }}>
    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
      <img src={logo} alt="Nexus Logo" style={{ width: 48, marginBottom: 8 }} />
      <div style={{ fontSize: '1.6rem', fontWeight: 'bold', letterSpacing: 2 }}>NEXUS</div>
      <div style={{ fontSize: '1rem', marginTop: 4, color: '#00b894' }}>Admin</div>
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
              {opt.icon}
              {opt.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
