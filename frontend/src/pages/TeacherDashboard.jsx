import React, { useEffect, useState } from 'react';
import TeacherSidebar from '../components/TeacherSidebar';
import axios from 'axios';
import { teacherTheme, getCardStyle } from '../themes/teacherTheme';

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
      <main style={teacherTheme.components.mainContent}>
        <h2 style={{ 
          color: teacherTheme.colors.textPrimary, 
          marginBottom: teacherTheme.spacing.xl,
          fontSize: teacherTheme.typography.fontSize['3xl'],
          fontWeight: teacherTheme.typography.fontWeight.bold,
          fontFamily: teacherTheme.typography.fontFamily
        }}>Dashboard</h2>
        
        <div style={getCardStyle({ 
          minWidth: 220, 
          marginBottom: teacherTheme.spacing.xl,
          background: `linear-gradient(135deg, ${teacherTheme.colors.secondary}, ${teacherTheme.colors.secondaryLight})`,
          color: teacherTheme.colors.textLight
        })}>
          <div style={{ 
            fontSize: teacherTheme.typography.fontSize['4xl'], 
            fontWeight: teacherTheme.typography.fontWeight.bold 
          }}>{counts.students}</div>
          <div style={{ 
            fontWeight: teacherTheme.typography.fontWeight.medium,
            fontSize: teacherTheme.typography.fontSize.lg,
            opacity: 0.9
          }}>Students in your subjects</div>
        </div>
        
        <section style={getCardStyle()}>
          <h3 style={{ 
            color: teacherTheme.colors.textPrimary, 
            marginBottom: teacherTheme.spacing.lg,
            fontSize: teacherTheme.typography.fontSize.xl,
            fontWeight: teacherTheme.typography.fontWeight.semibold,
            fontFamily: teacherTheme.typography.fontFamily
          }}>📢 Announcements from Admin</h3>
          {announcements.length === 0 ? (
            <div style={{ 
              color: teacherTheme.colors.textSecondary, 
              textAlign: 'center',
              padding: teacherTheme.spacing.xl,
              fontSize: teacherTheme.typography.fontSize.lg
            }}>No announcements yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: teacherTheme.spacing.lg }}>
              {announcements.map(a => (
                <div key={a._id} style={{ 
                  borderBottom: `1px solid ${teacherTheme.colors.borderLight}`, 
                  paddingBottom: teacherTheme.spacing.lg,
                  background: teacherTheme.colors.surfaceHover,
                  padding: teacherTheme.spacing.lg,
                  borderRadius: teacherTheme.borderRadius.md,
                  border: `1px solid ${teacherTheme.colors.borderLight}`
                }}>
                  <div style={{ 
                    fontWeight: teacherTheme.typography.fontWeight.semibold, 
                    fontSize: teacherTheme.typography.fontSize.lg, 
                    color: teacherTheme.colors.textPrimary,
                    marginBottom: teacherTheme.spacing.sm
                  }}>{a.title}</div>
                  <div style={{ 
                    color: teacherTheme.colors.textSecondary, 
                    marginBottom: teacherTheme.spacing.sm,
                    lineHeight: teacherTheme.typography.lineHeight.relaxed
                  }}>{a.content}</div>
                  <div style={{ 
                    fontSize: teacherTheme.typography.fontSize.sm, 
                    color: teacherTheme.colors.textMuted,
                    fontWeight: teacherTheme.typography.fontWeight.medium
                  }}>📅 Posted {new Date(a.createdAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default TeacherDashboard;
