import React, { useEffect, useState } from 'react';
import TeacherSidebar from '../components/TeacherSidebar';
import axios from 'axios';
import { teacherTheme, getCardStyle } from '../themes/teacherTheme';

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
      <main style={teacherTheme.components.mainContent}>
        <h2 style={{ 
          color: teacherTheme.colors.textPrimary, 
          marginBottom: teacherTheme.spacing.xl,
          fontSize: teacherTheme.typography.fontSize['3xl'],
          fontWeight: teacherTheme.typography.fontWeight.bold,
          fontFamily: teacherTheme.typography.fontFamily
        }}>👥 Students in Your Courses</h2>
        
        <div style={getCardStyle()}>
          <table style={teacherTheme.components.table}>
            <thead>
              <tr style={{ background: teacherTheme.colors.surfaceHover }}>
                <th style={{ 
                  padding: teacherTheme.spacing.md, 
                  textAlign: 'left',
                  fontWeight: teacherTheme.typography.fontWeight.semibold,
                  color: teacherTheme.colors.textPrimary,
                  borderBottom: `2px solid ${teacherTheme.colors.borderLight}`
                }}>Name</th>
                <th style={{ 
                  padding: teacherTheme.spacing.md, 
                  textAlign: 'left',
                  fontWeight: teacherTheme.typography.fontWeight.semibold,
                  color: teacherTheme.colors.textPrimary,
                  borderBottom: `2px solid ${teacherTheme.colors.borderLight}`
                }}>Email</th>
                <th style={{ 
                  padding: teacherTheme.spacing.md, 
                  textAlign: 'left',
                  fontWeight: teacherTheme.typography.fontWeight.semibold,
                  color: teacherTheme.colors.textPrimary,
                  borderBottom: `2px solid ${teacherTheme.colors.borderLight}`
                }}>Class</th>
                <th style={{ 
                  padding: teacherTheme.spacing.md, 
                  textAlign: 'left',
                  fontWeight: teacherTheme.typography.fontWeight.semibold,
                  color: teacherTheme.colors.textPrimary,
                  borderBottom: `2px solid ${teacherTheme.colors.borderLight}`
                }}>Roll No</th>
                <th style={{ 
                  padding: teacherTheme.spacing.md, 
                  textAlign: 'left',
                  fontWeight: teacherTheme.typography.fontWeight.semibold,
                  color: teacherTheme.colors.textPrimary,
                  borderBottom: `2px solid ${teacherTheme.colors.borderLight}`
                }}>Registration No</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ 
                    color: teacherTheme.colors.textSecondary, 
                    textAlign: 'center', 
                    padding: teacherTheme.spacing.xl,
                    fontSize: teacherTheme.typography.fontSize.lg
                  }}>
                    👥 No students enrolled in your courses yet.
                  </td>
                </tr>
              ) : (
                students.map(s => (
                  <tr key={s._id} style={{ 
                    borderBottom: `1px solid ${teacherTheme.colors.borderLight}`,
                    transition: 'background-color 0.2s ease'
                  }}>
                    <td style={{ 
                      padding: teacherTheme.spacing.md,
                      color: teacherTheme.colors.textPrimary,
                      fontWeight: teacherTheme.typography.fontWeight.medium
                    }}>{s.name}</td>
                    <td style={{ 
                      padding: teacherTheme.spacing.md,
                      color: teacherTheme.colors.textSecondary
                    }}>{s.email}</td>
                    <td style={{ 
                      padding: teacherTheme.spacing.md,
                      color: teacherTheme.colors.textSecondary
                    }}>{s.class?.name || '-'}</td>
                    <td style={{ 
                      padding: teacherTheme.spacing.md,
                      color: teacherTheme.colors.textSecondary,
                      fontWeight: teacherTheme.typography.fontWeight.medium
                    }}>{s.rollNo}</td>
                    <td style={{ 
                      padding: teacherTheme.spacing.md,
                      color: teacherTheme.colors.textSecondary,
                      fontWeight: teacherTheme.typography.fontWeight.medium
                    }}>{s.registrationNumber}</td>
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
