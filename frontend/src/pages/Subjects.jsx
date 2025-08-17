import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState('');
  const [assignedClass, setAssignedClass] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubjects();
    fetchClasses();
  }, []);

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

  const handleAddSubject = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('nexus_admin_token');
    try {
      await axios.post('http://localhost:5000/api/admin/subjects', { name, assignedClass }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setName('');
      setAssignedClass('');
      fetchSubjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add subject');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: 240, padding: '2.5rem', flex: 1, background: '#f7f8fa', minHeight: '100vh' }}>
        <h2 style={{ color: '#222', marginBottom: '2rem' }}>Subjects</h2>
        <form onSubmit={handleAddSubject} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Subject Name" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc', minWidth: 200 }} />
          <select value={assignedClass} onChange={e => setAssignedClass(e.target.value)} required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc', minWidth: 200 }}>
            <option value="">Select Class</option>
            {classes.map(cls => <option key={cls._id} value={cls._id}>{cls.name}</option>)}
          </select>
          <button type="submit" style={{ padding: '0.7rem 2rem', background: '#0984e3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Add Subject</button>
        </form>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {subjects.map(sub => (
            <div key={sub._id} style={{ background: '#fff', padding: '1.5rem 2rem', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', minWidth: 180, fontWeight: 'bold', color: '#222' }}>
              {sub.name} <span style={{ color: '#636e72', fontWeight: 400 }}>({sub.assignedClass?.name})</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Subjects;
