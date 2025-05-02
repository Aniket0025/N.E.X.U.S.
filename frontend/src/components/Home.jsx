// Home.js
import React from 'react';
import { Navbar, Logo, NavigationLinks, NavLink, ButtonsContainer, LoginButton, GuestButton, HomeContainer, SchoolInfo, SchoolImage, Title, LoremTextContainer, AdminRegisterLink } 
from '../styles/styles'
import { LoremIpsum } from 'lorem-ipsum';
import bg from "../assets/bg.png";
import bg1 from "../assets/bg1.png";
import { Link, useNavigate } from 'react-router-dom'; 
import "./Home.css"

const lorem = new LoremIpsum();

const Home = () => {
  const navigate = useNavigate();
  const loremText = lorem.generateParagraphs(1);

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  return (
    <>
      <Navbar>
        <div className='logo'>N.E.X.U.S.</div>
        <NavigationLinks>
          <NavLink href="#">About Us</NavLink>
          <NavLink href="#">Products</NavLink>
          <NavLink href="#">Contact Us</NavLink>
        </NavigationLinks>
        <ButtonsContainer>
          <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
          <GuestButton onClick={handleLoginClick}>Guest Mode</GuestButton>
        </ButtonsContainer>
      </Navbar>
      <HomeContainer>
        <SchoolInfo>
          <Title>N.E.X.U.S.</Title>
          <LoremTextContainer>
            <p>Education is the foundation of a brighter future, and managing it efficiently is essential for success. Our School Management System is designed to streamline and simplify all school-related operations, ensuring a seamless experience for administrators, teachers, students, and parents.
              <br />

With our user-friendly platform, schools can digitally manage student records, track attendance, organize assignments, schedule exams, monitor library resources, and handle events and announcements, all in one centralized system.</p>
          </LoremTextContainer>
          <AdminRegisterLink to="/admin/register">Admin Register</AdminRegisterLink>
        </SchoolInfo>
        {/* <SchoolImage src={bg} alt="pupils" /> */}
      </HomeContainer>
    </>
  );
};

export default Home;
