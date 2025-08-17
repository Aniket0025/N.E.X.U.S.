import React, { useEffect, useState } from 'react';
import TeacherSidebar from '../components/TeacherSidebar';
import axios from 'axios';

const TeacherSubjects = () => {
  const [teacher, setTeacher] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState(null);
  const [modalStudents, setModalStudents] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  // For sessions modal
  const [sessionsModalOpen, setSessionsModalOpen] = useState(false);
  const [sessionsModalSubject, setSessionsModalSubject] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [attendanceSession, setAttendanceSession] = useState(null);
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  // For editing attendance
  const [editAttendanceModalOpen, setEditAttendanceModalOpen] = useState(false);
  const [editAttendanceSessionId, setEditAttendanceSessionId] = useState(null);
  const [editAttendanceList, setEditAttendanceList] = useState([]);
  const [editAttendanceLoading, setEditAttendanceLoading] = useState(false);
  const [editAttendanceMessage, setEditAttendanceMessage] = useState('');

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

  const handleOpenModal = async (subject) => {
    setModalSubject(subject);
    setModalOpen(true);
    setModalLoading(true);
    const token = localStorage.getItem('nexus_teacher_token');
    try {
      const res = await axios.get(`http://localhost:5000/api/teacher/subjects/${subject._id}/class/${subject.assignedClass?._id}/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setModalStudents(res.data.students || []);
    } catch {
      setModalStudents([]);
    }
    setModalLoading(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalSubject(null);
    setModalStudents([]);
  };

  const handleOpenSessionsModal = async (subject) => {
    setSessionsModalSubject(subject);
    setSessionsModalOpen(true);
    setSessionsLoading(true);
    const token = localStorage.getItem('nexus_teacher_token');
    try {
      const res = await axios.get(`http://localhost:5000/api/teacher/subjects/${subject._id}/class/${subject.assignedClass?._id}/sessions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSessions(res.data.sessions || []);
    } catch {
      setSessions([]);
    }
    setSessionsLoading(false);
  };

  const handleCloseSessionsModal = () => {
    setSessionsModalOpen(false);
    setSessionsModalSubject(null);
    setSessions([]);
  };

  const handleOpenAttendanceModal = async (sessionId) => {
    setAttendanceModalOpen(true);
    setAttendanceSession(sessionId);
    setAttendanceLoading(true);
    const token = localStorage.getItem('nexus_teacher_token');
    try {
      const res = await axios.get(`http://localhost:5000/api/teacher/attendance/session/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendanceDetails(res.data.session.attendance || []);
    } catch {
      setAttendanceDetails([]);
    }
    setAttendanceLoading(false);
  };

  const handleCloseAttendanceModal = () => {
    setAttendanceModalOpen(false);
    setAttendanceSession(null);
    setAttendanceDetails([]);
  };

  // Edit attendance modal logic
  const handleOpenEditAttendanceModal = async (sessionId) => {
    setEditAttendanceModalOpen(true);
    setEditAttendanceSessionId(sessionId);
    setEditAttendanceLoading(true);
    setEditAttendanceMessage('');
    const token = localStorage.getItem('nexus_teacher_token');
    try {
      const res = await axios.get(`http://localhost:5000/api/teacher/attendance/session/${sessionId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditAttendanceList(res.data.session.attendance || []);
    } catch {
      setEditAttendanceList([]);
      setEditAttendanceMessage('Failed to load attendance');
    }
    setEditAttendanceLoading(false);
  };

  const handleCloseEditAttendanceModal = () => {
    setEditAttendanceModalOpen(false);
    setEditAttendanceSessionId(null);
    setEditAttendanceList([]);
    setEditAttendanceMessage('');
  };

  const handleEditToggle = idx => {
    setEditAttendanceList(prev => prev.map((a, i) => i === idx ? { ...a, present: !a.present } : a));
  };

  const handleSubmitEditAttendance = async () => {
    setEditAttendanceLoading(true);
    setEditAttendanceMessage('');
    const token = localStorage.getItem('nexus_teacher_token');
    try {
      await axios.post(`http://localhost:5000/api/teacher/attendance/${editAttendanceSessionId}/mark`, {
        attendance: editAttendanceList
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditAttendanceMessage('Attendance updated successfully!');
      // Optionally refresh sessions list
      handleOpenSessionsModal(sessionsModalSubject);
    } catch (err) {
      setEditAttendanceMessage('Failed to update attendance');
    }
    setEditAttendanceLoading(false);
  };



  return (
    <div style={{ display: 'flex' }}>
      <TeacherSidebar teacherName={teacher?.name || ''} />
      <main style={{ marginLeft: 240, padding: '2.5rem', flex: 1, background: '#f7f8fa', minHeight: '100vh' }}>
        <h2 style={{ color: '#222', marginBottom: '2rem' }}>Subjects & Classes</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {subjects.length === 0 ? (
            <div style={{ color: '#636e72', textAlign: 'center' }}>No subjects assigned.</div>
          ) : (
            subjects.map((s, idx) => (
              <div
                key={s._id || idx}
                style={{ background: '#fff', padding: '1.5rem 2rem', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', minWidth: 200, fontWeight: 'bold', color: '#222', position: 'relative', marginBottom: 8 }}
              >
                <div style={{ fontSize: 18 }}>{s.assignedClass?.name || '-'}</div>
                <div style={{ fontSize: 15, color: '#636e72', marginTop: 8 }}>{s.name}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  <button
                    style={{ padding: '0.5rem 1.2rem', background: '#00b894', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}
                    onClick={() => handleOpenModal(s)}
                  >Students</button>
                  <button
                    style={{ padding: '0.5rem 1.2rem', background: '#0984e3', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500 }}
                    onClick={() => handleOpenSessionsModal(s)}
                  >Sessions</button>
                </div>
              </div>
            ))
          )}
        </div>
      {/* Modal for students in subject/class */}
      {modalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30, 39, 46, 0.4)', zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: '2.5rem', minWidth: 420, maxWidth: '90vw', boxShadow: '0 2px 16px rgba(0,0,0,0.18)', position: 'relative' }}>
            <button onClick={handleCloseModal} style={{ position: 'absolute', top: 18, right: 24, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#636e72' }}>&times;</button>
            <h3 style={{ marginBottom: 18, color: '#222' }}>Students in {modalSubject?.name} ({modalSubject?.assignedClass?.name})</h3>
            {modalLoading ? (
              <div style={{ color: '#636e72', textAlign: 'center', padding: '2rem' }}>Loading...</div>
            ) : modalStudents.length === 0 ? (
              <div style={{ color: '#636e72', textAlign: 'center', padding: '2rem' }}>No students enrolled.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f1f2f6' }}>
                    <th style={{ padding: '0.7rem', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '0.7rem', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '0.7rem', textAlign: 'left' }}>Class</th>
                    <th style={{ padding: '0.7rem', textAlign: 'left' }}>Roll No</th>
                    <th style={{ padding: '0.7rem', textAlign: 'left' }}>Registration No</th>
                  </tr>
                </thead>
                <tbody>
                  {modalStudents.map(s => (
                    <tr key={s._id}>
                      <td style={{ padding: '0.7rem' }}>{s.name}</td>
                      <td style={{ padding: '0.7rem' }}>{s.email}</td>
                      <td style={{ padding: '0.7rem' }}>{s.class?.name || '-'}</td>
                      <td style={{ padding: '0.7rem' }}>{s.rollNo}</td>
                      <td style={{ padding: '0.7rem' }}>{s.registrationNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </main>
    {/* Sessions Modal */}
    {sessionsModalOpen && (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', zIndex: 99, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.13)', padding: '2rem', minWidth: 420, maxHeight: 600, overflowY: 'auto', position: 'relative' }}>
          <h3 style={{ marginBottom: 18 }}>Sessions for {sessionsModalSubject?.name} ({sessionsModalSubject?.assignedClass?.name})</h3>
          <button onClick={handleCloseSessionsModal} style={{ position: 'absolute', top: 10, right: 18, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer', color: '#636e72' }}>×</button>
          {sessionsLoading ? (
            <div>Loading...</div>
          ) : sessions.length === 0 ? (
            <div>No sessions found.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
              <thead>
                <tr style={{ background: '#f1f2f6' }}>
                  <th style={{ padding: '0.7rem', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '0.7rem', textAlign: 'left' }}>Timing</th>
                  <th style={{ padding: '0.7rem', textAlign: 'left' }}>Topic</th>
                  <th style={{ padding: '0.7rem', textAlign: 'left' }}>Avg Attendance</th>
                  <th style={{ padding: '0.7rem', textAlign: 'left' }}>Action</th>
                  <th style={{ padding: '0.7rem', textAlign: 'left' }}>Edit</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map(sess => (
                  <tr key={sess._id} style={{ cursor: 'pointer' }}>
                    <td style={{ padding: '0.7rem' }}>{new Date(sess.date).toLocaleDateString()}</td>
                    <td style={{ padding: '0.7rem' }}>{sess.startTime} - {sess.endTime}</td>
                    <td style={{ padding: '0.7rem' }}>{sess.topic}</td>
                    <td style={{ padding: '0.7rem' }}>{sess.average}%</td>
                    <td style={{ padding: '0.7rem' }}>
                      <button onClick={() => handleOpenAttendanceModal(sess._id)} style={{ padding: '0.4rem 1rem', background: '#00b894', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer' }}>View</button>
                    </td>
                    <td style={{ padding: '0.7rem' }}>
                      <button onClick={() => handleOpenEditAttendanceModal(sess._id)} style={{ padding: '0.4rem 1rem', background: '#fdcb6e', color: '#222', border: 'none', borderRadius: 5, cursor: 'pointer', fontWeight: 500 }}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )}

    {/* Attendance Details Modal */}
    {attendanceModalOpen && (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.13)', padding: '2rem', minWidth: 420, maxHeight: 600, overflowY: 'auto', position: 'relative' }}>
          <h3 style={{ marginBottom: 18 }}>Attendance Details</h3>
          <button onClick={handleCloseAttendanceModal} style={{ position: 'absolute', top: 10, right: 18, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer', color: '#636e72' }}>×</button>
          {attendanceLoading ? (
            <div>Loading...</div>
          ) : attendanceDetails.length === 0 ? (
            <div>No attendance records found for this session.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
              <thead>
                <tr style={{ background: '#f1f2f6' }}>
                  <th style={{ padding: '0.7rem', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '0.7rem', textAlign: 'left' }}>Roll No</th>
                  <th style={{ padding: '0.7rem', textAlign: 'left' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceDetails.map((a, idx) => (
                  <tr key={a.student?._id || idx}>
                    <td style={{ padding: '0.7rem' }}>{a.student?.name || '-'}</td>
                    <td style={{ padding: '0.7rem' }}>{a.student?.rollNo || '-'}</td>
                    <td style={{ padding: '0.7rem' }}>
                      <span style={{
                        padding: '0.3rem 1rem',
                        borderRadius: 16,
                        background: a.present ? '#00b894' : '#d63031',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}>{a.present ? 'Present' : 'Absent'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    )}

    {/* Edit Attendance Modal */}
    {editAttendanceModalOpen && (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', zIndex: 101, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 6px rgba(0,0,0,0.13)', padding: '2rem', minWidth: 420, maxHeight: 600, overflowY: 'auto', position: 'relative' }}>
          <h3 style={{ marginBottom: 18 }}>Edit Attendance</h3>
          <button onClick={handleCloseEditAttendanceModal} style={{ position: 'absolute', top: 10, right: 18, fontSize: 22, background: 'none', border: 'none', cursor: 'pointer', color: '#636e72' }}>×</button>
          {editAttendanceLoading ? (
            <div>Loading...</div>
          ) : editAttendanceList.length === 0 ? (
            <div>No attendance records found for this session.</div>
          ) : (
            <>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
                <thead>
                  <tr style={{ background: '#f1f2f6' }}>
                    <th style={{ padding: '0.7rem', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '0.7rem', textAlign: 'left' }}>Roll No</th>
                    <th style={{ padding: '0.7rem', textAlign: 'left' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {editAttendanceList.map((a, idx) => (
                    <tr key={a.student?._id || idx}>
                      <td style={{ padding: '0.7rem' }}>{a.student?.name || '-'}</td>
                      <td style={{ padding: '0.7rem' }}>{a.student?.rollNo || '-'}</td>
                      <td style={{ padding: '0.7rem' }}>
                        <button
                          onClick={() => handleEditToggle(idx)}
                          style={{
                            padding: '0.5rem 1.2rem',
                            borderRadius: 20,
                            border: 'none',
                            background: a.present ? '#00b894' : '#d63031',
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                          }}
                        >
                          {a.present ? 'Present' : 'Absent'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {editAttendanceMessage && <div style={{ color: editAttendanceMessage.includes('success') ? 'green' : 'red', marginTop: 10 }}>{editAttendanceMessage}</div>}
              <button
                onClick={handleSubmitEditAttendance}
                style={{ marginTop: 22, padding: '0.7rem 2rem', background: '#0984e3', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
                disabled={editAttendanceLoading}
              >{editAttendanceLoading ? 'Saving...' : 'Save Changes'}</button>
            </>
          )}
        </div>
      </div>
    )}
  </div>
  );
};

export default TeacherSubjects;
