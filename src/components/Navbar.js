// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; // Optional: for styling

function Navbar() {
  return (
    <nav style={{ backgroundColor: '#333', padding: '10px' }}>
      <h1 style={{ color: '#fff', textAlign: 'center' }}>CRUD MVC</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link to="/students" style={{ color: '#fff', textDecoration: 'none' }}>Students</Link>
        <Link to="/faculty" style={{ color: '#fff', textDecoration: 'none' }}>Faculty</Link>
        <Link to="/upload" style={{ color: '#fff', textDecoration: 'none' }}>Upload</Link>
      </div>
    </nav>
  );
}

export default Navbar;
