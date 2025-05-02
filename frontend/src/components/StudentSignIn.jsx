import React, { useContext, useState } from "react";
import { StudentSignInContainer, FormContainer, InputField, SubmitButton } from "../styles/StudentSignInStyles";
import axios from "axios";
import { StudentContext } from "../contexts/StudentContext";
import { useNavigate } from "react-router-dom";

const StudentSignIn = () => {
  const { setStudent } = useContext(StudentContext); // ✅ Get setStudent from context
  const navigate = useNavigate(); // ✅ Get navigate hook

  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/student/signin",
        { name, registrationNumber }
      );

      if (response.status === 200) {
        navigate("/student/dashboard"); // ✅ Navigate without page reload
        setStudent(response.data.student);
        localStorage.setItem("studentToken", response.data.token);
        console.log("Student ID received:", response.data.student._id); // ✅ Save token
        localStorage.setItem("studentId", response.data.student._id); // ✅ Save studentId
        
      } else {
        console.error("Sign-in failed");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <StudentSignInContainer>
      <h2>Student Sign In</h2>
      <FormContainer>
        <InputField
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          required
        />
        <SubmitButton onClick={handleSignIn}>Sign In</SubmitButton>
      </FormContainer>
    </StudentSignInContainer>
  );
};

export default StudentSignIn;
