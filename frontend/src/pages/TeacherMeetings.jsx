import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TeacherSidebar from '../components/TeacherSidebar';
import { teacherTheme, getCardStyle, getButtonStyle, getInputStyle } from '../themes/teacherTheme';

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
      <main style={teacherTheme.components.mainContent}>
        {toastMsg && (
          <div style={{ 
            position: 'fixed', 
            top: teacherTheme.spacing.lg, 
            right: teacherTheme.spacing.lg, 
            background: teacherTheme.colors.success, 
            color: teacherTheme.colors.textLight, 
            padding: `${teacherTheme.spacing.sm} ${teacherTheme.spacing.md}`, 
            borderRadius: teacherTheme.borderRadius.lg, 
            boxShadow: teacherTheme.shadows.lg, 
            zIndex: 50,
            fontWeight: teacherTheme.typography.fontWeight.medium
          }}>
            ✅ {toastMsg}
          </div>
        )}
        <h2 style={{ 
          marginBottom: teacherTheme.spacing.sm, 
          color: teacherTheme.colors.textPrimary,
          fontSize: teacherTheme.typography.fontSize['3xl'],
          fontWeight: teacherTheme.typography.fontWeight.bold,
          fontFamily: teacherTheme.typography.fontFamily
        }}>📹 Jitsi Meetings</h2>
        <p style={{ 
          color: teacherTheme.colors.textSecondary, 
          marginTop: 0,
          marginBottom: teacherTheme.spacing.xl,
          fontSize: teacherTheme.typography.fontSize.lg
        }}>Create a meeting for your class. A Jitsi link will be generated automatically.</p>
        {loading && (
          <div style={{
            color: teacherTheme.colors.textSecondary,
            fontSize: teacherTheme.typography.fontSize.lg,
            textAlign: 'center',
            padding: teacherTheme.spacing.lg
          }}>⏳ Loading...</div>
        )}

      <form onSubmit={handleCreateMeeting} style={getCardStyle({ 
        display: 'grid', 
        gap: teacherTheme.spacing.lg, 
        maxWidth: 620, 
        marginBottom: teacherTheme.spacing.xl 
      })}>
        <h3 style={{
          color: teacherTheme.colors.textPrimary,
          fontSize: teacherTheme.typography.fontSize.xl,
          fontWeight: teacherTheme.typography.fontWeight.semibold,
          marginBottom: teacherTheme.spacing.sm
        }}>🆕 Create New Meeting</h3>
        
        <input 
          placeholder="Meeting Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required 
          style={getInputStyle()} 
        />
        
        <textarea 
          placeholder="Description (optional)" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          style={getInputStyle({ minHeight: '80px', resize: 'vertical' })} 
        />
        
        <label style={{
          color: teacherTheme.colors.textPrimary,
          fontWeight: teacherTheme.typography.fontWeight.medium,
          fontSize: teacherTheme.typography.fontSize.base
        }}>🎓 Select Class</label>
        <select 
          value={selectedClass} 
          onChange={e => setSelectedClass(e.target.value)} 
          required 
          style={getInputStyle()}
        >
          <option value="" disabled>Choose a class</option>
          {classes.map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>
        
        <label style={{
          color: teacherTheme.colors.textPrimary,
          fontWeight: teacherTheme.typography.fontWeight.medium,
          fontSize: teacherTheme.typography.fontSize.base
        }}>⏰ Start Time</label>
        <input 
          type="datetime-local" 
          value={start} 
          onChange={e => setStart(e.target.value)} 
          required 
          style={getInputStyle()} 
        />
        
        <label style={{
          color: teacherTheme.colors.textPrimary,
          fontWeight: teacherTheme.typography.fontWeight.medium,
          fontSize: teacherTheme.typography.fontSize.base
        }}>⏰ End Time</label>
        <input 
          type="datetime-local" 
          value={end} 
          onChange={e => setEnd(e.target.value)} 
          required 
          style={getInputStyle()} 
        />
        
        {error && (
          <div style={{ 
            background: '#fee2e2', 
            color: '#991b1b', 
            padding: teacherTheme.spacing.md, 
            borderRadius: teacherTheme.borderRadius.md,
            border: '1px solid #fecaca',
            fontWeight: teacherTheme.typography.fontWeight.medium
          }}>
            ⚠️ {error}
          </div>
        )}
        
        <button 
          type="submit" 
          style={getButtonStyle('primary', { 
            fontSize: teacherTheme.typography.fontSize.lg,
            padding: `${teacherTheme.spacing.lg} ${teacherTheme.spacing.xl}`
          })}
          disabled={loading}
        >
          {loading ? '⏳ Creating...' : '🚀 Create Meeting'}
        </button>
      </form>

      <h3 style={{
        color: teacherTheme.colors.textPrimary,
        fontSize: teacherTheme.typography.fontSize.xl,
        fontWeight: teacherTheme.typography.fontWeight.semibold,
        marginBottom: teacherTheme.spacing.lg
      }}>📅 Upcoming Meetings</h3>
      
      <div style={{ display: 'grid', gap: teacherTheme.spacing.lg }}>
        {meetings.map(m => (
          <div key={m._id} style={getCardStyle({ 
            transition: 'transform 0.2s ease, box-shadow 0.2s ease' 
          })}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: teacherTheme.spacing.sm }}>
              <div style={{ 
                fontWeight: teacherTheme.typography.fontWeight.bold, 
                fontSize: teacherTheme.typography.fontSize.lg,
                color: teacherTheme.colors.textPrimary
              }}>{m.title}</div>
              <span style={{ 
                background: teacherTheme.colors.primary, 
                color: teacherTheme.colors.textLight, 
                padding: `${teacherTheme.spacing.xs} ${teacherTheme.spacing.sm}`, 
                borderRadius: teacherTheme.borderRadius.full, 
                fontSize: teacherTheme.typography.fontSize.xs,
                fontWeight: teacherTheme.typography.fontWeight.semibold
              }}>📹 Jitsi</span>
            </div>
            
            <div style={{ 
              color: teacherTheme.colors.textSecondary, 
              marginBottom: teacherTheme.spacing.md,
              fontSize: teacherTheme.typography.fontSize.base
            }}>
              🕐 {new Date(m.start).toLocaleString()} - {new Date(m.end).toLocaleString()}
            </div>
            
            {m.meetLink && (
              <div style={{ display: 'flex', gap: teacherTheme.spacing.sm, flexWrap: 'wrap' }}>
                <a 
                  href={m.meetLink} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={getButtonStyle('primary', { textDecoration: 'none' })}
                >
                  🚀 Join Meeting
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyLink(m._id, m.meetLink)}
                  style={getButtonStyle('secondary', {
                    background: copiedId === m._id ? teacherTheme.colors.success : teacherTheme.colors.secondary,
                    color: teacherTheme.colors.textLight
                  })}
                >
                  {copiedId === m._id ? '✅ Copied' : '📋 Copy Link'}
                </button>
                <button 
                  type="button" 
                  onClick={() => handleCancelMeeting(m._id)} 
                  style={getButtonStyle('danger')}
                >
                  🗑️ Cancel
                </button>
              </div>
            )}
          </div>
        ))}
        {!meetings.length && (
          <div style={getCardStyle({
            textAlign: 'center',
            color: teacherTheme.colors.textSecondary,
            fontSize: teacherTheme.typography.fontSize.lg,
            padding: teacherTheme.spacing['2xl']
          })}>
            📅 No meetings scheduled yet. Create your first meeting above!
          </div>
        )}
      </div>
      </main>
    </div>
  );
}
