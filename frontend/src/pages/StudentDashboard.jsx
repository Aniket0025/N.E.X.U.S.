import React, { useEffect, useState } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import axios from 'axios';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [subjectCount, setSubjectCount] = useState(0);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('nexus_student');
    if (stored) setStudent(JSON.parse(stored));
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const token = localStorage.getItem('nexus_student_token');
    try {
      const res = await axios.get('http://localhost:5000/api/student/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubjectCount(res.data.subjectCount || 0);
      setAnnouncements(res.data.announcements || []);
    } catch {
      setSubjectCount(0);
      setAnnouncements([]);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <StudentSidebar studentName={student?.name || ''} />
      <main style={{ marginLeft: 220, padding: '2.5rem', flex: 1, background: '#f7f8fa', minHeight: '100vh' }}>
        <h2 style={{ color: '#222', marginBottom: '2rem' }}>Dashboard</h2>
        <div style={{ display: 'flex', gap: 40, marginBottom: 32 }}>
          <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 6px rgba(0,0,0,0.07)', padding: '2rem 2.5rem', minWidth: 220, textAlign: 'center' }}>
            <div style={{ fontSize: 38, fontWeight: 700, color: '#0984e3' }}>{subjectCount}</div>
            <div style={{ color: '#636e72', fontSize: 17, marginTop: 8 }}>Subjects Enrolled</div>
          </div>
        </div>
        <div style={{ marginTop: 30 }}>
          <h3 style={{ color: '#222', marginBottom: 16 }}>Admin Announcements</h3>
          {announcements.length === 0 ? (
            <div style={{ color: '#636e72' }}>No announcements yet.</div>
          ) : (
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {announcements.map(a => (
                <li key={a._id} style={{ background: '#fff', borderRadius: 7, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: '1rem 1.5rem', marginBottom: 18 }}>
                  <div style={{ fontWeight: 600, color: '#0984e3', fontSize: 17 }}>{a.title}</div>
                  <div style={{ color: '#636e72', marginTop: 6 }}>{a.content}</div>
                  <div style={{ color: '#b2bec3', fontSize: 13, marginTop: 4 }}>{new Date(a.createdAt).toLocaleString()}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
