import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // List of valid credentials
  const validUsers = [
    { username: 'admin', password: '123' },
    { username: 'admin1', password: '456' }, 
    { username: 'admin2', password: '789' },
  ];

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the provided username and password match any valid user
    const user = validUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Show success alert and navigate to the dashboard
      alert('Login Success!');
      navigate('/adminDash'); // assuming you have a dashboard route set up
    } else {
      // Show error alert for invalid login
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <div className='auth_conntainer'>
        <div className='auth_sub_admin'></div>

        <div className='lft_sub'>
          <div className='from_set'>
            <h2 className='from_topic'>Admin Login</h2>
            <form onSubmit={handleLogin}>
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className='from_btn'>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
