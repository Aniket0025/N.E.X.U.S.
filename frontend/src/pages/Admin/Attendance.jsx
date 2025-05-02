import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { toast } from 'react-hot-toast';
import Sidebar from './Sidebar';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #eef2f3, #dfe9f3);
`;

const Content = styled.div`
  flex: 1;
  margin: 50px auto;
  padding: 30px;
  max-width: 850px;
  background: #ffffffcc;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 25px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Label = styled.label`
  font-weight: 600;
  display: block;
  margin-top: 20px;
  margin-bottom: 5px;
  color: #2c3e50;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  background: #fff;
  transition: border 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  background: #fff;
  transition: border 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const StudentList = styled.div`
  margin-top: 30px;
`;

const StudentItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 12px;
  margin-bottom: 10px;
  background: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  align-items: center;
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    transform: scale(1.01);
    background: #ebf5ff;
  }
`;

const Button = styled.button`
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  color: #fff;
  margin: 0 4px;
  transition: background 0.3s ease, transform 0.2s;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:first-child {
    background-color: #28a745;

    &:hover {
      background-color: #218838;
      transform: scale(1.05);
    }
  }

  &:last-child {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
      transform: scale(1.05);
    }
  }
`;

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('Maths');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [markedAttendance, setMarkedAttendance] = useState({}); // Track marked students

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

  const markAttendance = async (student, status) => {
    if (!selectedDate || !startTime || !endTime) {
      alert('Please select date, start time, and end time.');
      return;
    }

    const attendanceData = {
      name: student.name,
      registrationNumber: student.registrationNumber,
      subject: selectedSubject,
      date: selectedDate,
      startTime,
      endTime,
      status
    };

    try {
      await axios.post('http://localhost:4000/api/v1/attendance/mark', attendanceData);
      toast.success(`Attendance marked for ${student.name}`);
      setMarkedAttendance(prev => ({ ...prev, [student.registrationNumber]: true }));
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('Failed to save attendance.');
    }
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>Mark Attendance</Title>

        <Label>Select Date:</Label>
        <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

        <Label>Select Subject:</Label>
        <Select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="Maths">Maths</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
        </Select>

        <Label>Start Time:</Label>
        <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />

        <Label>End Time:</Label>
        <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />

        <StudentList>
          {students.map((student) => {
            const isMarked = markedAttendance[student.registrationNumber];
            return (
              <StudentItem key={student.registrationNumber}>
                <span>{student.name} ({student.registrationNumber})</span>
                <div>
                  <Button disabled={isMarked} onClick={() => markAttendance(student, 'Present')}>Present</Button>
                  <Button disabled={isMarked} onClick={() => markAttendance(student, 'Absent')}>Absent</Button>
                </div>
              </StudentItem>
            );
          })}
        </StudentList>
      </Content>
    </Container>
  );
};

export default Attendance;
