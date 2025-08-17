import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ name: '', registrationNumber: '', rollNo: '', email: '', password: '', class: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    const token = localStorage.getItem('nexus_admin_token');
    try {
      const res = await axios.get('http://localhost:5000/api/admin/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(res.data);
    } catch {
      setStudents([]);
    }
  };

  const fetchClasses = async () => {
    const token = localStorage.getItem('nexus_admin_token');
    try {
      const res = await axios.get('http://localhost:5000/api/admin/classes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClasses(res.data);
    } catch {
      setClasses([]);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('nexus_admin_token');
    try {
      await axios.post('http://localhost:5000/api/admin/students', { ...form }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ name: '', registrationNumber: '', rollNo: '', email: '', password: '', class: '' });
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add student');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: 240, padding: '2.5rem', flex: 1, background: '#f7f8fa', minHeight: '100vh' }}>
        <h2 style={{ color: '#222', marginBottom: '2rem' }}>Students</h2>
        <form onSubmit={handleAddStudent} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', maxWidth: 400 }}>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <input type="text" name="registrationNumber" value={form.registrationNumber} onChange={handleChange} placeholder="Registration Number" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <input type="text" name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="Roll No" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <select name="class" value={form.class} onChange={handleChange} required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }}>
            <option value="">Select Class</option>
            {classes.map(cls => <option key={cls._id} value={cls._id}>{cls.name}</option>)}
          </select>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <button type="submit" style={{ padding: '0.7rem 2rem', background: '#0984e3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Add Student</button>
        </form>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: '#f1f2f6', textAlign: 'left' }}>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dfe6e9' }}>Name</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dfe6e9' }}>Registration No</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dfe6e9' }}>Roll No</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dfe6e9' }}>Email</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dfe6e9' }}>Class</th>
                <th style={{ padding: '1rem', borderBottom: '1px solid #dfe6e9' }}>Subjects</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '1.5rem', textAlign: 'center', color: '#636e72' }}>No students found.</td>
                </tr>
              ) : (
                students.map(s => (
                  <tr key={s._id} style={{ borderBottom: '1px solid #f1f2f6' }}>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{s.name}</td>
                    <td style={{ padding: '1rem' }}>{s.registrationNumber}</td>
                    <td style={{ padding: '1rem' }}>{s.rollNo}</td>
                    <td style={{ padding: '1rem', color: '#636e72' }}>{s.email}</td>
                    <td style={{ padding: '1rem' }}>{s.class?.name || '-'}</td>
                    <td style={{ padding: '1rem' }}>{s.subjects.map(sub => sub.name).join(', ')}</td>
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

export default Students;
