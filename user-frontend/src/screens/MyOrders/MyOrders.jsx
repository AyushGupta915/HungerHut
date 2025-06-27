import { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './MyOrders.css';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { token, url } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/api/orders/user`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("❌ Failed to fetch orders", error);
      }
    };
  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="my-orders-wrapper">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div className="order-card" key={index}>
            <img src={assets.parcel_icon} alt="box" className="order-icon" />
            <p className="order-title">
              {order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}
            </p>
            <p className="order-price">₹{order.totalAmount}</p>
            <p className="order-quantity">Items: {order.items.length}</p>
            <p className="order-status">
              <span className="status-dot"></span> <strong>{order.status}</strong>
            </p>
            <button className="track-btn">Track Order</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
