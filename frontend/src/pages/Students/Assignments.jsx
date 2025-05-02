import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [submittedIds, setSubmittedIds] = useState([]);
  const studentId = localStorage.getItem('studentId');

  const fetchAssignments = async () => {
    const { data } = await axios.get('http://localhost:4000/api/v1/assignments/getall');
    setAssignments(data.assignments);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleSubmit = async (assignmentId, text, file) => {
    const formData = new FormData();
    formData.append("assignmentId", assignmentId);
    formData.append("studentId", studentId);
    if (text) formData.append("submissionText", text);
    if (file) formData.append("submissionFile", file);

    try {
      await axios.post("http://localhost:4000/api/v1/assignments/submit", formData);
      alert("Submitted successfully");
      setSubmittedIds([...submittedIds, assignmentId]);
    } catch (err) {
      console.error(err);
    }
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '30px',
    background: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    color: '#000',
    fontFamily: 'Segoe UI, sans-serif'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.75)',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '15px'
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px'
  };

  const buttonStyle = {
    padding: '10px',
    borderRadius: '8px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  return (
    <div>
      <Sidebar/>
      <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', fontSize: '28px' }}>📚 Assignments</h2>
      {assignments.map((a) => (
        <div key={a._id} style={cardStyle}>
          <h3>{a.title}</h3>
          <p>{a.description}</p>
          <p><strong>Grade:</strong> {a.grade}</p>
          <p><strong>Deadline:</strong> {new Date(a.deadline).toLocaleDateString()}</p>
          <a href={`http://localhost:4000${a.fileUrl}`} download style={{ color: '#0057ff', fontWeight: '500' }}>
            📥 Download Assignment File
          </a>

          {submittedIds.includes(a._id) ? (
            <p style={{ color: 'green', marginTop: '10px' }}><em>✅ Already Submitted</em></p>
          ) : (
            <AssignmentForm assignmentId={a._id} onSubmit={handleSubmit} inputStyle={inputStyle} buttonStyle={buttonStyle} formStyle={formStyle} />
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

const AssignmentForm = ({ assignmentId, onSubmit, inputStyle, buttonStyle, formStyle }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(assignmentId, text, file);
    setText('');
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <textarea
        placeholder="✍️ Type your answer..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        style={{ ...inputStyle, resize: 'none' }}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} style={inputStyle} />
      <button type="submit" style={buttonStyle}>Submit</button>
    </form>
  );
};

export default StudentAssignments;
