import React, { useEffect, useState } from 'react';
import TeacherSidebar from '../components/TeacherSidebar';
import axios from 'axios';

const TeacherStudents = () => {
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('nexus_teacher');
    if (stored) setTeacher(JSON.parse(stored));
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const token = localStorage.getItem('nexus_teacher_token');
    try {
      const res = await axios.get('http://localhost:5000/api/teacher/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data.students || []);
    } catch {
      setStudents([]);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <TeacherSidebar teacherName={teacher?.name || ''} />
      <main style={{ marginLeft: 240, padding: '2.5rem', flex: 1, background: '#f7f8fa', minHeight: '100vh' }}>
        <h2 style={{ color: '#222', marginBottom: '2rem' }}>Students in Your Courses</h2>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f1f2f6' }}>
                <th style={{ padding: '0.7rem', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '0.7rem', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '0.7rem', textAlign: 'left' }}>Class</th>
                <th style={{ padding: '0.7rem', textAlign: 'left' }}>Roll No</th>
                <th style={{ padding: '0.7rem', textAlign: 'left' }}>Registration No</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr><td colSpan={5} style={{ color: '#636e72', textAlign: 'center', padding: '1.5rem' }}>No students enrolled.</td></tr>
              ) : (
                students.map(s => (
                  <tr key={s._id}>
                    <td style={{ padding: '0.7rem' }}>{s.name}</td>
                    <td style={{ padding: '0.7rem' }}>{s.email}</td>
                    <td style={{ padding: '0.7rem' }}>{s.class?.name || '-'}</td>
                    <td style={{ padding: '0.7rem' }}>{s.rollNo}</td>
                    <td style={{ padding: '0.7rem' }}>{s.registrationNumber}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TeacherStudents;
