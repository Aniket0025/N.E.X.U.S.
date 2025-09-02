import React, { useEffect, useState } from 'react';
import StudentSidebar from '../components/StudentSidebar';
import axios from 'axios';
import { studentTheme, getCardStyle } from '../themes/studentTheme';

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
      <main style={studentTheme.components.mainContent}>
        <h2 style={{ 
          color: studentTheme.colors.textPrimary, 
          marginBottom: studentTheme.spacing.xl,
          fontSize: studentTheme.typography.fontSize['3xl'],
          fontWeight: studentTheme.typography.fontWeight.bold,
          fontFamily: studentTheme.typography.fontFamily
        }}>🎓 Student Dashboard</h2>
        
        <div style={{ display: 'flex', gap: studentTheme.spacing.xl, marginBottom: studentTheme.spacing.xl }}>
          <div style={getCardStyle({ 
            minWidth: 220, 
            textAlign: 'center',
            background: `linear-gradient(135deg, ${studentTheme.colors.primary}, ${studentTheme.colors.primaryLight})`,
            color: studentTheme.colors.textLight
          })}>
            <div style={{ 
              fontSize: studentTheme.typography.fontSize['4xl'], 
              fontWeight: studentTheme.typography.fontWeight.bold 
            }}>{subjectCount}</div>
            <div style={{ 
              fontSize: studentTheme.typography.fontSize.lg, 
              marginTop: studentTheme.spacing.sm,
              fontWeight: studentTheme.typography.fontWeight.medium,
              opacity: 0.9
            }}>Subjects Enrolled</div>
          </div>
        </div>
        
        <section style={getCardStyle()}>
          <h3 style={{ 
            color: studentTheme.colors.textPrimary, 
            marginBottom: studentTheme.spacing.lg,
            fontSize: studentTheme.typography.fontSize.xl,
            fontWeight: studentTheme.typography.fontWeight.semibold,
            fontFamily: studentTheme.typography.fontFamily
          }}>📢 Admin Announcements</h3>
          {announcements.length === 0 ? (
            <div style={{ 
              color: studentTheme.colors.textSecondary,
              textAlign: 'center',
              padding: studentTheme.spacing.xl,
              fontSize: studentTheme.typography.fontSize.lg
            }}>📢 No announcements yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: studentTheme.spacing.lg }}>
              {announcements.map(a => (
                <div key={a._id} style={getCardStyle({
                  background: studentTheme.colors.surfaceHover,
                  border: `1px solid ${studentTheme.colors.borderLight}`,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                })}>
                  <div style={{ 
                    fontWeight: studentTheme.typography.fontWeight.semibold, 
                    color: studentTheme.colors.primary, 
                    fontSize: studentTheme.typography.fontSize.lg,
                    marginBottom: studentTheme.spacing.sm
                  }}>{a.title}</div>
                  <div style={{ 
                    color: studentTheme.colors.textSecondary, 
                    marginBottom: studentTheme.spacing.sm,
                    lineHeight: studentTheme.typography.lineHeight.relaxed
                  }}>{a.content}</div>
                  <div style={{ 
                    color: studentTheme.colors.textMuted, 
                    fontSize: studentTheme.typography.fontSize.sm,
                    fontWeight: studentTheme.typography.fontWeight.medium
                  }}>📅 {new Date(a.createdAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
