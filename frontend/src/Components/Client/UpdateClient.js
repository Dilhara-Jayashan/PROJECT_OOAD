import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function UpdateClient() {
  const { id } = useParams(); // Get item ID from URL
  const [job, setjob] = useState({
    jobCode: '',
    clientCode: '',
    estimateTime: '',
    progress: '',
    stockNeed: '',
    quantity: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch item details by ID to prepopulate the form
    axios.get(`http://localhost:8080/jobTicket/${id}`)
      .then((response) => {
        setjob(response.data);
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
        alert("Failed to load item data. Please try again.");
      });
  }, [id]);
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
      await axios.put(`http://localhost:8080/jobTicket/${id}`, job);
      alert(" updated successfully!");
      navigate("/clientProfile"); // Redirect back to inventory dashboard
    } catch (error) {
      console.error("Error updating :", error);
      alert("Failed to update . Please try again.");
    }
  };
  return (
    <div>
      <div className='nav_bar'>
        <p className='nav_items' onClick={() => (window.location.href = '/addjobClient')}>Add JOB</p>
        <p className='nav_items' onClick={() => (window.location.href = '/clientProfile')}>Job Details</p>
        <p className='nav_items' onClick={() => (window.location.href = '/clientdash')}>Main dashboard</p>
        <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
      </div>
      <p className='topic_main_from'>Update Job ticket</p>
      <form  className='from_full' onSubmit={handleSubmit}>
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

        <button  className='from_btn' type="submit">update job</button>
      </form>
    </div>
  )
}

export default UpdateClient
