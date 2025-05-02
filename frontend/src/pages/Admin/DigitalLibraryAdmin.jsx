import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const DigitalLibraryAdmin = () => {
  const [book, setBook] = useState({ title: '', author: '', file: null });

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('file', book.file);

    try {
      await axios.post('http://localhost:4000/api/v1/digital-library/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Book uploaded successfully!');
      setBook({ title: '', author: '', file: null });
    } catch (err) {
      console.error(err);
      alert('Upload failed!');
    }
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    background: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#000',
  };

  const headingStyle = {
    fontSize: '28px',
    textAlign: 'center',
    marginBottom: '25px',
    color: '#000',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    fontSize: '16px',
    outline: 'none',
    background: '#f9f9f9',
    color: '#000',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#0057ff',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  return (
    <div>
      <Sidebar/>
      <div style={containerStyle}>
      <h2 style={headingStyle}>📤 Upload Digital Book</h2>
      <form onSubmit={handleUpload} style={formStyle}>
        <input
          type="text"
          placeholder="Title"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          style={inputStyle}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          style={inputStyle}
        />
        <input
          type="file"
          accept=".pdf,.epub"
          onChange={(e) => setBook({ ...book, file: e.target.files[0] })}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>
          Upload Book
        </button>
      </form>
    </div>
    </div>
  );
};

export default DigitalLibraryAdmin;
