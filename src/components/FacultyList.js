// frontend/src/components/FacultyList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FacultyList() {
  const [facultyList, setFacultyList] = useState([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');
  const [editingId, setEditingId] = useState(null);

  const FACULTY_API_URL = process.env.REACT_APP_FACULTY_API_URL;

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(FACULTY_API_URL);
      setFacultyList(response.data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

  const saveFaculty = async () => {
    if (!name || !department || !experience) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const facultyData = { name, department, experience };

      if (editingId) {
        await axios.put(`${FACULTY_API_URL}/${editingId}`, facultyData);

        setEditingId(null);
      } else {
        await axios.post(FACULTY_API_URL, facultyData);
      }

      setName('');
      setDepartment('');
      setExperience('');
      fetchFaculty();
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const deleteFaculty = async (id) => {
    try {
        await axios.delete(`${FACULTY_API_URL}/${id}`);

      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const editFaculty = (member) => {
    setEditingId(member._id);
    setName(member.name);
    setDepartment(member.department);
    setExperience(member.experience);
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
    input: {
      display: 'block',
      margin: '10px 0',
      padding: '8px',
      width: '100%',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px 15px',
      margin: '10px 5px 20px 0',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#4CAF50',
      color: 'white',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    listButton: {
      padding: '5px 10px',
      marginLeft: '5px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
    },
    editButton: {
      backgroundColor: '#2196F3',
      color: 'white',
    },
    deleteButton: {
      backgroundColor: '#f44336',
      color: 'white',
    }
  };

  return (
    <div style={styles.container}>
      <h2>Faculty List</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Experience (years)"
        type="number"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        style={styles.input}
      />
      <button onClick={saveFaculty} style={styles.button}>
        {editingId ? "Update Faculty" : "Add Faculty"}
      </button>

      <ul>
        {facultyList.map((member) => (
          <li key={member._id} style={styles.listItem}>
            {member.name} - Department: {member.department}, Experience: {member.experience} years
            <div>
              <button
                onClick={() => editFaculty(member)}
                style={{ ...styles.listButton, ...styles.editButton }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteFaculty(member._id)}
                style={{ ...styles.listButton, ...styles.deleteButton }}
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

export default FacultyList;
