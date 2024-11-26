import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // for navigation
import axios from 'axios'; // for API requests

function AddClientJob() {
  const [job, setjob] = useState({
    jobCode: '',
    clientCode: '',
    estimateTime: '',
    progress: '',
    stockNeed: '',
    quantity: '',
  });
  const navigate = useNavigate(); // to navigate after success
  // Function to generate random manager ID
  const generateCode = (type) => {
    const randomNumbers = Math.floor(10000 + Math.random() * 90000);
    return `JC${randomNumbers}`;
  };
  useEffect(() => {
    setjob((prevInputs) => ({
      ...prevInputs,
      jobCode: generateCode(),
    }));
  }, []);
  useEffect(() => {
    // Retrieve the client ID from localStorage
    const selectedClientId = localStorage.getItem('selectedClientId');
    if (selectedClientId) {
      setjob((prevInputs) => ({
        ...prevInputs,
        clientCode: selectedClientId, // Set the clientCode from localStorage
      }));
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setjob((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure clientCode is included in the job object
      const response = await axios.post('http://localhost:8080/jobTicket', job);
      if (response.status === 200 || response.status === 201) {
        alert('Job added successfully!');
        navigate('/clientProfile'); // Redirect to client profile page
      }
    } catch (error) {
      console.error('Error adding job:', error);
      alert('Failed to add job. Please try again.');
    }
  };
  return (
    <div>
      <div className='nav_bar'>
        <p className='nav_items active_nav' onClick={() => (window.location.href = '/addjobClient')}>Add JOB</p>
        <p className='nav_items ' onClick={() => (window.location.href = '/clientProfile')}>Job Details</p>
        <p className='nav_items ' onClick={() => (window.location.href = '/clientdash')}>Main dashboard</p>
        <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
      </div>
      <p className='topic_main_from'>Job ticket</p>
      <form className='from_full' onSubmit={handleSubmit}>
        <div>
          <label>jobCode:</label>
          <input type="text" name="jobCode" readOnly value={job.jobCode} required />
        </div>
        <div>
          <label>client id:</label>
          <input
            type="text"
            name="clientCode"
            readOnly
            value={job.clientCode}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>estimate Time:</label>
          <input
            type="text"
            name="estimateTime"
            value={job.estimateTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>progress :</label>
          <input
            type="text"
            name="progress"
            value={job.progress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>quantity:</label>
          <input
            type="number"
            name="quantity"
            value={job.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>stock Need:</label>
          <textarea type="text" name="stockNeed" value={job.stockNeed} rows={3} onChange={handleChange} required />
        </div>

        <button className='from_btn' type="submit">Add job</button>
      </form>
    </div>
  )
}

export default AddClientJob
