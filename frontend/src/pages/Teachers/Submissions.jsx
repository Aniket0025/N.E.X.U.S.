import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const TeacherSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  const fetchSubmissions = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/assignments/submissions");
      setSubmissions(data.submissions);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '30px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    color: '#000',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const headingStyle = {
    fontSize: '28px',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.7)',
    border: '1px solid #ddd',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  };

  const strongText = {
    fontWeight: '600',
  };

  const linkStyle = {
    color: '#0057ff',
    textDecoration: 'none',
    fontWeight: '500',
  };

  return (
    <div>
      <Sidebar/>
      <div style={containerStyle}>
      <h2 style={headingStyle}>📂 Student Submissions</h2>
      {submissions.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No submissions yet.</p>
      ) : (
        submissions.map((s) => (
          <div key={s._id} style={cardStyle}>
            <h3>{s.assignmentId?.title}</h3>
            <p><span style={strongText}>👨‍🎓 Student:</span> {s.studentId?.name} ({s.studentId?.registrationNumber})</p>
            <p><span style={strongText}>📝 Text:</span> {s.submissionText || "No text submission"}</p>
            {s.submittedFileUrl && (
              <p>
                <span style={strongText}>📎 File:</span>{' '}
                <a href={`http://localhost:4000${s.submittedFileUrl}`} download style={linkStyle}>
                  Download File
                </a>
              </p>
            )}
            <p><span style={strongText}>⏰ Submitted At:</span> {new Date(s.submittedAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default TeacherSubmissions;
