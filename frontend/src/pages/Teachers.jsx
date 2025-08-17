import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', subjects: [] });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeachers();
    fetchSubjects();
  }, []);

  const fetchTeachers = async () => {
    const token = localStorage.getItem('nexus_admin_token');
    try {
      const res = await axios.get('http://localhost:5000/api/admin/teachers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeachers(res.data);
    } catch {
      setTeachers([]);
    }
  };

  const fetchSubjects = async () => {
    const token = localStorage.getItem('nexus_admin_token');
    try {
      const res = await axios.get('http://localhost:5000/api/admin/subjects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubjects(res.data);
    } catch {
      setSubjects([]);
    }
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm(prev => ({
        ...prev,
        subjects: checked ? [...prev.subjects, value] : prev.subjects.filter(s => s !== value)
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('nexus_admin_token');
    try {
      await axios.post('http://localhost:5000/api/admin/teachers', { ...form }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ name: '', email: '', password: '', subjects: [] });
      fetchTeachers();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add teacher');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: 240, padding: '2.5rem', flex: 1, background: '#f7f8fa', minHeight: '100vh' }}>
        <h2 style={{ color: '#222', marginBottom: '2rem' }}>Teachers</h2>
        <form onSubmit={handleAddTeacher} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', maxWidth: 400 }}>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <div>
            <div style={{ marginBottom: 4, fontWeight: 500 }}>Assign Subjects:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {subjects.map(sub => (
                <label key={sub._id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input type="checkbox" name="subjects" value={sub._id} checked={form.subjects.includes(sub._id)} onChange={handleChange} />
                  {sub.name} <span style={{ color: '#636e72', fontWeight: 400 }}>({sub.assignedClass?.name})</span>
                </label>
              ))}
            </div>
          </div>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <button type="submit" style={{ padding: '0.7rem 2rem', background: '#0984e3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Add Teacher</button>
        </form>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: '#f1f2f6', textAlign: 'left' }}>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dfe6e9' }}>Name</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dfe6e9' }}>Email</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dfe6e9' }}>Subjects</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dfe6e9' }}>Classes</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '1.5rem', textAlign: 'center', color: '#636e72' }}>No teachers found.</td>
                </tr>
              ) : (
                teachers.flatMap(t =>
                  t.subjects.length === 0
                    ? [<tr key={t._id}><td style={{ padding: '1rem', fontWeight: 500 }}>{t.name}</td><td style={{ padding: '1rem', color: '#636e72' }}>{t.email}</td><td style={{ padding: '1rem' }}>-</td><td style={{ padding: '1rem' }}>-</td></tr>]
                    : t.subjects.map((s, idx) => (
                        <tr key={t._id + '-' + s._id} style={{ borderBottom: '1px solid #f1f2f6' }}>
                          <td style={{ padding: '1rem', fontWeight: 500 }}>{t.name}</td>
                          <td style={{ padding: '1rem', color: '#636e72' }}>{t.email}</td>
                          <td style={{ padding: '1rem' }}>{s.name}</td>
                          <td style={{ padding: '1rem' }}>{s.assignedClass?.name || '-'}</td>
                        </tr>
                      ))
                )
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Teachers;
