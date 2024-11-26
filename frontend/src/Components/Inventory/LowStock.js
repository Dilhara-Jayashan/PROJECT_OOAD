import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // for generating PDF tables
import { useNavigate } from 'react-router-dom';
function LowStock() {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/inventory')
            .then((response) => {
                // Filter items with quantity less than 50
                const lowStockItems = response.data.filter(item => item.quantity < 50);
                setItems(lowStockItems);
            })
            .catch((error) => {
                console.error('There was an error fetching the data:', error);
            });
    }, []);
    

    // Function to generate PDF report
    const generateReport = () => {
        const doc = new jsPDF("landscape");
        const columns = ["ID", "Stock Code", "Quantity", "Value", "Weight", "Width", "Thickness", "Material Grade", "Total Weight", "Total Value"];
        const rows = items.map(items => [
            items.id,
            items.stockCode,
            items.quantity,
            items.value,
            items.weight,
            items.width,
            items.thickness,
            items.materialGrade,
            items.totalWeight,
            items.totalValue,
        ]);

        autoTable(doc, { head: [columns], body: rows });
        doc.save('Low Stock Item report.pdf');
    };

    // Handle delete
    const handleDelete = (id) => {
        // Ask for confirmation before deleting
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');

        if (confirmDelete) {
            // If confirmed, send a DELETE request to the backend
            axios.delete(`http://localhost:8080/inventory/${id}`)
                .then(() => {
                    // Remove deleted from the state
                    setItems(items.filter(items => items.id !== id));
                    // Show success alert
                    alert('Item deleted successfully!');
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('There was an error deleting the items:', error);
                    alert('Failed to delete the items. Please try again.');
                });
        }
    };

    return (
        <div>
            <div>
                <div className='nav_bar'>
                    <p className='nav_items ' onClick={() => (window.location.href = '/additem')}>Add Items</p>
                    <p className='nav_items' onClick={() => (window.location.href = '/inventoryDash')}>Item Details</p>
                    <p className='nav_items active_nav' onClick={() => (window.location.href = '/lowstock')}>Low stock items</p>
                    <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
                </div>
            </div>
            <h2 className='topic_main'>low stock Item List</h2>

            {items.length > 0 ? (
                <div className='table_main_set'>
                    <button className='genarate_report' onClick={generateReport}>Generate Report</button>
                    <br />
                    <div className='tbl_con'>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>stock Code</th>
                                    <th>quantity</th>
                                    <th>value</th>
                                    <th>weight</th>
                                    <th>Width</th>
                                    <th>thickness</th>
                                    <th>material Grade</th>
                                    <th>totalWeight</th>
                                    <th>totalValue</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.stockCode}</td>
                                        <td><span className='low_qty'>{item.quantity}</span></td>
                                        <td>{item.value}</td>
                                        <td>{item.weight}</td>
                                        <td>{item.width}</td>
                                        <td>{item.thickness}</td>
                                        <td>{item.materialGrade}</td>
                                        <td>{item.totalWeight}</td>
                                        <td>{item.totalValue}</td>
                                        <td>
                                            <button onClick={() => navigate(`/updateItem/${item.id}`)} className='tbl_btn'>Update</button>
                                            <button onClick={() => handleDelete(item.id)} className='delet_btn cenbtn'>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            ) : (
                <p>Loading Items...</p>
            )}

        </div>
    )
}

export default LowStock
