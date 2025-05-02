import styled from 'styled-components';

export const StudentsContainer = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
`;

export const Content = styled.div`
  flex: 1;
  margin-left: 250px;
  padding: 40px;
  background-color: #f4f7f9;
`;

export const StudentsContent = styled.div`
  max-width: 1200px; /* Increased size */
  margin: auto;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

export const StudentsHeader = styled.h2`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 25px;
  color: #2c3e50;
  border-bottom: 3px solid #007bff;
  display: inline-block;
  padding-bottom: 5px;
`;

export const StudentList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const StudentItem = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  text-align: center;
  border-left: 5px solid #007bff;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  }

  span {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  p {
    font-size: 16px;
    color: #555;
    margin: 5px 0;
  }
`;

export const AddStudentForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
`;

export const AddStudentInput = styled.input`
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.3s ease-in-out;
  width: 30%;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const AddStudentButton = styled.button`
  padding: 12px 20px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: linear-gradient(135deg, #0056b3, #007bff);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
