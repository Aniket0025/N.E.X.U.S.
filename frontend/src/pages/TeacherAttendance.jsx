import React, { useEffect, useState } from 'react';
import TeacherSidebar from '../components/TeacherSidebar';
import axios from 'axios';

const TeacherAttendance = () => {
  const [teacher, setTeacher] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({ subject: '', classId: '', date: '', startTime: '', endTime: '', topic: '' });
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [step, setStep] = useState(1); // 1=create, 2=mark
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('nexus_teacher');
    if (stored) setTeacher(JSON.parse(stored));
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const token = localStorage.getItem('nexus_teacher_token');
    try {
      const res = await axios.get('http://localhost:5000/api/teacher/subjects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubjects(res.data.subjects || []);
    } catch {
      setSubjects([]);
    }
  };

  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'subject') {
      const subj = subjects.find(s => s._id === value);
      setForm(prev => ({ ...prev, classId: subj?.assignedClass?._id || '' }));
    }
  };

  const handleCreateSession = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const token = localStorage.getItem('nexus_teacher_token');
    try {
      const res = await axios.post('http://localhost:5000/api/teacher/attendance/session', {
        subject: form.subject,
        class: form.classId,
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
        topic: form.topic
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSessionId(res.data.session._id);
      // Fetch students for this subject/class
      const stuRes = await axios.get(`http://localhost:5000/api/teacher/subjects/${form.subject}/class/${form.classId}/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(stuRes.data.students || []);
      setAttendance((stuRes.data.students || []).map(s => ({ student: s._id, present: false })));
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create session');
    }
    setLoading(false);
  };

  const handleToggle = idx => {
    setAttendance(prev => prev.map((a, i) => i === idx ? { ...a, present: !a.present } : a));
  };

  const handleSubmitAttendance = async () => {
    setLoading(true);
    setMessage('');
    const token = localStorage.getItem('nexus_teacher_token');
    try {
      await axios.post(`http://localhost:5000/api/teacher/attendance/${sessionId}/mark`, {
        attendance
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Attendance submitted!');
      setStep(1);
      setSessionId(null);
      setAttendance([]);
      setStudents([]);
      setForm({ subject: '', classId: '', date: '', startTime: '', endTime: '', topic: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to submit attendance');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <TeacherSidebar teacherName={teacher?.name || ''} />
      <main style={{ marginLeft: 240, padding: '2.5rem', flex: 1, background: '#f7f8fa', minHeight: '100vh' }}>
        <h2 style={{ color: '#222', marginBottom: '2rem' }}>Attendance</h2>
        {step === 1 && (
          <form onSubmit={handleCreateSession} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: '2rem', maxWidth: 480 }}>
            <div style={{ marginBottom: 18 }}>
              <label>Subject</label>
              <select name="subject" value={form.subject} onChange={handleFormChange} required style={{ width: '100%', padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }}>
                <option value="">Select Subject</option>
                {subjects.map(s => (
                  <option key={s._id} value={s._id}>{s.name} ({s.assignedClass?.name})</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label>Date</label>
              <input type="date" name="date" value={form.date} onChange={handleFormChange} required style={{ width: '100%', padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }} />
            </div>
            <div style={{ marginBottom: 18, display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label>Start Time</label>
                <input type="time" name="startTime" value={form.startTime} onChange={handleFormChange} required style={{ width: '100%', padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }} />
              </div>
              <div style={{ flex: 1 }}>
                <label>End Time</label>
                <input type="time" name="endTime" value={form.endTime} onChange={handleFormChange} required style={{ width: '100%', padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }} />
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label>Topic</label>
              <input type="text" name="topic" value={form.topic} onChange={handleFormChange} required style={{ width: '100%', padding: '0.7rem', borderRadius: 4, border: '1px solid #ccc', marginTop: 4 }} />
            </div>
            {message && <div style={{ color: 'red', marginBottom: 10 }}>{message}</div>}
            <button type="submit" style={{ padding: '0.7rem 2rem', background: '#00b894', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }} disabled={loading}>{loading ? 'Creating...' : 'Create Session'}</button>
          </form>
        )}
        {step === 2 && (
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', padding: '2rem', maxWidth: 600 }}>
            <h3 style={{ marginBottom: 18 }}>Mark Attendance for {subjects.find(s => s._id === form.subject)?.name} ({subjects.find(s => s._id === form.subject)?.assignedClass?.name})</h3>
            <div style={{ marginBottom: 18, color: '#636e72' }}>Date: {form.date}, Time: {form.startTime} - {form.endTime}, Topic: {form.topic}</div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f1f2f6' }}>
                  <th style={{ padding: '0.7rem', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '0.7rem', textAlign: 'left' }}>Roll No</th>
                  <th style={{ padding: '0.7rem', textAlign: 'left' }}>Present</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, idx) => (
                  <tr key={s._id}>
                    <td style={{ padding: '0.7rem' }}>{s.name}</td>
                    <td style={{ padding: '0.7rem' }}>{s.rollNo}</td>
                    <td style={{ padding: '0.7rem' }}>
                      <button
                        onClick={() => handleToggle(idx)}
                        style={{
                          padding: '0.5rem 1.2rem',
                          borderRadius: 20,
                          border: 'none',
                          background: attendance[idx]?.present ? '#00b894' : '#d63031',
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          transition: 'background 0.2s'
                        }}
                      >
                        {attendance[idx]?.present ? 'Present' : 'Absent'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {message && <div style={{ color: message.includes('submitted') ? 'green' : 'red', marginTop: 10 }}>{message}</div>}
            <button onClick={handleSubmitAttendance} style={{ marginTop: 22, padding: '0.7rem 2rem', background: '#0984e3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }} disabled={loading}>{loading ? 'Submitting...' : 'Submit Attendance'}</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherAttendance;
