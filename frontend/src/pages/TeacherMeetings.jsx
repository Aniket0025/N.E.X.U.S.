import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeacherSidebar from '../components/TeacherSidebar';

const API = 'http://localhost:5000';

export default function TeacherMeetings() {
  const [loading, setLoading] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  // Simplified: no visibility/class/students
  const token = localStorage.getItem('nexus_teacher_token');

  const headers = { Authorization: `Bearer ${token}` };

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/teacher/meetings`, { headers });
      setMeetings(res.data.meetings || []);
    } catch (e) {
      console.error(e);
      alert('Failed to load meetings');
    } finally {
      setLoading(false);
    }
  };

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

  const handleCancelMeeting = async (id) => {
    const ok = window.confirm('Cancel this meeting? This cannot be undone.');
    if (!ok) return;
    try {
      setLoading(true);
      await axios.delete(`${API}/api/teacher/meetings/${id}`, { headers });
      await fetchMeetings();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || 'Failed to cancel meeting');
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${API}/api/teacher/subjects`, { headers });
      const subjects = res.data?.subjects || [];
      const map = new Map();
      subjects.forEach(s => {
        if (s.assignedClass?._id) {
          map.set(s.assignedClass._id, s.assignedClass.name);
        }
      });
      const arr = Array.from(map.entries()).map(([id, name]) => ({ _id: id, name }));
      setClasses(arr);
      if (arr.length && !selectedClass) setSelectedClass(arr[0]._id);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMeetings();
    fetchClasses();
  }, []);

  // Jitsi link is auto-generated on backend

  const handleCreateMeeting = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const body = {
        title,
        description,
        start: new Date(start).toISOString(),
        end: new Date(end).toISOString(),
      };
      if (!selectedClass) {
        setError('Please select a class to publish this meeting to.');
        setLoading(false);
        return;
      }
      body.visibility = 'class';
      body.class = selectedClass;

      const res = await axios.post(`${API}/api/teacher/meetings`, body, { headers });
      if (res.data?.meeting) {
        setTitle(''); setDescription(''); setStart(''); setEnd('');
        await fetchMeetings();
      }
    } catch (e) {
      console.error(e);
      const msg = e?.response?.data?.message || 'Failed to create meeting';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <TeacherSidebar />
      <main style={{ marginLeft: 240, padding: '2rem', flex: 1, background: '#f7f8fa' }}>
        {toastMsg && (
          <div style={{ position: 'fixed', top: 16, right: 16, background: '#111827', color: '#fff', padding: '8px 12px', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 50 }}>
            {toastMsg}
          </div>
        )}
        <h2 style={{ marginBottom: 8, color: '#0f172a' }}>Jitsi Meetings</h2>
        <p style={{ color: '#64748b', marginTop: 0 }}>Create a meeting for your class. A Jitsi link will be generated automatically.</p>
        {loading && <div>Loading...</div>}

      <form onSubmit={handleCreateMeeting} style={{ display: 'grid', gap: 12, maxWidth: 620, marginBottom: 24, padding: 18, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={{ padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: 8 }} />
        <textarea placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)} style={{ padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: 8 }} />
        <label>Class</label>
        <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} required style={{ padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: 8 }}>
          <option value="" disabled>Select a class</option>
          {classes.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        <label>Start</label>
        <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} required style={{ padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: 8 }} />
        <label>End</label>
        <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} required style={{ padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: 8 }} />
        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '8px 10px', borderRadius: 6 }}>
            {error}
          </div>
        )}
        {/* Simplified: no visibility/class/students inputs */}
        <button type="submit" style={{ padding: '10px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>Create Meeting</button>
      </form>

      <h3>Upcoming Meetings</h3>
      <div style={{ display: 'grid', gap: 12 }}>
        {meetings.map(m => (
          <div key={m._id} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, background: '#ffffff', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{m.title}</div>
              <span style={{ background: '#14b8a6', color: '#fff', padding: '2px 8px', borderRadius: 999, fontSize: 12 }}>Jitsi</span>
            </div>
            <div style={{ color: '#64748b', marginTop: 6 }}>{new Date(m.start).toLocaleString()} - {new Date(m.end).toLocaleString()}</div>
            {m.meetLink && (
              <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                <a href={m.meetLink} target="_blank" rel="noreferrer" style={{ padding: '8px 12px', background: '#14b8a6', color: '#fff', borderRadius: 6, textDecoration: 'none' }}>Join</a>
                <button
                  type="button"
                  onClick={() => handleCopyLink(m._id, m.meetLink)}
                  style={{
                    padding: '8px 12px',
                    background: copiedId === m._id ? '#dcfce7' : '#f3f4f6',
                    color: copiedId === m._id ? '#166534' : '#111827',
                    border: '1px solid #e5e7eb',
                    borderRadius: 6,
                    cursor: 'pointer'
                  }}
                >
                  {copiedId === m._id ? '✓ Copied' : 'Copy Link'}
                </button>
                <button type="button" onClick={() => handleCancelMeeting(m._id)} style={{ padding: '8px 12px', background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: 6, cursor: 'pointer' }}>Cancel</button>
              </div>
            )}
          </div>
        ))}
        {!meetings.length && <div>No meetings yet.</div>}
      </div>
      </main>
    </div>
  );
}
