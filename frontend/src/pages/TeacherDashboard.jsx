import React, { useEffect, useState } from 'react';
import TeacherSidebar from '../components/TeacherSidebar';
import axios from 'axios';

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [counts, setCounts] = useState({ students: 0 });
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('nexus_teacher');
    if (stored) setTeacher(JSON.parse(stored));
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const token = localStorage.getItem('nexus_teacher_token');
    try {
      const res = await axios.get('http://localhost:5000/api/teacher/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCounts({ students: res.data.studentCount || 0 });
      setAnnouncements(res.data.announcements || []);
    } catch {
      setCounts({ students: 0 });
      setAnnouncements([]);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <TeacherSidebar teacherName={teacher?.name || ''} />
      <main style={{ marginLeft: 240, padding: '2.5rem', flex: 1, background: '#f7f8fa', minHeight: '100vh' }}>
        <h2 style={{ color: '#222', marginBottom: '2rem' }}>Dashboard</h2>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: '1.5rem 2.5rem', minWidth: 220, marginBottom: '2rem' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#0984e3' }}>{counts.students}</div>
          <div style={{ color: '#636e72', fontWeight: 500 }}>Students in your subjects</div>
        </div>
        <section>
          <h3 style={{ color: '#222', marginBottom: '1rem' }}>Announcements from Admin</h3>
          {announcements.length === 0 ? (
            <div style={{ color: '#636e72', textAlign: 'center' }}>No announcements yet.</div>
          ) : (
            announcements.map(a => (
              <div key={a._id} style={{ borderBottom: '1px solid #f1f2f6', marginBottom: '1.2rem', paddingBottom: '1.2rem' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#222' }}>{a.title}</div>
                <div style={{ color: '#636e72', margin: '0.5rem 0 0.7rem 0' }}>{a.content}</div>
                <div style={{ fontSize: '0.85rem', color: '#b2bec3' }}>Posted {new Date(a.createdAt).toLocaleString()}</div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default TeacherDashboard;
