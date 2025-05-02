import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AdminSignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f4f4f4; /* Softer background for minimalistic look */
  min-height: 100vh;
  font-family: Arial, sans-serif;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 350px; /* Slightly wider form for better spacing */
  padding: 25px;
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin: 12px 0;
  border: 1px solid #bbb;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.3);
  }
`;

export const SubmitButton = styled(Link)`
  width: 100%;
  max-width: 200px; /* Restrict button growth */
  padding: 12px; /* Reduce padding slightly */
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
    transform: scale(1.03); /* Reduce hover scale effect */
  }
  
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
