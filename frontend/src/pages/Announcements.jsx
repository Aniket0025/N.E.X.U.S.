import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const token = localStorage.getItem('nexus_admin_token');
    try {
      const res = await axios.get('http://localhost:5000/api/admin/announcements', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnnouncements(res.data);
    } catch {
      setAnnouncements([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('nexus_admin_token');
    try {
      await axios.post('http://localhost:5000/api/admin/announcements', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ title: '', content: '' });
      fetchAnnouncements();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send announcement');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: 240, padding: '2.5rem', flex: 1, background: '#f7f8fa', minHeight: '100vh' }}>
        <h2 style={{ color: '#222', marginBottom: '2rem' }}>Announcements</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', maxWidth: 500 }}>
          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required rows={4} style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <button type="submit" style={{ padding: '0.7rem 2rem', background: '#0984e3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Send Announcement</button>
        </form>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: '1.5rem', maxWidth: 700 }}>
          <h3 style={{ color: '#222', marginBottom: '1rem' }}>All Announcements</h3>
          {announcements.length === 0 ? (
            <div style={{ color: '#636e72', textAlign: 'center' }}>No announcements yet.</div>
          ) : (
            announcements.map(a => (
              <div key={a._id} style={{ borderBottom: '1px solid #f1f2f6', marginBottom: '1.2rem', paddingBottom: '1.2rem' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#222' }}>{a.title}</div>
                <div style={{ color: '#636e72', margin: '0.5rem 0 0.7rem 0' }}>{a.content}</div>
                <div style={{ fontSize: '0.85rem', color: '#b2bec3' }}>Posted {new Date(a.createdAt).toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Announcements;
