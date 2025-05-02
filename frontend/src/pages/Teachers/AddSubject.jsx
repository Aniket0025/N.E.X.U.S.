import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #eef2f3, #dfe9f3);
`;

const Content = styled.div`
  flex: 1;
  margin: 50px auto;
  padding: 25px;
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.9); /* Increased opacity to reduce blur */
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const StudentList = styled.div`
  margin-top: 20px;
  border-radius: 10px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.9); /* Increased opacity */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: rgba(255, 255, 255, 1); /* Removed blur from dropdown */
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.4);
    outline: none;
  }
`;


const Title = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: #2c3e50;
`;



const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #0056b3;
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;



const StudentItem = styled.div`
  padding: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
  border-radius: 6px;

  &:hover {
    background: rgba(0, 123, 255, 0.1);
    transform: scale(1.01);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const AddSubject = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Science');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/students/getall');
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const updateStudentSubject = async () => {
    if (!selectedStudent) {
      alert('Please select a student!');
      return;
    }
    try {
      await axios.put(`http://localhost:4000/api/v1/students/update/${selectedStudent}`, { subject: selectedSubject });
      alert('Subject updated successfully!');
      fetchStudents();
    } catch (error) {
      console.error('Error updating student subject:', error);
      alert('Failed to update subject.');
    }
  };

  return (
    <div style={{ marginLeft: '250px' }}>
      <Container>
      <Sidebar />
      <Content>
        <Title>Assign Subject</Title>
        <Label>Select Student:</Label>
        <Select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
          <option value="">-- Select Student --</option>
          {students.map((student) => (
            <option key={student.registrationNumber} value={student.registrationNumber}>
              {student.name} ({student.registrationNumber})
            </option>
          ))}
        </Select>

        <Label>Select Subject:</Label>
        <Select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="Science">Science</option>
          <option value="Maths">Maths</option>
          <option value="Hindi">Hindi</option>
        </Select>

        <Button onClick={updateStudentSubject}>Assign Subject</Button>

        <Title>Student List</Title>
        <StudentList>
          {students.length > 0 ? (
            students.map((student) => (
              <StudentItem key={student._id}>
                <strong>Name:</strong> {student.name} <br />
                <strong>Reg No:</strong> {student.registrationNumber} <br />
                <strong>Class:</strong> {student.grade} <br />
                <strong>Subject:</strong> {student.subject || 'Not Assigned'}
              </StudentItem>
            ))
          ) : (
            <p>No students available</p>
          )}
        </StudentList>
      </Content>
    </Container>
    </div>
    
  );
};

export default AddSubject;
