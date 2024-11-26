import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // for generating PDF tables

function AdminDash() {
  const [managers, setManagers] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/admin')
      .then((response) => {
        setManagers(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the managers:', error);
      });
  }, []);

  // Function to generate PDF report
  const generateReport = () => {
    const doc = new jsPDF();
    const columns = ["ID", "Manager ID", "Name", "Email", "Phone", "Type"];
    const rows = managers.map(manager => [
      manager.id,
      manager.managerID,
      manager.name,
      manager.email,
      manager.phone,
      manager.type,
    ]);

    autoTable(doc, { head: [columns], body: rows });
    doc.save('manager-report.pdf');
  };

  // Handle delete manager
  const handleDelete = (id) => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this manager?');

    if (confirmDelete) {
      // If confirmed, send a DELETE request to the backend
      axios.delete(`http://localhost:8080/admin/${id}`)
        .then(() => {
          // Remove deleted manager from the state
          setManagers(managers.filter(manager => manager.id !== id));
          // Show success alert
          alert('Manager deleted successfully!');
          window.location.reload();
        })
        .catch((error) => {
          console.error('There was an error deleting the manager:', error);
          alert('Failed to delete the manager. Please try again.');
        });
    }
  };

  return (
    <div>
      <div className='nav_bar'>
        <p className='nav_items ' onClick={() => (window.location.href = '/createAccount')}>Add Managers</p>
        <p className='nav_items active_nav' onClick={() => (window.location.href = '/adminDash')}>Managers</p>
        <p className='nav_items' onClick={() => (window.location.href = '/aodpage')}>AOD</p>
        <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
      </div>
      <h2 className='topic_main'>Manager List</h2>

      {managers.length > 0 ? (
        <div className='table_main_set'>
          <button className='genarate_report' onClick={generateReport}>Generate Report</button>
          <br />
          <div className='tbl_con'>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Manager ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {managers.map(manager => (
                  <tr key={manager.id}>
                    <td>{manager.id}</td>
                    <td>{manager.managerID}</td>
                    <td>{manager.name}</td>
                    <td>{manager.email}</td>
                    <td>{manager.password}</td>
                    <td>{manager.phone}</td>
                    <td>{manager.type}</td>
                    <td>
                      <button className='delet_btn' onClick={() => handleDelete(manager.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className='notfound'>Not Found managers...</p>
      )}
    </div>
  );
}

export default AdminDash;
