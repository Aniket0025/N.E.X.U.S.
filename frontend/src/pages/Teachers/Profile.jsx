import React, { useState } from 'react';
import Sidebar from './Sidebar';
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileHeader,
  ProfileDetails,
  ProfileLabel,
  ProfileInfo,
  EditButton
} from '../../styles/SettingsProfileStyles';

const TeacherProfileSection = () => {
  const [teacherInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
    qualification: 'Master of Education',
  });

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>👤 Profile Details</ProfileHeader>
        <ProfileDetails>
          <div>
            <ProfileLabel>Name:</ProfileLabel>
            <ProfileInfo>{teacherInfo.name}</ProfileInfo>
          </div>
          <div>
            <ProfileLabel>Email:</ProfileLabel>
            <ProfileInfo>{teacherInfo.email}</ProfileInfo>
          </div>
          <div>
            <ProfileLabel>Phone:</ProfileLabel>
            <ProfileInfo>{teacherInfo.phone}</ProfileInfo>
          </div>
          <div>
            <ProfileLabel>Address:</ProfileLabel>
            <ProfileInfo>{teacherInfo.address}</ProfileInfo>
          </div>
          <div>
            <ProfileLabel>Qualification:</ProfileLabel>
            <ProfileInfo>{teacherInfo.qualification}</ProfileInfo>
          </div>
        </ProfileDetails>
        <EditButton>Edit Profile</EditButton>
      </Content>
    </ProfileContainer>
  );
};

export default TeacherProfileSection;
