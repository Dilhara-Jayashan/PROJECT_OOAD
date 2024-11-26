import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // for generating PDF tables
import { useNavigate } from 'react-router-dom';
function EmployeeDash() {
  const [employee, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/employe')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the data:', error);
      });
  }, []);

  // Function to generate PDF report
  const generateReport = () => {
    const doc = new jsPDF("landscape");
    const columns = ["ID", "Employee ID", "Employee Name", "Email", "Phone", "Birthday", "Address", "Roll", "Attendance", "Salary"];
    const rows = employee.map(employees => [
      employees.id,
      employees.empid,
      employees.name,
      employees.email,
      employees.phone,
      employees.birthday,
      employees.address,
      employees.roll,
      employees.attendance || 'pending',
      employees.salary || 'pending',
    ]);

    autoTable(doc, { head: [columns], body: rows });
    doc.save('Employee-report.pdf');
  };

  // Handle delete
  const handleDelete = (id) => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this Employee Account?');

    if (confirmDelete) {
      // If confirmed, send a DELETE request to the backend
      axios.delete(`http://localhost:8080/employe/${id}`)
        .then(() => {
          // Remove deleted from the state
          setEmployees(employee.filter(employees => employees.id !== id));
          // Show success alert
          alert('Employee Account deleted successfully!');
          window.location.reload();
        })
        .catch((error) => {
          console.error('There was an error deleting the Employee Account:', error);
          alert('Failed to delete the Employee Account. Please try again.');
        });
    }
  };
  return (
    <div>
      <div className='nav_bar'>
        <p className='nav_items ' onClick={() => (window.location.href = '/addEmployee')}>Add Employee</p>
        <p className='nav_items active_nav' onClick={() => (window.location.href = '/employeDash')}>Employee</p>
        <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
      </div>
      <div>
        <div>
          <h2 className='topic_main'>Employee List</h2>


          {employee.length > 0 ? (
            <div className='table_main_set'>
              <button className='genarate_report' onClick={generateReport}>Generate Report</button>
              <br />
              <div className='tbl_con'>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Employee ID</th>
                      <th>Employee Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Birthday</th>
                      <th>Address</th>
                      <th>Roll</th>
                      <th>Attendance</th>
                      <th>Salary</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employee.map(employe => (
                      <tr key={employe.id}>
                        <td>{employe.id}</td>
                        <td>{employe.empid}</td>
                        <td>{employe.name}</td>
                        <td>{employe.email}</td>
                        <td>{employe.phone}</td>
                        <td>{employe.birthday}</td>
                        <td>{employe.address}</td>
                        <td>{employe.roll}</td>
                        <td>{employe.attendance || 'pending'}</td>
                        <td>{employe.salary || 'pending'}</td>
                        <td>
                          <button onClick={() => navigate(`/updateEmployee/${employe.id}`)} className='tbl_btn'>Update</button>
                          <button onClick={() => handleDelete(employe.id)} className='delet_btn cenbtn'>Delete</button>
                          <button onClick={() => navigate(`/addPayRoll/${employe.id}`)} className='tbl_btn'>Pay Roll</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          ) : (
            <p className='notfound'>not found Items...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeDash
