import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ teachers: 0, students: 0, classes: 0 });
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const token = localStorage.getItem('nexus_admin_token');
    try {
      const res = await axios.get('http://localhost:5000/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCounts({
        teachers: res.data.teacherCount || 0,
        students: res.data.studentCount || 0,
        classes: res.data.classCount || 0,
      });
      setAnnouncements(res.data.announcements || []);
    } catch {
      setCounts({ teachers: 0, students: 0, classes: 0 });
      setAnnouncements([]);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: 240, padding: '2.5rem', flex: 1, background: '#f7f8fa', minHeight: '100vh' }}>
        <h2 style={{ color: '#222', marginBottom: '2rem' }}>Dashboard</h2>
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem' }}>
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: '1.5rem 2.5rem', minWidth: 180 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#0984e3' }}>{counts.teachers}</div>
            <div style={{ color: '#636e72', fontWeight: 500 }}>Teachers</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: '1.5rem 2.5rem', minWidth: 180 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#00b894' }}>{counts.students}</div>
            <div style={{ color: '#636e72', fontWeight: 500 }}>Students</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: '1.5rem 2.5rem', minWidth: 180 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#fdcb6e' }}>{counts.classes}</div>
            <div style={{ color: '#636e72', fontWeight: 500 }}>Classes</div>
          </div>
        </div>
        <section>
          <h3 style={{ color: '#222', marginBottom: '1rem' }}>Announcements</h3>
          {announcements.length === 0 ? (
            <div style={{ color: '#636e72' }}>No announcements yet.</div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {announcements.map((a, idx) => (
                <li key={idx} style={{ background: '#fff', borderRadius: 8, padding: '1rem', marginBottom: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontWeight: 'bold', color: '#222' }}>{a.title}</div>
                  <div style={{ color: '#636e72', marginTop: 4 }}>{a.content}</div>
                  <div style={{ color: '#b2bec3', fontSize: '0.9rem', marginTop: 6 }}>{new Date(a.createdAt).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
