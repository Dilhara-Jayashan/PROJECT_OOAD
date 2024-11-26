import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // for navigation
import axios from 'axios'; // for API requests

function AddEmployee() {

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
    const navigate = useNavigate(); // to navigate after success
    // Function to generate random manager ID
    const generateCode = (type) => {
        const randomNumbers = Math.floor(10000 + Math.random() * 90000);
        return `EMPID${randomNumbers}`;
    };
    useEffect(() => {
        setEmployee((prevInputs) => ({
            ...prevInputs,
            empid: generateCode(),
        }));
    }, []);
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
            // API endpoint
            const response = await axios.post('http://localhost:8080/employe', employee);
            if (response.status === 200 || response.status === 201) {
                alert('Employee added successfully!');
                navigate('/employeDash'); // Redirect to items page
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
                    <p className='nav_items active_nav' onClick={() => (window.location.href = '/addEmployee')}>Add Employee</p>
                    <p className='nav_items ' onClick={() => (window.location.href = '/employeDash')}>Employee</p>
                    <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
                </div>
                <div>
                    <h2 className='topic_main_from'>Add New Employee</h2>
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
                            <textarea type="text" name="address" value={employee.totalWeight} rows={3} onChange={handleChange} required />
                        </div>

                        <button className='from_btn' type="submit">Add employee</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee
