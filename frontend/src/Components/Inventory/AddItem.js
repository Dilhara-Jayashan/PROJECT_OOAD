import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // for navigation
import axios from 'axios'; // for API requests

function AddItem() {
  const [item, setItem] = useState({
    stockCode: '',
    quantity: '',
    value: '',
    weight: '',
    Width: '',
    thickness: '',
    materialGrade: '',
    totalWeight: '',
    totalValue: '',
  });

  const navigate = useNavigate();
  const generateStockCode = (type) => {
    const randomNumbers = Math.floor(10000 + Math.random() * 90000);
    return `SCODE ${randomNumbers}`;
  };

  useEffect(() => {
    setItem((prevInputs) => ({
      ...prevInputs,
      stockCode: generateStockCode(),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API endpoint
      const response = await axios.post('http://localhost:8080/inventory', item);
      if (response.status === 200 || response.status === 201) {
        alert('Item added successfully!');
        navigate('/inventoryDash'); // Redirect to items page
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item. Please try again.');
    }
  };
  return (
    <div>
      <div>
        <div>
          <div className='nav_bar'>
            <p className='nav_items active_nav' onClick={() => (window.location.href = '/additem')}>Add Items</p>
            <p className='nav_items ' onClick={() => (window.location.href = '/inventoryDash')}>Item Details</p>
            <p className='nav_items active_nav' onClick={() => (window.location.href = '/lowstock')}>Low stock items</p>
            <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
          </div>
        </div>
        <div>
          <h2 className='topic_main_from'>Add New Item</h2>
          <form className='from_full' onSubmit={handleSubmit}>
            <div>
              <label>Stock Code:</label>
              <input type="text" name="stockCode" value={item.stockCode} required />
            </div>
            <div>
              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Value:</label>
              <input
                type="number"
                name="value"
                value={item.value}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Weight :</label>
              <input
                type="number"
                name="weight"
                value={item.weight}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Width:</label>
              <input
                type="number"
                name="width"
                value={item.width}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Thickness:</label>
              <input
                type="number"
                name="thickness"
                value={item.thickness}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Material Grade:</label>
              <input
                type="text"
                name="materialGrade"
                value={item.materialGrade}
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Total Weight:</label>
              <input type="text" name="totalWeight" value={item.totalWeight} onChange={handleChange} required />
            </div>
            <div>
              <label>Total Value:</label>
              <input type="text" name="totalValue" value={item.totalValue} onChange={handleChange} required />
            </div>
            <button className='from_btn' type="submit">Add Item</button>
          </form>
        </div>
      </div>



    </div>
  )
}

export default AddItem
