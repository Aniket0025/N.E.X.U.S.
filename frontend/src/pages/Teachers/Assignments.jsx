import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const AssignmentSection = () => {
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    grade: '',
    deadline: '',
  });
  const [file, setFile] = useState(null);

  const fetchAssignments = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/v1/assignments/getall');
      setAssignments(data.assignments);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => payload.append(key, val));
    if (file) payload.append('assignmentFile', file);

    try {
      await axios.post('http://localhost:4000/api/v1/assignments', payload);
      setFormData({ title: '', description: '', grade: '', deadline: '' });
      setFile(null);
      fetchAssignments();
    } catch (err) {
      console.error(err);
    }
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '30px',
    background: 'rgba(255, 255, 255, 0.75)',
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

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '30px',
  };

  const inputStyle = {
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    fontSize: '16px',
    background: '#f9f9f9',
    color: '#000',
    outline: 'none',
  };

  const textareaStyle = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: '100px',
  };

  const buttonStyle = {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#0057ff',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  };

  const assignmentCardStyle = {
    background: 'rgba(255, 255, 255, 0.65)',
    padding: '20px',
    marginBottom: '16px',
    borderRadius: '16px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e0e0e0',
  };

  const linkStyle = {
    color: '#0057ff',
    textDecoration: 'none',
    marginTop: '8px',
    display: 'inline-block',
    fontWeight: '500',
  };

  return (
    <div>
      <Sidebar/>
      <div style={containerStyle}>
      <h2 style={headingStyle}>📝 Create Assignment</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={inputStyle}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          style={textareaStyle}
        />
        <input
          type="text"
          placeholder="Grade"
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
          style={inputStyle}
          required
        />
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          style={inputStyle}
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>
          Create Assignment
        </button>
      </form>

      <h3 style={{ ...headingStyle, fontSize: '24px' }}>📚 All Assignments</h3>
      {assignments.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#333' }}>No assignments found.</p>
      ) : (
        assignments.map((a) => (
          <div key={a._id} style={assignmentCardStyle}>
            <strong>{a.title}</strong> <br />
            Grade: {a.grade} <br />
            Deadline: {new Date(a.deadline).toLocaleDateString()} <br />
            <a href={`http://localhost:4000${a.fileUrl}`} download style={linkStyle}>
              📥 Download File
            </a>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default AssignmentSection;
