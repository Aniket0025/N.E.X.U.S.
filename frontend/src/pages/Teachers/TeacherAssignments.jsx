import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  AssignmentsContainer,
  SidebarContainer,
  Content,
  AssignmentCard,
  AssignmentTitle,
  AssignmentDescription,
} from "../../styles/AssignmentsStyles";

const TeacherAssignments = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/assignments/submissions");
      setSubmissions(response.data.submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  return (
    <AssignmentsContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <h1>Submitted Assignments</h1>
        {submissions.map((submission) => (
          <AssignmentCard key={submission._id}>
            <AssignmentTitle>{submission.assignmentId.title}</AssignmentTitle>
            <AssignmentDescription>
              <strong>Student:</strong> {submission.studentId.name} ({submission.studentId.registrationNumber})
            </AssignmentDescription>
            <p><strong>Submission:</strong> {submission.submissionText}</p>
            <p><strong>Submitted At:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
          </AssignmentCard>
        ))}
      </Content>
    </AssignmentsContainer>
  );
};

export default TeacherAssignments;
