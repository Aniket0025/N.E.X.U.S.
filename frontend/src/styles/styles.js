import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background-color: #343a40;
  color: white;
  font-family: Arial, sans-serif;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const Logo = styled.img`
  width: 50px;
  height: auto;

  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const NavigationLinks = styled.div`
  display: flex;
  align-items: center;
  font-family: Arial, sans-serif;

  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const NavLink = styled.a`
  margin-right: 20px;
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease;
  font-family: Arial, sans-serif;
  &:hover {
    color: #17a2b8;
  }

  @media screen and (max-width: 768px) {
    margin: 0 10px;
    font-size: 16px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 35px;
  font-family: Arial, sans-serif;
  @media screen and (max-width: 768px) {
    margin-top: 10px;
    margin-right: 0;
  }
`;

export const LoginButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

export const GuestButton = styled.button`
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: Arial, sans-serif;
  &:hover {
    background-color: #007bff;
    color: white;
  }

  @media screen and (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #f8f9fa;
  min-height: 100vh;
  padding-top: 80px;
  font-family: Arial, sans-serif;
  @media screen and (max-width: 768px) {
    padding-top: 60px;
  }
`;

export const SchoolInfo = styled.div`
  margin-top: 20px;
`;

export const SchoolImage = styled.img`
  width: 80%;
  max-height: 80vh;
  object-fit: cover;
  margin-top: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

export const LoremTextContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 18px;
  color: #555;
  text-align: justify;
  padding: 0 20px;
  font-family: Arial, sans-serif;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const AdminRegisterLink = styled(Link)`
  display: inline-block;
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  &:hover {
    background-color: #218838;
    transform: scale(1.05);
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;