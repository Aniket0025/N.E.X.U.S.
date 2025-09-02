import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import StudentSidebar from '../components/StudentSidebar';
import { studentTheme, getCardStyle, getButtonStyle, getBadgeStyle } from '../themes/studentTheme';

const API = 'http://localhost:5000';

export default function StudentMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const token = localStorage.getItem('nexus_student_token');

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/student/meetings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMeetings(res.data.meetings || []);
    } catch (e) {
      console.error(e);
      alert('Failed to load meetings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 1500);
  };

  const handleCopyLink = async (id, link) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(id);
      showToast('Link copied');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error(e);
      alert('Failed to copy');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <StudentSidebar />
      <main style={studentTheme.components.mainContent}>
        {toastMsg && (
          <div style={{
            position: 'fixed',
            top: studentTheme.spacing.lg,
            right: studentTheme.spacing.lg,
            background: studentTheme.colors.textPrimary,
            color: studentTheme.colors.surface,
            padding: `${studentTheme.spacing.sm} ${studentTheme.spacing.md}`,
            borderRadius: studentTheme.borderRadius.md,
            boxShadow: studentTheme.shadows.lg,
            zIndex: 50,
            fontSize: studentTheme.typography.fontSize.sm,
            fontWeight: studentTheme.typography.fontWeight.medium
          }}>
            {toastMsg}
          </div>
        )}
        
        <div style={{ marginBottom: studentTheme.spacing.xl }}>
          <h2 style={{
            marginBottom: studentTheme.spacing.sm,
            color: studentTheme.colors.textPrimary,
            fontSize: studentTheme.typography.fontSize['3xl'],
            fontWeight: studentTheme.typography.fontWeight.bold,
            fontFamily: studentTheme.typography.fontFamily
          }}>🎥 Online Meetings</h2>
          <p style={{
            color: studentTheme.colors.textSecondary,
            marginTop: 0,
            fontSize: studentTheme.typography.fontSize.base
          }}>Join upcoming virtual sessions from your teachers via Jitsi Meet.</p>
        </div>

        {loading && (
          <div style={getCardStyle({
            textAlign: 'center',
            color: studentTheme.colors.textSecondary,
            fontSize: studentTheme.typography.fontSize.lg,
            padding: studentTheme.spacing.xl
          })}>
            ⏳ Loading meetings...
          </div>
        )}

        <div style={{
          display: 'grid',
          gap: studentTheme.spacing.lg,
          marginTop: studentTheme.spacing.lg,
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
        }}>
          {meetings.map(m => {
            const start = new Date(m.start);
            const end = new Date(m.end);
            const isPast = end.getTime() < Date.now();
            
            return (
              <div key={m._id} style={getCardStyle({
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              })}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: studentTheme.spacing.md
                }}>
                  <div style={{
                    fontWeight: studentTheme.typography.fontWeight.bold,
                    fontSize: studentTheme.typography.fontSize.lg,
                    color: studentTheme.colors.textPrimary,
                    flex: 1,
                    marginRight: studentTheme.spacing.sm
                  }}>
                    {m.title || 'Untitled Meeting'}
                  </div>
                  <span style={getBadgeStyle('primary')}>
                    🎥 Jitsi
                  </span>
                </div>

                <div style={{
                  color: studentTheme.colors.textSecondary,
                  fontSize: studentTheme.typography.fontSize.sm,
                  marginBottom: studentTheme.spacing.md,
                  lineHeight: 1.5
                }}>
                  {m.description || 'No description provided'}
                </div>

                <div style={{
                  color: studentTheme.colors.textPrimary,
                  fontSize: studentTheme.typography.fontSize.sm,
                  marginBottom: studentTheme.spacing.lg,
                  padding: studentTheme.spacing.sm,
                  background: studentTheme.colors.surfaceHover,
                  borderRadius: studentTheme.borderRadius.sm,
                  borderLeft: `4px solid ${studentTheme.colors.primary}`
                }}>
                  <div style={{ fontWeight: studentTheme.typography.fontWeight.semibold }}>
                    📅 {start.toLocaleDateString()} at {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div style={{ color: studentTheme.colors.textSecondary, fontSize: studentTheme.typography.fontSize.xs }}>
                    Duration: {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  {isPast && (
                    <div style={{
                      marginTop: studentTheme.spacing.xs,
                      color: studentTheme.colors.error,
                      fontWeight: studentTheme.typography.fontWeight.semibold,
                      fontSize: studentTheme.typography.fontSize.xs
                    }}>
                      ⏰ Meeting has ended
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: studentTheme.spacing.sm, alignItems: 'center' }}>
                  {m.meetLink ? (
                    <>
                      <a
                        href={m.meetLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          ...getButtonStyle('primary'),
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: studentTheme.spacing.xs
                        }}
                      >
                        🚀 Join Meeting
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(m._id, m.meetLink)}
                        style={getButtonStyle(copiedId === m._id ? 'success' : 'secondary', {
                          display: 'flex',
                          alignItems: 'center',
                          gap: studentTheme.spacing.xs
                        })}
                      >
                        {copiedId === m._id ? '✅ Copied!' : '📋 Copy Link'}
                      </button>
                    </>
                  ) : (
                    <div style={{
                      color: studentTheme.colors.textSecondary,
                      fontSize: studentTheme.typography.fontSize.sm,
                      fontStyle: 'italic',
                      padding: studentTheme.spacing.sm,
                      background: studentTheme.colors.surfaceHover,
                      borderRadius: studentTheme.borderRadius.sm
                    }}>
                      🔗 Meeting link not available yet
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!meetings.length && !loading && (
          <div style={getCardStyle({
            textAlign: 'center',
            color: studentTheme.colors.textSecondary,
            fontSize: studentTheme.typography.fontSize.lg,
            padding: studentTheme.spacing.xl
          })}>
            📅 No meetings scheduled at the moment.
            <div style={{
              fontSize: studentTheme.typography.fontSize.sm,
              marginTop: studentTheme.spacing.sm,
              color: studentTheme.colors.textSecondary
            }}>
              Check back later for upcoming virtual sessions from your teachers.
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
