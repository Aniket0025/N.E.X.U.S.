import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

// EditStudentModal component
const EditStudentModal = ({ student, classes, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    name: student.name,
    registrationNumber: student.registrationNumber,
    rollNo: student.rollNo,
    email: student.email,
    password: '', // Don't show hash; require new password to change
    class: student.class?._id || '',
    subjects: student.subjects ? student.subjects.map(s => s._id) : [],
  });
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch subjects for the selected class
    if (form.class) {
      fetchSubjects(form.class);
    } else {
      setSubjects([]);
    }
  }, [form.class]);

  const fetchSubjects = async (classId) => {
    try {
      const token = localStorage.getItem('nexus_admin_token');
      const res = await axios.get('http://localhost:5000/api/admin/subjects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Only subjects assigned to this class
      setSubjects(res.data.filter(s => s.assignedClass === classId || (s.assignedClass && s.assignedClass._id === classId)));
    } catch {
      setSubjects([]);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectsChange = e => {
    const options = [...e.target.options];
    setForm(prev => ({ ...prev, subjects: options.filter(o => o.selected).map(o => o.value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('nexus_admin_token');
      const payload = { ...form };
      if (!payload.password) delete payload.password; // Only send new password if provided
      await axios.put(`http://localhost:5000/api/admin/students/${student._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onUpdated();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update student');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(34,34,34,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100
    }}>
      <div style={{ background: '#fff', borderRadius: 10, padding: '2rem', minWidth: 420, boxShadow: '0 2px 16px rgba(0,0,0,0.18)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#636e72' }}>×</button>
        <h3 style={{ marginBottom: '1.2rem', color: '#222' }}>Edit Student</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 350 }}>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <input type="text" name="registrationNumber" value={form.registrationNumber} onChange={handleChange} placeholder="Registration Number" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <input type="text" name="rollNo" value={form.rollNo} onChange={handleChange} placeholder="Roll No" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="New Password (leave blank to keep)" style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }} />
          <select name="class" value={form.class} onChange={handleChange} required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc' }}>
            <option value="">Select Class</option>
            {classes.map(cls => <option key={cls._id} value={cls._id}>{cls.name}</option>)}
          </select>
          <select name="subjects" multiple value={form.subjects} onChange={handleSubjectsChange} style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc', minHeight: 70 }}>
            {subjects.map(sub => (
              <option key={sub._id} value={sub._id}>{sub.name}</option>
            ))}
          </select>
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <button type="submit" style={{ padding: '0.7rem 2rem', background: '#0984e3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Save Changes</button>
        </form>
      </div>
    </div>
  );
};


const Classes = () => {
  const [className, setClassName] = useState('');
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState('');

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [studentsInClass, setStudentsInClass] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editStudentModalOpen, setEditStudentModalOpen] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

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

  // Fetch students for a class and open modal
  const handleClassClick = async (cls) => {
    setSelectedClass(cls);
    setModalOpen(true);
    const token = localStorage.getItem('nexus_admin_token');
    try {
      const res = await axios.get(`http://localhost:5000/api/admin/classes/${cls._id}/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudentsInClass(res.data);
    } catch {
      setStudentsInClass([]);
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('nexus_admin_token');
    try {
      await axios.post('http://localhost:5000/api/admin/classes', { name: className }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClassName('');
      fetchClasses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add class');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: 240, padding: '2.5rem', flex: 1, background: '#f7f8fa', minHeight: '100vh' }}>
        <h2 style={{ color: '#222', marginBottom: '2rem' }}>Classes</h2>
        <form onSubmit={handleAddClass} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input type="text" value={className} onChange={e => setClassName(e.target.value)} placeholder="Class Name" required style={{ padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc', minWidth: 200 }} />
          <button type="submit" style={{ padding: '0.7rem 2rem', background: '#0984e3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Add Class</button>
        </form>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {classes.map(cls => (
            <div
              key={cls._id}
              style={{ background: '#fff', padding: '1.5rem 2rem', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', cursor: 'pointer', minWidth: 180, fontWeight: 'bold', color: '#222' }}
              onClick={() => handleClassClick(cls)}
            >
              {cls.name}
            </div>
          ))}

          {/* Modal for viewing students in class */}
          {modalOpen && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(34,34,34,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <div style={{ background: '#fff', borderRadius: 10, padding: '2rem', minWidth: 520, boxShadow: '0 2px 16px rgba(0,0,0,0.18)', position: 'relative' }}>
                <button onClick={() => setModalOpen(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#636e72' }}>×</button>
                <h3 style={{ marginBottom: '1.2rem', color: '#222' }}>Students in {selectedClass?.name}</h3>
                <div style={{ maxHeight: 350, overflowY: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f1f2f6', textAlign: 'left' }}>
                        <th style={{ padding: '0.7rem', borderBottom: '1px solid #dfe6e9' }}>Name</th>
                        <th style={{ padding: '0.7rem', borderBottom: '1px solid #dfe6e9' }}>Registration No</th>
                        <th style={{ padding: '0.7rem', borderBottom: '1px solid #dfe6e9' }}>Roll No</th>
                        <th style={{ padding: '0.7rem', borderBottom: '1px solid #dfe6e9' }}>Email</th>
                        <th style={{ padding: '0.7rem', borderBottom: '1px solid #dfe6e9' }}>Password</th>
                        <th style={{ padding: '0.7rem', borderBottom: '1px solid #dfe6e9' }}>Subjects</th>
                        <th style={{ padding: '0.7rem', borderBottom: '1px solid #dfe6e9' }}>Avg Attendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsInClass.length === 0 ? (
                        <tr>
                          <td colSpan={7} style={{ padding: '1.2rem', textAlign: 'center', color: '#636e72' }}>No students found.</td>
                        </tr>
                      ) : (
                        studentsInClass.map(s => (
                          <tr
                            key={s._id}
                            style={{ cursor: 'pointer' }}
                            onClick={() => { setSelectedStudent(s); setEditStudentModalOpen(true); }}
                          >
                            <td style={{ padding: '0.7rem' }}>{s.name}</td>
                            <td style={{ padding: '0.7rem' }}>{s.registrationNumber}</td>
                            <td style={{ padding: '0.7rem' }}>{s.rollNo}</td>
                            <td style={{ padding: '0.7rem' }}>{s.email}</td>
                            <td style={{ padding: '0.7rem' }}>{s.password}</td>
                            <td style={{ padding: '0.7rem' }}>{s.subjects && s.subjects.length > 0 ? s.subjects.map(sub => sub.name).join(', ') : '-'}</td>
                            <td style={{ padding: '0.7rem' }}>{typeof s.averageAttendance === 'number' ? `${s.averageAttendance}%` : '-'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Edit Student Modal */}
              {editStudentModalOpen && selectedStudent && (
                <EditStudentModal
                  student={selectedStudent}
                  classes={classes}
                  onClose={() => setEditStudentModalOpen(false)}
                  onUpdated={async () => {
                    setEditStudentModalOpen(false);
                    // Refresh students in class
                    await handleClassClick(selectedClass);
                  }}
                />
              )}
            </div>
          )}

          {/* EditStudentModal component definition */}
        
        </div>
      </main>
    </div>
  );
};

export default Classes;
