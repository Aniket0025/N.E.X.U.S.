// ProfileSection.js
import React, { useContext } from 'react';
import Sidebar from './Sidebar';
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileHeader,
  ProfileInfo,
  ProfileDetail,
  Label,
  Value,
} from '../../styles/SettingsProfileStyles'; // Import styled components from ProfileSectionStyles.js
import { StudentContext } from '../../contexts/StudentContext';



const ProfileSection = () => {
  // Sample student profile data
  const {student}=useContext(StudentContext)

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile</ProfileHeader>
        <ProfileInfo>
          <ProfileDetail>
            <Label>Name:</Label>
            <Value>{student.name}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Grade:</Label>
            <Value>{student.grade}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Registration Number:</Label>
            <Value>{student.registrationNumber}</Value>
          </ProfileDetail>
        </ProfileInfo>
      </Content>
    </ProfileContainer>
  );
};

export default ProfileSection;
