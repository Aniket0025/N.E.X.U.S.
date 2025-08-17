import React, { useEffect, useState } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import axios from 'axios';

const StudentAttendance = () => {
  const [student, setStudent] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('nexus_student');
    if (stored) setStudent(JSON.parse(stored));
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const token = localStorage.getItem('nexus_student_token');
    try {
      const res = await axios.get('http://localhost:5000/api/student/subjects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubjects(res.data.subjects || []);
    } catch {
      setSubjects([]);
    }
  };

  const handleSubjectClick = async (subject) => {
    setSelectedSubject(subject);
    setLoading(true);
    const token = localStorage.getItem('nexus_student_token');
    try {
      const res = await axios.get(`http://localhost:5000/api/student/subjects/${subject._id}/attendance`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSessions(res.data.sessions || []);
      setTeacher(res.data.teacher || null);
    } catch {
      setSessions([]);
      setTeacher(null);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <StudentSidebar studentName={student?.name || ''} />
      <main style={{ marginLeft: 220, padding: '2.5rem', flex: 1, background: '#f7f8fa', minHeight: '100vh' }}>
        <h2 style={{ color: '#222', marginBottom: '2rem' }}>Attendance</h2>
        {!selectedSubject ? (
          <div>
            <h3 style={{ marginBottom: 18 }}>Subjects Enrolled</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {subjects.map(sub => (
                <div key={sub._id} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.07)', padding: '1.2rem 2rem', minWidth: 220, cursor: 'pointer', fontWeight: 500 }} onClick={() => handleSubjectClick(sub)}>
                  <div style={{ fontSize: 18, color: '#0984e3', marginBottom: 6 }}>{sub.name}</div>
                  <div style={{ color: '#636e72', fontSize: 15 }}>Avg Attendance: {typeof sub.averageAttendance === 'number' ? `${sub.averageAttendance}%` : '-'}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button onClick={() => setSelectedSubject(null)} style={{ marginBottom: 18, background: 'none', color: '#0984e3', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: 16 }}>← Back to Subjects</button>
            <h3 style={{ color: '#222', marginBottom: 10 }}>{selectedSubject.name}</h3>
            {teacher && <div style={{ color: '#636e72', marginBottom: 12 }}>Teacher: <b>{teacher.name}</b></div>}
            {loading ? <div>Loading sessions...</div> : (
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
                <thead>
                  <tr style={{ background: '#f1f2f6', textAlign: 'left' }}>
                    <th style={{ padding: '0.7rem', borderBottom: '1px solid #dfe6e9' }}>Date</th>
                    <th style={{ padding: '0.7rem', borderBottom: '1px solid #dfe6e9' }}>Time</th>
                    <th style={{ padding: '0.7rem', borderBottom: '1px solid #dfe6e9' }}>Topic</th>
                    <th style={{ padding: '0.7rem', borderBottom: '1px solid #dfe6e9' }}>Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.length === 0 ? (
                    <tr><td colSpan={4} style={{ padding: '1.2rem', textAlign: 'center', color: '#636e72' }}>No sessions found.</td></tr>
                  ) : (
                    sessions.map(sess => (
                      <tr key={sess._id}>
                        <td style={{ padding: '0.7rem' }}>{new Date(sess.date).toLocaleDateString()}</td>
                        <td style={{ padding: '0.7rem' }}>{sess.startTime} - {sess.endTime}</td>
                        <td style={{ padding: '0.7rem' }}>{sess.topic}</td>
                        <td style={{ padding: '0.7rem' }}>
                          {sess.attendance && sess.attendance.present ? (
                            <span style={{ color: '#00b894', fontWeight: 600 }}>Present</span>
                          ) : (
                            <span style={{ color: '#d63031', fontWeight: 600 }}>Absent</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentAttendance;
