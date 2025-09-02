import React, { useEffect, useState } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import axios from 'axios';
import { studentTheme, getCardStyle, getButtonStyle, getBadgeStyle } from '../themes/studentTheme';

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
      <main style={studentTheme.components.mainContent}>
        <h2 style={{ 
          color: studentTheme.colors.textPrimary, 
          marginBottom: studentTheme.spacing.xl,
          fontSize: studentTheme.typography.fontSize['3xl'],
          fontWeight: studentTheme.typography.fontWeight.bold,
          fontFamily: studentTheme.typography.fontFamily
        }}>📊 Attendance Records</h2>
        
        {!selectedSubject ? (
          <div>
            <h3 style={{ 
              marginBottom: studentTheme.spacing.lg,
              color: studentTheme.colors.textPrimary,
              fontSize: studentTheme.typography.fontSize.xl,
              fontWeight: studentTheme.typography.fontWeight.semibold
            }}>📚 Your Enrolled Subjects</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: studentTheme.spacing.xl }}>
              {subjects.map(sub => (
                <div 
                  key={sub._id} 
                  style={getCardStyle({ 
                    cursor: 'pointer', 
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    minWidth: 220
                  })} 
                  onClick={() => handleSubjectClick(sub)}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = studentTheme.shadows.lg;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = studentTheme.shadows.md;
                  }}
                >
                  <div style={{ 
                    fontSize: studentTheme.typography.fontSize.lg, 
                    color: studentTheme.colors.primary, 
                    marginBottom: studentTheme.spacing.sm,
                    fontWeight: studentTheme.typography.fontWeight.semibold
                  }}>{sub.name}</div>
                  <div style={{ 
                    color: studentTheme.colors.textSecondary, 
                    fontSize: studentTheme.typography.fontSize.base,
                    display: 'flex',
                    alignItems: 'center',
                    gap: studentTheme.spacing.sm
                  }}>
                    📈 Avg Attendance: 
                    <span style={getBadgeStyle(
                      typeof sub.averageAttendance === 'number' && sub.averageAttendance >= 75 ? 'present' : 'absent'
                    )}>
                      {typeof sub.averageAttendance === 'number' ? `${sub.averageAttendance}%` : 'N/A'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button 
              onClick={() => setSelectedSubject(null)} 
              style={getButtonStyle('secondary', { 
                marginBottom: studentTheme.spacing.lg,
                padding: `${studentTheme.spacing.sm} ${studentTheme.spacing.lg}`
              })}
            >
              ← Back to Subjects
            </button>
            
            <div style={getCardStyle({ marginBottom: studentTheme.spacing.lg })}>
              <h3 style={{ 
                color: studentTheme.colors.textPrimary, 
                marginBottom: studentTheme.spacing.sm,
                fontSize: studentTheme.typography.fontSize.xl,
                fontWeight: studentTheme.typography.fontWeight.semibold
              }}>📚 {selectedSubject.name}</h3>
              {teacher && (
                <div style={{ 
                  color: studentTheme.colors.textSecondary, 
                  marginBottom: studentTheme.spacing.md,
                  fontSize: studentTheme.typography.fontSize.base
                }}>
                  👨‍🏫 Teacher: <strong style={{ color: studentTheme.colors.textPrimary }}>{teacher.name}</strong>
                </div>
              )}
            </div>
            
            {loading ? (
              <div style={getCardStyle({
                textAlign: 'center',
                color: studentTheme.colors.textSecondary,
                fontSize: studentTheme.typography.fontSize.lg,
                padding: studentTheme.spacing.xl
              })}>
                ⏳ Loading attendance sessions...
              </div>
            ) : (
              <div style={getCardStyle()}>
                <table style={studentTheme.components.table}>
                  <thead>
                    <tr style={{ background: studentTheme.colors.surfaceHover }}>
                      <th style={{ 
                        padding: studentTheme.spacing.md, 
                        borderBottom: `2px solid ${studentTheme.colors.borderLight}`,
                        textAlign: 'left',
                        fontWeight: studentTheme.typography.fontWeight.semibold,
                        color: studentTheme.colors.textPrimary
                      }}>📅 Date</th>
                      <th style={{ 
                        padding: studentTheme.spacing.md, 
                        borderBottom: `2px solid ${studentTheme.colors.borderLight}`,
                        textAlign: 'left',
                        fontWeight: studentTheme.typography.fontWeight.semibold,
                        color: studentTheme.colors.textPrimary
                      }}>⏰ Time</th>
                      <th style={{ 
                        padding: studentTheme.spacing.md, 
                        borderBottom: `2px solid ${studentTheme.colors.borderLight}`,
                        textAlign: 'left',
                        fontWeight: studentTheme.typography.fontWeight.semibold,
                        color: studentTheme.colors.textPrimary
                      }}>📝 Topic</th>
                      <th style={{ 
                        padding: studentTheme.spacing.md, 
                        borderBottom: `2px solid ${studentTheme.colors.borderLight}`,
                        textAlign: 'left',
                        fontWeight: studentTheme.typography.fontWeight.semibold,
                        color: studentTheme.colors.textPrimary
                      }}>✅ Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ 
                          padding: studentTheme.spacing.xl, 
                          textAlign: 'center', 
                          color: studentTheme.colors.textSecondary,
                          fontSize: studentTheme.typography.fontSize.lg
                        }}>
                          📊 No attendance sessions found for this subject.
                        </td>
                      </tr>
                    ) : (
                      sessions.map(sess => (
                        <tr key={sess._id} style={{ 
                          borderBottom: `1px solid ${studentTheme.colors.borderLight}`,
                          transition: 'background-color 0.2s ease'
                        }}>
                          <td style={{ 
                            padding: studentTheme.spacing.md,
                            color: studentTheme.colors.textPrimary,
                            fontWeight: studentTheme.typography.fontWeight.medium
                          }}>
                            {new Date(sess.date).toLocaleDateString()}
                          </td>
                          <td style={{ 
                            padding: studentTheme.spacing.md,
                            color: studentTheme.colors.textSecondary
                          }}>
                            {sess.startTime} - {sess.endTime}
                          </td>
                          <td style={{ 
                            padding: studentTheme.spacing.md,
                            color: studentTheme.colors.textSecondary
                          }}>
                            {sess.topic}
                          </td>
                          <td style={{ padding: studentTheme.spacing.md }}>
                            {sess.attendance && sess.attendance.present ? (
                              <span style={getBadgeStyle('present')}>✅ Present</span>
                            ) : (
                              <span style={getBadgeStyle('absent')}>❌ Absent</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentAttendance;
