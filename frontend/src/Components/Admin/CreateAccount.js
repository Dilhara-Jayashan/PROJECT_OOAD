import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // for navigation
import axios from 'axios'; // for API requests

function CreateAccount() {
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    type: '',
    managerID: '',
  });

  const navigate = useNavigate(); // to navigate after success
  // Function to generate random manager ID
  const generateManagerID = (type) => {
    const randomNumbers = Math.floor(10000 + Math.random() * 90000);
    return `MID${randomNumbers}`;
  };

  useEffect(() => {
    setAdminData((prevInputs) => ({
      ...prevInputs,
      managerID: generateManagerID(),
    }));
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkEmailExists = async (email, type) => {
    try {
      const response = await axios.get(`http://localhost:8080/checkUser?email=${email}&type=${type}`);
      return response.data;  // Assuming the response is a boolean: true if exists, false otherwise.
    } catch (err) {
      console.error("Error checking email:", err);
      return false;  // Return false in case of an error.
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email exists for the selected type
    const emailExists = await checkEmailExists(adminData.email, adminData.type);

    if (emailExists) {
      alert('An account with this email already exists for this type. Please use a different email.');
      return;  // Exit the submit function
    }

    // Generate manager ID based on the type
    const generatedManagerID = generateManagerID(adminData.type);

    // Prepare the data to send in the POST request
    const newAdmin = {
      ...adminData,
      managerID: generatedManagerID, // Add the generated managerID here
    };

    try {
      // Send POST request to backend
      await axios.post('http://localhost:8080/admin', newAdmin);
      alert('Account created successfully!');
      navigate('/adminDash');
    } catch (err) {
      // Handle any error
      alert('Failed to create account. Please try again!');
    }
  };

  return (
    <div>
      <div className='nav_bar'>
        <p className='nav_items active_nav' onClick={() => (window.location.href = '/createAccount')}>Add Managers</p>
        <p className='nav_items' onClick={() => (window.location.href = '/adminDash')}>Managers</p>
        <p className='nav_items' onClick={() => (window.location.href = '/aodpage')}>AOD</p>
        <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
      </div>
      <h2 className='topic_main_from'>Create New Manager Account</h2>
      <form className='from_full' onSubmit={handleSubmit}>
        <div>
          <label>Manager ID:</label>
          <input
            type="text"
            name="name"
            value={adminData.managerID}  // This will cause an error because `generatedManagerID` is not a state
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={adminData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={adminData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={adminData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={adminData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Type:</label>
          <select
            name="type"
            value={adminData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="inventory manager">Inventory Manager</option>
            <option value="client manager">Client Manager</option>
            <option value="employee manager">Employee Manager</option>
          </select>
        </div>


        <button className='from_btn' type="submit">Create Account</button>
      </form>

    </div>
  );
}

export default CreateAccount;
