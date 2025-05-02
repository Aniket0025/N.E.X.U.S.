import styled from 'styled-components';

export const AdminDashboardContainer = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
  background-color: #f5f7fa;
  min-height: 100vh;
`;

export const Content = styled.div`
  flex: 1;
  padding: 30px;
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '80px')}; /* Sidebar state */
  transition: margin-left 0.3s ease;
`;

export const TopContent = styled.div`
  display: flex;
  gap: 20px;
  flex: 1;
`;

export const BottomContent = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap; /* Ensures responsiveness */
`;

export const Section = styled.section`
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const SectionTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 15px;
  color: #2c3e50;
  font-weight: bold;
`;

export const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  flex: 1;
  max-width: 250px;
  min-width: 200px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const CardContent = styled.p`
  font-size: 16px;
  opacity: 0.9;
`;

export const StudentDashboardContainer = styled.div`
  display: flex;
  padding-left: 240px;
  flex-direction: column;
`;

export const TeacherDashboardContainer = styled.div`
  display: flex;
  padding-left: 240px;
  flex-direction: column;
`;



export const EventItem = styled.div`
  background: rgba(255, 255, 255, 0.7);
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 10px;
  color: #000; /* Black text */
  backdrop-filter: blur(5px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;
