import React, { useState } from 'react';
import './client.css'
function ClientLogin() {
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
        throw new Error(error.message || 'Invalid credentials');
      }

      const user = await response.json();
      alert('Logged in successfully');
      console.log('User details:', user);

      // Redirect user based on the role
      window.location.href = `/clientdash`; // Replace `/dash` with the appropriate dashboard
    } catch (error) {
      alert(error.message); // Display error message
      console.error('Login error:', error);
    }
  };
  return (
    <div>
      <div className='auth_conntainer'>
        <div className='auth_sub'></div>
        <div className='lft_sub'>
          <div className='from_set'>
            <p className='from_topic'>Client Manager Login</p>
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
            <button onClick={handleLogin} className='from_btn'>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientLogin
