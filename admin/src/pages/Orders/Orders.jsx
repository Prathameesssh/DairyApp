import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      toast.error('An error occurred while fetching orders');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="orders-container">
      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div className="order-card" key={index}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Customer Name:</strong> {order.customerName}</p>
            <p><strong>Items:</strong> {
              Array.isArray(order.items)
                ? order.items.map((item) => item.name).join(', ')
                : 'No items'
            }</p>
            <p><strong>Total Price:</strong> ₹{order.total}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
          
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
