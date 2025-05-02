import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #eef2f3, #dfe9f3);
  font-family: Arial, sans-serif;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 0 15px 15px 0;
  transition: all 0.3s ease;

  @media screen and (max-width: 768px) {
    width: 100%;
    border-radius: 0;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 30px;
`;

export const ProfileHeader = styled.h1`
  font-size: 28px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 20px;
  color: #2c3e50;
`;

export const ProfileDetails = styled.div`
  max-width: 450px;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const ProfileDetail = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }
`;

export const ProfileLabel = styled.label`
  font-weight: bold;
  color: #333;
`;

export const ProfileInfo = styled.p`
  color: #555;
  font-size: 16px;
`;

export const Label = styled.span`
  font-weight: bold;
  color: #333;
`;

export const Value = styled.span`
  color: #007bff;
  font-weight: bold;
`;

export const EditButton = styled.button`
  padding: 12px 20px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  display: block;
  width: 100%;
  margin-top: 15px;

  &:hover {
    background: #0056b3;
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
  }
`;
