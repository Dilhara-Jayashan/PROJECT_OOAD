import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // for generating PDF tables
import { useNavigate } from 'react-router-dom';
function AODpage() {
    const [job, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/jobTicket')
            .then((response) => {
                setJobs(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the data:', error);
            });
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
        doc.save('AOD-report.pdf');
    };

    return (
        <div>
            <div>
                <div className='nav_bar'>
                    <p className='nav_items ' onClick={() => (window.location.href = '/createAccount')}>Add Managers</p>
                    <p className='nav_items ' onClick={() => (window.location.href = '/adminDash')}>Managers</p>
                    <p className='nav_items active_nav' onClick={() => (window.location.href = '/aodpage')}>AOD</p>
                    <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
                </div>
                <div>

                    <h2 className='topic_main'>AOD List</h2>
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
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    ) : (
                        <p className='notfound'> jobs...</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AODpage
