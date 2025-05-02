import styled from 'styled-components';

export const AnnouncementContainer = styled.div`
  display: flex;
  padding-left: 240px;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
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

export const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const AnnouncementForm = styled.form`
  background: rgba(255, 255, 255, 0.8); /* Glass effect */
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #007bff;
  border-radius: 6px;
  transition: border 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border: 2px solid #0056b3;
    box-shadow: 0 0 10px rgba(0, 91, 255, 0.3);
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 12px 18px;
  font-size: 16px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #0056b3;
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }
`;

export const AnnouncementList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

export const AnnouncementItem = styled.li`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const AnnouncementContent = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.5;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
`;

export const AnnouncementHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2c3e50;
  text-align: center;
`;

export const AnnouncementTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #007bff;
`;
