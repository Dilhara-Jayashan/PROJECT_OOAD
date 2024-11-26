import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AddPayRoll() {
  const [attendance, setAttendance] = useState(0); // To capture attendance days
  const [salary, setSalary] = useState(0); // To display the calculated salary
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
    attendance: '',
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
      // Add salary to employee object
      const employeeWithSalary = {
        ...employee, salary,
        attendance
      };

      const response = await axios.post('http://localhost:8080/employe', employeeWithSalary);
      if (response.status === 200 || response.status === 201) {
        alert('Employee salary added successfully!');
        navigate('/employeDash');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };

  const calculateSalary = (attendance, role) => {
    let dailySalary = 0;

    if (role === "Labours") {
      dailySalary = 1000;
    } else if (role === "Machine Operators") {
      dailySalary = 3000;
    } else if (role === "Managers") {
      dailySalary = 5000;
    }

    return dailySalary * attendance;
  };
  useEffect(() => {
    // Fetch employee data from the API using the ID from the URL params
    axios.get(`http://localhost:8080/employe/${id}`)
      .then((response) => {
        // Update the employee state with the fetched data, including attendance and salary
        setEmployee(response.data);
        setAttendance(response.data.attendance || 0); // Set attendance from the response
        setSalary(response.data.salary || 0); // Set salary from the response
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
        alert("Failed to load employee data. Please try again.");
      });
  }, [id]); // Add 'id' as a dependency to re-fetch when the id changes

  return (
    <div>
      <div>
        <div className='nav_bar'>
          <p className='nav_items' onClick={() => (window.location.href = '/addEmployee')}>Add Employee</p>
          <p className='nav_items ' onClick={() => (window.location.href = '/employeDash')}>Employee</p>
          <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
        </div>
        <div>
          <h2 className='topic_main_from'>Add Pay Roll</h2>
          <form className='from_full' onSubmit={handleSubmit}>
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
                readOnly
              />
            </div>


            <div>
              <label>phone:</label>
              <input
                type="text"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
                readOnly
              />
            </div>

            <div>
              <label>roll:</label>
              <input
                type="roll"
                name="roll"
                value={employee.roll}
                onChange={handleChange}
                readOnly
              />

            </div>
            <div>
              <label>address:</label>
              <textarea
                name="address"
                value={employee.address}
                rows={3}
                onChange={handleChange}
                readOnly
              />

            </div>

            <div>
              <label>Attendance Days:</label>
              <input
                type="number"
                name="attendance"
                value={attendance}
                onChange={(e) => {
                  const days = parseInt(e.target.value, 10);
                  setAttendance(days);
                  setSalary(calculateSalary(days, employee.roll)); // Recalculate salary on attendance change
                }}
                required
              />
            </div>

            <div>
              <label>Calculated Salary:</label>
              <input
                type="text"
                name="salary"
                value={salary}
                readOnly
              />
            </div>

            <button className='from_btn' type="submit">Add</button>
          </form>


        </div>
      </div>
    </div>
  )
}

export default AddPayRoll
