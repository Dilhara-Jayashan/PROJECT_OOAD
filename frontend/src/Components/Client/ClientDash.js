import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // for generating PDF tables
import { useNavigate } from 'react-router-dom';

function ClientDash() {
    const [client, setClient] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8080/client')
            .then((response) => {
                setClient(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the data:', error);
            });
    }, []);
    // Function to generate PDF report
    const generateReport = () => {
        const doc = new jsPDF("landscape");
        const columns = ["ID", "client Code", "client Name", "Email", "Phone", "Address"];
        const rows = client.map(client => [
            client.id,
            client.clientCode,
            client.name,
            client.email,
            client.phone,
            client.address,
        ]);

        autoTable(doc, { head: [columns], body: rows });
        doc.save('client-report.pdf');
    };
    const saveClientIdToLocalStorage = (clientId) => {
        localStorage.setItem('selectedClientId', clientId);
    };
    return (
        <div>
            <div>
                <div className='nav_bar'>
                    <p className='nav_items ' onClick={() => (window.location.href = '/addclient')}>Add Clients</p>
                    <p className='nav_items active_nav' onClick={() => (window.location.href = '/clientdash')}>Client Details</p>
                    <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
                </div>
            </div>
            <h2 className='topic_main_from'>client List</h2>
            {client.length > 0 ? (
                <div className='table_main_set'>
                    <button className='genarate_report' onClick={generateReport}>Generate Report</button>
                    <br />
                    <div className='tbl_con'>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>client code</th>
                                    <th>client Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {client.map(client => (
                                    <tr key={client.id}>
                                        <td>{client.id}</td>
                                        <td>{client.clientCode}</td>
                                        <td>{client.name}</td>
                                        <td>{client.email}</td>
                                        <td>{client.phone}</td>
                                        <td>{client.address}</td>
                                        <td>
                                            <button onClick={() => {
                                                saveClientIdToLocalStorage(client.id);
                                                navigate(`/clientProfile`);
                                            }} className='tbl_btn'>Job Details</button>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p className='notfound'>Loading Items...</p>
            )}

        </div>
    )
}

export default ClientDash
