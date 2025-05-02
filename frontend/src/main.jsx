import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { StudentProvider } from './contexts/StudentContext.jsx'
import { TeacherProvider } from './contexts/TeacherContext.jsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
        <TeacherProvider>
            <StudentProvider>
                <Toaster/>
                <App />
            </StudentProvider>
        </TeacherProvider>
)
