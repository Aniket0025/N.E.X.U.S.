import styled from 'styled-components';

export const TeachersContainer = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
  background-color: #f4f6f9;
  min-height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  margin-left: 260px; /* Adjusted to fit sidebar */
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TeachersContent = styled.div`
  width: 90%;
  max-width: 1100px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

export const TeachersHeader = styled.h2`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
`;

export const TeacherTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const TableHead = styled.thead`
  background-color: #2c3e50;
  color: white;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
`;

export const TableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const TeacherList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const TeacherItem = styled.li`
  background-color: #ecf0f1;
  border-left: 5px solid #2c3e50;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

export const AddTeacherForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const AddTeacherInput = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.3s ease-in-out;

  &:focus {
    border-color: #2c3e50;
    outline: none;
  }
`;

export const AddTeacherButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

export default TeachersContainer;