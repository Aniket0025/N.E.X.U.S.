import React, { useContext } from 'react';
import { 
  SidebarContainer, 
  SidebarHeader, 
  SidebarNav, 
  SidebarNavItem, 
  StyledLink, 
  SidebarIcon, 
  Logo 
} from '../../styles/SidebarStyles';

import { BsGraphUp, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots } from 'react-icons/bs';
import { StudentContext } from '../../contexts/StudentContext';
import logo from "../../assets/logo.png";

const StudentSidebar = () => {
  const {student}=useContext(StudentContext);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <Logo src={logo} alt="Logo" />
      </SidebarHeader>
      <SidebarHeader>{student.name}</SidebarHeader>
      <SidebarNav>
        <SidebarNavItem>
          <SidebarIcon><BsGraphUp /></SidebarIcon>
          <StyledLink to="/student/dashboard">Dashboard</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsFileText /></SidebarIcon>
          <StyledLink to="/student/assignments">Assignments</StyledLink>
        </SidebarNavItem>
        {/* <SidebarNavItem>
          <SidebarIcon><BsBook /></SidebarIcon>
          <StyledLink to="/student/exams">Exams</StyledLink>
        </SidebarNavItem> */}
        {/* <SidebarNavItem>
          <SidebarIcon><BsGraphDown /></SidebarIcon>
          <StyledLink to="/student/performance">Performance</StyledLink>
        </SidebarNavItem> */}
        <SidebarNavItem>
          <SidebarIcon><BsCalendar /></SidebarIcon>
          <StyledLink to="/student/attendance">Attendance</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsBook /></SidebarIcon>
          <StyledLink to="/student/digitalLibraryStudent">Digital Library</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsChatDots /></SidebarIcon>
          <StyledLink to="/student/communication">Announcement</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsGear /></SidebarIcon>
          <StyledLink to="/student/settings">Profile</StyledLink>
        </SidebarNavItem>
        
      </SidebarNav>
    </SidebarContainer>
  );
};

export default StudentSidebar;
