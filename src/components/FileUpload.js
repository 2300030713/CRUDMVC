// frontend/src/components/FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // To determine message type (success/error)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file.');
      setMessageType('error');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('studentId', studentId);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('File uploaded and details saved');
      setMessageType('success');
    } catch (error) {
      setMessage('Error uploading file');
      setMessageType('error');
    }
  };

  // Inline CSS styles
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const headingStyle = {
    color: '#4CAF50',
    fontSize: '24px',
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#45a049',
  };

  const messageStyle = {
    marginTop: '20px',
    fontSize: '16px',
    color: '#333',
  };

  const errorStyle = {
    color: 'red',
  };

  const successStyle = {
    color: 'green',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Upload a File</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={handleStudentIdChange}
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
        >
          Upload
        </button>
      </form>
      {message && (
        <p style={{ ...messageStyle, ...(messageType === 'error' ? errorStyle : successStyle) }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default FileUpload;
