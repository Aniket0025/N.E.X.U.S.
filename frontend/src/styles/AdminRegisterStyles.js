import styled from 'styled-components';

export const AdminRegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f0f0f0, #e6e6e6); /* Softer, minimalistic gradient */
  font-family: Arial, sans-serif;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;

  @media screen and (max-width: 768px) {
    padding: 15px;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 350px;
  padding: 25px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.7); /* Light glassmorphism effect */
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  margin-top: 15px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
