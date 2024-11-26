import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateEmployee() {
  const { id } = useParams(); // Get item ID from URL
  const [employee, setEmployee] = useState({
    empid: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    birthday: '',
    address: '',
    roll: '',
  });
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch item details by ID to prepopulate the form
    axios.get(`http://localhost:8080/employe/${id}`)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
        alert("Failed to load item data. Please try again.");
      });
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/employe/${id}`, employee);
      alert(" updated successfully!");
      navigate("/employeDash"); // Redirect back to inventory dashboard
    } catch (error) {
      console.error("Error updating :", error);
      alert("Failed to update . Please try again.");
    }
  };

  return (
    <div>
      <div>
        <div>
          <div className='nav_bar'>
            <p className='nav_items' onClick={() => (window.location.href = '/addEmployee')}>Add Employee</p>
            <p className='nav_items ' onClick={() => (window.location.href = '/employeDash')}>Employee</p>
            <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
          </div>
          <div>
            <h2 className='topic_main_from'>Update Employee</h2>
            <form className='from_full'  onSubmit={handleSubmit}>
              <div>
                <label>Employee ID:</label>
                <input type="text" name="empid" readOnly value={employee.empid} required />
              </div>
              <div>
                <label>Employee Name:</label>
                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>email:</label>
                <input
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>password :</label>
                <input
                  type="password"
                  name="password"
                  value={employee.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={employee.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>birthday:</label>
                <input
                  type="date"
                  name="birthday"
                  value={employee.birthday}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>roll:</label>
                <select
                  name="roll"
                  value={employee.roll}
                  required
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Role</option>
                  <option value="Labours">Labours</option>
                  <option value="Machine Operators">Machine Operators</option>
                  <option value="Managers">Managers</option>
                </select>

              </div>
              <div>
                <label>address:</label>
                <textarea
                  name="address"
                  value={employee.address}
                  rows={3}
                  onChange={handleChange}
                  required
                />

              </div>

              <div>
                <label>attendance:</label>
                <input type="text" name="attendance" value={employee.attendance} onChange={handleChange} readOnly />
              </div>
              <div>
                <label>salary:</label>
                <input type="text" name="salary" value={employee.salary} onChange={handleChange} readOnly />
              </div>
              <button className='from_btn' type="submit">update employee</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateEmployee
