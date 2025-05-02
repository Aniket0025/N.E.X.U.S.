import React, { createContext, useState } from "react";

// Create context
export const StudentContext = createContext();

// Provider component
export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState({
    id:'',
    name:'',
    registrationNumber:'',
    grade:'',
  }); // Global student state

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
