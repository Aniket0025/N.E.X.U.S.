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

import { BsGraphUp, BsPeople, BsPerson, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots, BsCalendarEvent } from 'react-icons/bs';
import { FaBookOpen } from "react-icons/fa6";
import { TeacherContext } from '../../contexts/TeacherContext';
import logo from "../../assets/logo.png"

const TeacherSidebar = () => {
  const {teacher}=useContext(TeacherContext);
  return (
    <SidebarContainer>
      <SidebarHeader>
        <Logo src={logo} alt="Logo" /> 
      </SidebarHeader>
      <SidebarHeader>{teacher.name}</SidebarHeader>
      <SidebarNav>
        <SidebarNavItem>
          <SidebarIcon><BsGraphUp /></SidebarIcon>
          <StyledLink to="/teacher/dashboard">Dashboard</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsPeople /></SidebarIcon>
          <StyledLink to="/teacher/classes">Classes</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsPeople /></SidebarIcon>
          <StyledLink to="/teacher/students">Students</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsPerson /></SidebarIcon>
          <StyledLink to="/teacher/teachers">Teachers</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsFileText /></SidebarIcon>
          <StyledLink to="/teacher/assignments">Assignments</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsFileText /></SidebarIcon>
          <StyledLink to="/teacher/submissions">Submissions</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><FaBookOpen/></SidebarIcon>
          <StyledLink to="/teacher/addsubject">Add Subject</StyledLink>
        </SidebarNavItem>
        {/* <SidebarNavItem>
          <SidebarIcon><BsBook /></SidebarIcon>
          <StyledLink to="/teacher/exams">Exams</StyledLink>
        </SidebarNavItem> */}
        {/* <SidebarNavItem>
          <SidebarIcon><BsGraphDown /></SidebarIcon>
          <StyledLink to="/teacher/performance">Performance</StyledLink>
        </SidebarNavItem> */}
        <SidebarNavItem>
          <SidebarIcon><BsCalendar /></SidebarIcon>
          <StyledLink to="/teacher/attendance">Attendance</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsChatDots /></SidebarIcon>
          <StyledLink to="/teacher/communication">Announcement</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsCalendarEvent /></SidebarIcon>
          <StyledLink to="/teacher/events">Events & Calendar</StyledLink>
        </SidebarNavItem>
        {/* <SidebarNavItem>
          <SidebarIcon><BsGear /></SidebarIcon>
          <StyledLink to="/teacher/settings">Settings & Profile</StyledLink>
        </SidebarNavItem> */}
        
      </SidebarNav>
    </SidebarContainer>
  );
};

export default TeacherSidebar; 
