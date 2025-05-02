import styled from 'styled-components'; 
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px; 
  height: 100%;
  background: linear-gradient(180deg, #2c3e50, #1a252f); /* Smooth gradient */
  color: white;
  overflow-y: auto; 
  padding-top: 20px;
  font-family: Arial, sans-serif;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out;
  border-right: 2px solid #34495e;
`;

export const SidebarHeader = styled.div`
  padding: 15px;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid #3a4a5a;
  letter-spacing: 1px;
  font-family: Arial, sans-serif;
  transition: color 0.3s ease-in-out;
`;

export const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SidebarNavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 16px;
  border-bottom: 1px solid #3a4a5a;
  transition: all 0.3s ease-in-out;
  font-family: Arial, sans-serif;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: 12px;
  font-weight: 500;
  font-family: Arial, sans-serif;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #1abc9c; /* Teal hover effect */
  }
`;

export const SidebarIcon = styled.div`
  margin-right: 12px;
  font-size: 18px;
  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;

  ${SidebarNavItem}:hover & {
    transform: scale(1.1);
    color: #1abc9c;
  }
`;

export const Logo = styled.img`
  width: 65px;
  height: auto;
  display: block;
  margin: 10px auto;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
