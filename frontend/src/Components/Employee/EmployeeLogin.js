import React, { useState } from 'react';
import './Employee.css'
function EmployeeLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        const role = localStorage.getItem('role'); // Retrieve role from localStorage

        if (!role) {
            setErrorMessage('Role not found, please try again.');
            return;
        }

        const loginData = {
            email,
            password,
            type: role, // Include the role in the request
        };

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Send JSON
                },
                body: JSON.stringify(loginData), // Use JSON.stringify for the body
            });

            if (!response.ok) {
                const error = await response.json(); // Parse the error response
                throw new Error(error.message || 'Invalid credentials ');
            }

            const user = await response.json();
            alert('Logged in successfully');
            console.log('User details:', user);

            // Redirect user based on the role
            window.location.href = `/employeDash`; // Replace `/dash` with the appropriate dashboard
        } catch (error) {
            alert(error.message); // Display error message
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            <div className='auth_conntainer'>
                <div className='auth_sub_emp'></div>
                <div className='lft_sub'>
                    <div className='from_set'>
                        <h2 className='from_topic'>Employee Manager Login</h2>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button className='from_btn' onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeLogin;
