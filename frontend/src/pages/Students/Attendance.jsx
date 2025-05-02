import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import { StudentContext } from '../../contexts/StudentContext';

const Container = styled.div`
  display: flex;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Content = styled.div`
  flex: 1;
  margin-left:250px;
  padding: 40px;
  background: #f4f6f8;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
`;

const Th = styled.th`
  background: #3498db;
  color: white;
  padding: 12px 16px;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  background: ${props => (props.status === 'Present' ? '#28a745' : '#e74c3c')};
`;

const NoData = styled.p`
  text-align: center;
  font-size: 18px;
  color: #888;
  margin-top: 40px;
`;

const Loader = styled.div`
  text-align: center;
  font-size: 18px;
  color: #555;
  margin-top: 40px;
`;

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const {student}=useContext(StudentContext);
  const studentName=student.name;
  console.log("name is",studentName);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/v1/attendance/getAttendance', {
        name: studentName,
      });
      setAttendance(res.data.attendance);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Sidebar />
      <Content>
        <Title>{studentName}'s Attendance Overview</Title>

        {loading ? (
          <Loader>Loading attendance...</Loader>
        ) : attendance.length === 0 ? (
          <NoData>No attendance records found.</NoData>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Date</Th>
                <Th>Subject</Th>
                <Th>Status</Th>
                <Th>Start Time</Th>
                <Th>End Time</Th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record, index) => (
                <tr key={index}>
                  <Td>{new Date(record.date).toLocaleDateString()}</Td>
                  <Td>{record.subject}</Td>
                  <Td>
                    <StatusBadge status={record.status}>{record.status}</StatusBadge>
                  </Td>
                  <Td>{record.startTime || '—'}</Td>
                  <Td>{record.endTime || '—'}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Content>
    </Container>
  );
};

export default Attendance;
