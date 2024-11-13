// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import FacultyList from './components/FacultyList';
import FileUpload from './components/FileUpload'; // Import the FileUpload component


function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/students" element={<StudentList />} />
          <Route path="/faculty" element={<FacultyList />} />
          <Route path="/upload" element={<FileUpload />} /> {/* Use FileUpload component here */}
        </Routes>
      </div>
 
    </Router>
  );
}

export default App;
