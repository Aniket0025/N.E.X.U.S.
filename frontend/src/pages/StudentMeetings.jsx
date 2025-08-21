import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import StudentSidebar from '../components/StudentSidebar';

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
      <main style={{ marginLeft: 220, padding: '2rem', flex: 1, background: '#f7f8fa' }}>
        {toastMsg && (
          <div style={{ position: 'fixed', top: 16, right: 16, background: '#111827', color: '#fff', padding: '8px 12px', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 50 }}>
            {toastMsg}
          </div>
        )}
        <h2 style={{ marginBottom: 8, color: '#0f172a' }}>Online Meetings</h2>
        <p style={{ color: '#64748b', marginTop: 0 }}>Upcoming sessions from your teachers (Jitsi).</p>
        {loading && <div>Loading...</div>}
        <div style={{ display: 'grid', gap: 16, marginTop: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {meetings.map(m => {
          const start = new Date(m.start);
          const end = new Date(m.end);
          const isPast = end.getTime() < Date.now();
          const pillColor = '#14b8a6';
          return (
            <div key={m._id} style={{
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: 16,
              background: '#fff',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{m.title || 'Untitled meeting'}</div>
                <span style={{ background: pillColor, color: '#fff', padding: '4px 10px', borderRadius: 999, fontSize: 12 }}>Jitsi</span>
              </div>
              <div style={{ color: '#475569', fontSize: 14, marginBottom: 8 }}>{m.description || 'No description'}</div>
              <div style={{ color: '#0f172a', fontSize: 14, marginBottom: 16 }}>
                <span style={{ fontWeight: 600 }}>{start.toLocaleString()}</span>
                <span> — {end.toLocaleString()}</span>
                {isPast && <span style={{ marginLeft: 8, color: '#ef4444', fontWeight: 600 }}>(Ended)</span>}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {m.meetLink ? (
                  <>
                    <a
                      href={m.meetLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        background: pillColor,
                        color: '#fff',
                        padding: '10px 14px',
                        borderRadius: 8,
                        textDecoration: 'none',
                        fontWeight: 600
                      }}
                    >
                      Join Now
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopyLink(m._id, m.meetLink)}
                      style={{
                        background: copiedId === m._id ? '#dcfce7' : '#e2e8f0',
                        color: copiedId === m._id ? '#166534' : '#0f172a',
                        padding: '10px 14px',
                        borderRadius: 8,
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      {copiedId === m._id ? '✓ Copied' : 'Copy Link'}
                    </button>
                  </>
                ) : (
                  <span style={{ color: '#64748b' }}>Meet link not available yet</span>
                )}
              </div>
            </div>
          );
        })}
        {!meetings.length && !loading && (
          <div style={{ color: '#64748b' }}>No meetings available.</div>
        )}
      </div>
      </main>
    </div>
  );
}
