import styled from 'styled-components';

export const AssignmentsContainer = styled.div`
  display: flex;
  padding-left: 240px;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #eef2f3, #dfe9f3);
  min-height: 100vh;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-left: 0;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 30px;
`;

export const AssignmentsContent = styled.div`
  background: rgba(255, 255, 255, 0.7); /* Glass effect */
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.2);
  }
`;

export const AssignmentsHeader = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const AssignmentList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const AssignmentItem = styled.li`
  background: linear-gradient(135deg, #ffffff, #f0f4f8);
  border-left: 5px solid #007bff;
  border-radius: 10px;
  padding: 15px 20px;
  margin-bottom: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
  }
`;

export const AddAssignmentForm = styled.form`
  background: rgba(255, 255, 255, 0.9);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const AddAssignmentInput = styled.input`
  padding: 12px;
  margin-bottom: 12px;
  border: 2px solid #007bff;
  border-radius: 6px;
  width: 100%;
  font-size: 15px;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border: 2px solid #0056b3;
    box-shadow: 0 0 8px rgba(0, 91, 255, 0.3);
    outline: none;
  }
`;

export const AddAssignmentTextArea = styled.textarea`
  padding: 12px;
  margin-bottom: 12px;
  border: 2px solid #007bff;
  border-radius: 6px;
  width: 100%;
  resize: vertical;
  font-size: 15px;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border: 2px solid #0056b3;
    box-shadow: 0 0 8px rgba(0, 91, 255, 0.3);
    outline: none;
  }
`;

export const AddAssignmentButton = styled.button`
  padding: 12px 20px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #0056b3;
    transform: scale(1.05);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  }
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
`;

export const AssignmentCard = styled.div`
  background: rgba(255, 255, 255, 0.85);
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(8px);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
  }
`;

export const AssignmentTitle = styled.h3`
  font-size: 19px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50;
`;

export const AssignmentDescription = styled.p`
  color: #555;
  margin-bottom: 15px;
  font-size: 15px;
  line-height: 1.5;
`;

export const AssignmentButton = styled.button`
  background: linear-gradient(135deg, #28a745, #218838);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #218838;
    transform: scale(1.05);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  }
`;

export const AssignmentDoneMessage = styled.p`
  color: #28a745;
  font-weight: bold;
  text-align: center;
  font-size: 16px;
`;
