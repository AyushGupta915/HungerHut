import { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const res = await axios.get('https://hungerhut-backend-bpi5.onrender.com/api/admin/orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setOrders(res.data || []); // or just res.data
  } catch (error) {
    console.error('❌ Error fetching admin orders:', error.response?.data || error.message);
  }
};


  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('adminToken');

      await axios.put(
        'https://hungerhut-backend-bpi5.onrender.com/api/admin/orders/status',
        { orderId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchOrders(); // Refresh after update
    } catch (error) {
      console.error('❌ Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-orders">
      <h2>📦 Admin Orders Panel</h2>

      {orders.length === 0 ? (
        <p>📭 No orders found.</p>
      ) : (
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Items</th>
              <th>Total</th>
              <th>Address</th>
              <th>Status</th>
              <th>Paid</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>
                  <ul>
                    {order.items?.map(item => (
                      <li key={item._id}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>₹{order.totalAmount}</td>
                <td>
                  {order.address?.firstName} {order.address?.lastName}<br />
                  {order.address?.street}, {order.address?.city}, {order.address?.zipcode}
                </td>
                <td>
                  <select
                    value={order.status || 'Placed'}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                  >
                    <option value="Placed">Placed</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td>{order.payment ? '✅ Paid' : '❌ Not Paid'}</td>
                <td>
                  <button onClick={() => updateStatus(order._id, 'Delivered')}>
                    Mark Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Order;
