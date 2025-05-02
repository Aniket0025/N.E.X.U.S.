import React, { createContext, useState } from "react";

// Create context
export const TeacherContext = createContext();

// Provider component
export const TeacherProvider = ({ children }) => {
  const [teacher, setTeacher] = useState({
    id:'',
    name:'',
    email:'',
    subject:'',
    grade:'',
  }); // Global student state

  return (
    <TeacherContext.Provider value={{ teacher,setTeacher }}>
      {children}
    </TeacherContext.Provider>
  );
};
