import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // for navigation
import axios from 'axios'; // for API requests

function AddClient() {

  const [client, setClient] = useState({
    clientCode: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const navigate = useNavigate(); // to navigate after success
  // Function to generate random manager ID
  const generateCode = (type) => {
    const randomNumbers = Math.floor(10000 + Math.random() * 90000);
    return `CCode${randomNumbers}`;
  };
  useEffect(() => {
    setClient((prevInputs) => ({
      ...prevInputs,
      clientCode: generateCode(),
    }));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API endpoint
      const response = await axios.post('http://localhost:8080/client', client);
      if (response.status === 200 || response.status === 201) {
        alert('client added successfully!');
        navigate('/clientdash'); // Redirect to items page
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };


  return (
    <div>
      <div>
        <div className='nav_bar'>
          <p className='nav_items active_nav' onClick={() => (window.location.href = '/addclient')}>Add Clients</p>
          <p className='nav_items ' onClick={() => (window.location.href = '/clientdash')}>Client Details</p>
          <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
        </div>
      </div>
      <h2 className='topic_main_from'>Add New Client</h2>
      <form className='from_full' onSubmit={handleSubmit}>
        <div>
          <label>client Code:</label>
          <input type="text" name="clientCode" readOnly value={client.clientCode} required />
        </div>
        <div>
          <label>client Name:</label>
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>email:</label>
          <input
            type="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>password :</label>
          <input
            type="password"
            name="password"
            value={client.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>phone:</label>
          <input
            type="text"
            name="phone"
            value={client.phone}
            onChange={handleChange}
            required
          />
        </div>



        <div>
          <label>address:</label>
          <textarea type="text" name="address" value={client.address} rows={3} onChange={handleChange} required />
        </div>

        <button className='from_btn' type="submit">Add client</button>
      </form>
    </div>
  )
}

export default AddClient
