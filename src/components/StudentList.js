import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const saveStudent = async () => {
    try {
      const studentData = { name, age, grade };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, studentData);

        setEditingId(null);
      } else {
        await axios.post(API_URL, studentData);
      }

      setName('');
      setAge('');
      setGrade('');
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);

      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  };

  // CSV Download Function
  const downloadAsCSV = () => {
    if (!students || students.length === 0) {
      alert("No student data available for download.");
      return;
    }

    // Generate CSV content
    const csvContent = students.map(student => 
     `${student.name},${student.age},${student.grade}`

    ).join('\n');

    const blob = new Blob([`Name,Age,Grade\n${csvContent}`], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = "students.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Student List</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <input 
          placeholder="Age" 
          type="number"
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <input 
          placeholder="Grade" 
          value={grade} 
          onChange={(e) => setGrade(e.target.value)} 
          style={{
            flex: 1,
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
      
      <button 
        onClick={saveStudent} 
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          backgroundColor: editingId ? '#FFA726' : '#4CAF50',
          color: 'white',
          marginBottom: '20px',
        }}
      >
        {editingId ? "Update Student" : "Add Student"}
      </button>

      <button 
        onClick={downloadAsCSV} 
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          backgroundColor: '#2196F3',
          color: 'white',
          marginBottom: '20px',
          marginLeft: '10px'
        }}
      >
        Download CSV
      </button>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {students.map(student => (
          <li 
            key={student._id} 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid #ddd',
            }}
          >
            <span>{student.name} - Age: {student.age}, Grade: {student.grade}</span>
            <div>
              <button 
                onClick={() => editStudent(student)} 
                style={{
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  marginRight: '10px',
                  backgroundColor: '#FFA726',
                  color: 'white',
                  border: 'none',
                }}
              >
                Edit
              </button>
              <button 
                onClick={() => deleteStudent(student._id)} 
                style={{
                  padding: '5px 10px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  backgroundColor: '#E57373',
                  color: 'white',
                  border: 'none',
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
