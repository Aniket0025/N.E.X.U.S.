// TeacherSignIn.js
import React, { useContext, useState } from 'react';
import { TeacherSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/TeacherSignInStyles';
import axios from 'axios';
import { TeacherContext } from '../contexts/TeacherContext';
import { useNavigate } from 'react-router-dom';

const TeacherSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setTeacher}=useContext(TeacherContext);
  const navigate=useNavigate();

  const handleSignIn =async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/users/teacher/signin', { email, password }); 
      if (response.status === 200) {
        setTeacher(response.data.teacher);
        // Sign-in successful, redirect to admin dashboard
        navigate("/teacher/dashboard");
      } else {
        // Handle sign-in errors
        console.error('Sign-in failed');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
    // For demonstration purposes, we'll directly navigate to the teacher dashboard route
    // Replace this with your actual sign-in logic
    console.log('Teacher Sign In:', { email, password });
  };

  return (
    <TeacherSignInContainer>
      <h2>Teacher Sign In</h2>
      <FormContainer>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> 
        {/* Use Link component to navigate to teacher dashboard */}
        <SubmitButton  onClick={handleSignIn}>Sign In</SubmitButton>
      </FormContainer>
    </TeacherSignInContainer>
  );
};

export default TeacherSignIn;
