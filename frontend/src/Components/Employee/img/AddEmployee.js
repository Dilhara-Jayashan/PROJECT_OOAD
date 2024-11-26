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
        }
        catch (error) {
        }
    };


    return (
    )
}

export default AddEmployee
