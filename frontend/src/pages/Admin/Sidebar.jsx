import React from 'react';
import { SidebarContainer, SidebarHeader, SidebarNav, SidebarNavItem, StyledLink, SidebarIcon, Logo } from '../../styles/SidebarStyles';
import { BsGraphUp, BsPeople, BsPerson, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots, BsCalendarEvent } from 'react-icons/bs';
import logo from "../../assets/logo.png";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarHeader>
        <Logo src={logo} alt="Logo" />
      </SidebarHeader>
      <SidebarNav>
        <SidebarNavItem>
          <SidebarIcon><BsGraphUp /></SidebarIcon>
          <StyledLink to="/admin/dashboard">Dashboard</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsPeople /></SidebarIcon>
          <StyledLink to="/admin/classes">Classes</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsPeople /></SidebarIcon>
          <StyledLink to="/admin/students">Students</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsPerson /></SidebarIcon>
          <StyledLink to="/admin/teachers">Teachers</StyledLink>
        </SidebarNavItem>
        {/* <SidebarNavItem>
          <SidebarIcon><BsFileText /></SidebarIcon>
          <StyledLink to="/admin/assignments">Assignments</StyledLink>
        </SidebarNavItem> */}
        {/* <SidebarNavItem>
          <SidebarIcon><BsBook /></SidebarIcon>
          <StyledLink to="/admin/exams">Exams</StyledLink>
        </SidebarNavItem> */}
        {/* <SidebarNavItem>
          <SidebarIcon><BsGraphDown /></SidebarIcon>
          <StyledLink to="/admin/performance">Performance</StyledLink>
        </SidebarNavItem> */}
        <SidebarNavItem>
          <SidebarIcon><BsCalendar /></SidebarIcon>
          <StyledLink to="/admin/attendance">Attendance</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsBook /></SidebarIcon>
          <StyledLink to="/admin/digitalLibrary">Digital Library</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon><BsChatDots /></SidebarIcon>
          <StyledLink to="/admin/communication">Announcement</StyledLink>
        </SidebarNavItem>
        
        {/* <SidebarNavItem>
          <SidebarIcon><BsCalendarEvent /></SidebarIcon>
          <StyledLink to="/admin/events">Events & Calendar</StyledLink>
        </SidebarNavItem> */}
        <SidebarNavItem>
          <SidebarIcon><BsGear /></SidebarIcon>
          <StyledLink to="/admin/settings">Settings & Profile</StyledLink>
        </SidebarNavItem>
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;
