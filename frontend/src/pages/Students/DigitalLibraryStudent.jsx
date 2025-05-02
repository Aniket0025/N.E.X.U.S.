import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const DigitalLibraryStudent = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/v1/digital-library/getall')
      .then((res) => setBooks(res.data.books))
      .catch((err) => console.error(err));
  }, []);

  const containerStyle = {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    color: '#000',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const bookCardStyle = {
    background: 'rgba(255, 255, 255, 0.6)',
    padding: '20px',
    borderRadius: '16px',
    marginBottom: '20px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.2s ease',
    color: '#000',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '10px',
  };

  const authorStyle = {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  };

  const downloadLinkStyle = {
    textDecoration: 'none',
    color: '#0057ff',
    fontWeight: '500',
    fontSize: '16px',
    background: '#e6f0ff',
    padding: '8px 14px',
    borderRadius: '12px',
    border: '1px solid #0057ff',
    transition: 'all 0.3s ease',
  };

  return (
    <div>
      <Sidebar/>
      <div style={containerStyle}>
      <h2 style={{ fontSize: '32px', textAlign: 'center', marginBottom: '30px', color: '#000' }}>
        📚 Digital Library
      </h2>
      {books.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#555' }}>No books found.</p>
      ) : (
        books.map((book) => (
          <div key={book._id} style={bookCardStyle}>
            <div style={titleStyle}>{book.title}</div>
            <div style={authorStyle}>Author: {book.author}</div>
            <a
              href={`http://localhost:4000${book.fileUrl}`}
              target="_blank"
              rel="noreferrer"
              style={downloadLinkStyle}
            >
              📥 Download
            </a>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default DigitalLibraryStudent;
