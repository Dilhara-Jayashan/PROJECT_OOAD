import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // for generating PDF tables
import { useNavigate } from 'react-router-dom';
function ClientProfile() {
  const [job, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedClientId = localStorage.getItem('selectedClientId');
    if (selectedClientId) {
      axios.get('http://localhost:8080/jobTicket')
        .then((response) => {
          // Filter jobs based on clientCode matching the localStorage ID
          const filteredJobs = response.data.filter(job => job.clientCode === selectedClientId);
          setJobs(filteredJobs);
        })
        .catch((error) => {
          console.error('There was an error fetching the data:', error);
        });
    }
  }, []);

  const generateReport = () => {
    const doc = new jsPDF("landscape");
    const columns = ["ID", "Job Code", "Client Code", "Estimate Time ", "Progress", "stockNeed", "quantity"];
    const rows = job.map(jobs => [
      jobs.id,
      jobs.jobCode,
      jobs.clientCode,
      jobs.estimateTime,
      jobs.progress,
      jobs.stockNeed,
      jobs.quantity,
    ]);

    autoTable(doc, { head: [columns], body: rows });
    doc.save('job-report.pdf');
  };
  // Handle delete
  const handleDelete = (id) => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this job ?');

    if (confirmDelete) {
      // If confirmed, send a DELETE request to the backend
      axios.delete(`http://localhost:8080/jobTicket/${id}`)
        .then(() => {
          // Remove deleted from the state
          setJobs(job.filter(jobs => jobs.id !== id));
          // Show success alert
          alert('job  deleted successfully!');
          window.location.reload();
        })
        .catch((error) => {
          console.error('There was an error deleting the job :', error);
          alert('Failed to delete the job . Please try again.');
        });
    }
  };
  return (
    <div>
      <div className='nav_bar'>
        <p className='nav_items ' onClick={() => (window.location.href = '/addjobClient')}>Add JOB</p>
        <p className='nav_items active_nav' onClick={() => (window.location.href = '/clientProfile')}>Job Details</p>
        <p className='nav_items ' onClick={() => (window.location.href = '/clientdash')}>Main dashboard</p>
        <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
      </div>
      <h2 className='topic_main_from'>Job List</h2>
      {job.length > 0 ? (
        <div className='table_main_set'>
          <button className='genarate_report' onClick={generateReport}>Generate Report</button>
          <br />
          <div className='tbl_con'>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Job Code</th>
                  <th>Client Code</th>
                  <th>Estimate Time</th>
                  <th>Progress</th>
                  <th>stockNeed</th>
                  <th>quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {job.map(jobs => (
                  <tr key={jobs.id}>
                    <td>{jobs.id}</td>
                    <td>{jobs.jobCode}</td>
                    <td>{jobs.clientCode}</td>
                    <td>{jobs.estimateTime}</td>
                    <td>{jobs.progress}</td>
                    <td>{jobs.stockNeed}</td>
                    <td>{jobs.quantity}</td>
                    <td>
                      <button onClick={() => navigate(`/updateClient/${jobs.id}`)} className='tbl_btn'>Update</button>
                      <button onClick={() => handleDelete(jobs.id)} className='delet_btn cenbtn'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className='notfound'>no jobs...</p>
      )}
    </div>
  )
}

export default ClientProfile
