// Students.js
import React, { useState, useEffect, useContext } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  StudentsContainer,
  Content,
  StudentsContent,
  StudentsHeader,
  StudentList,
  StudentItem,
} from '../../styles/StudentsStyles'; 
import { TeacherContext } from '../../contexts/TeacherContext';

const Students = () => {
  const [students, setStudents] = useState([]);
  const {teacher}=useContext(TeacherContext);
  const subject=teacher.subject;
  useEffect(() => {
    fetchStudents();
  }, []);
console.log(subject);

  const fetchStudents = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/students/getbysubject',{subject});
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <StudentsContainer>
      <Sidebar />
      <Content>
        <StudentsContent>
          <StudentsHeader>Students</StudentsHeader>
          <StudentList>
            {students.map((student) => (
              <StudentItem key={student.id}>
                Name: {student.name} <br />
                Reg No: {student.registrationNumber} <br />
                Class: {student.grade} <br />
                Subject:{student.subject}
              </StudentItem>
            ))}
          </StudentList>
        </StudentsContent>
      </Content>
    </StudentsContainer>
  );
};

export default Students;
