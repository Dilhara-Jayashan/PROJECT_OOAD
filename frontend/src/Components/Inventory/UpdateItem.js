import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function UpdateItem() {
  const { id } = useParams(); // Get item ID from URL
  const [item, setItem] = useState({
    stockCode: '',
    quantity: '',
    value: '',
    weight: '',
    width: '',
    thickness: '',
    materialGrade: '',
    totalWeight: '',
    totalValue: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch item details by ID to prepopulate the form
    axios.get(`http://localhost:8080/inventory/${id}`)
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
        alert("Failed to load item data. Please try again.");
      });
  }, [id]);

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
      await axios.put(`http://localhost:8080/inventory/${id}`, item);
      alert("Item updated successfully!");
      navigate("/inventoryDash"); // Redirect back to inventory dashboard
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <div className='nav_bar'>
          <p className='nav_items' onClick={() => (window.location.href = '/additem')}>Add Items</p>
          <p className='nav_items ' onClick={() => (window.location.href = '/inventoryDash')}>Item Details</p>
          <p className='nav_items active_nav' onClick={() => (window.location.href = '/lowstock')}>Low stock items</p>
          <p className='nav_items' onClick={() => (window.location.href = '/')}>log out</p>
        </div>
      </div>
      <h2 className='topic_main_from'>Update Item</h2>
      <form className='from_full' onSubmit={handleSubmit}>
        <div>
          <label>Stock Code:</label>
          <input
            type="text"
            name="stockCode"
            value={item.stockCode}
            readOnly
          />
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
          <label>Weight:</label>
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
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Total Weight:</label>
          <input
            type="text"
            name="totalWeight"
            value={item.totalWeight}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Total Value:</label>
          <input
            type="text"
            name="totalValue"
            value={item.totalValue}
            onChange={handleChange}
            required
          />
        </div>
        <button className='from_btn' type="submit">Update Item</button>
      </form>
    </div>
  );
}

export default UpdateItem;
