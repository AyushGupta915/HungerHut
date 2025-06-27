import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyOrders = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ useNavigate hook
  const [message, setMessage] = useState('');
  const params = new URLSearchParams(location.search);
  const success = params.get('success');
  const orderId = params.get('orderId');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (success === 'true' && orderId) {
          await axios.post('https://hungerhut-backend-bpi5.onrender.com/api/orders/verify', { orderId });
          setMessage('✅ Payment successful! Redirecting to your orders...');
          setTimeout(() => navigate('/myorders'), 2000); // ✅ redirect after short delay
        } else {
          setMessage('❌ Payment failed or was cancelled. Redirecting to home...');
          setTimeout(() => navigate('/'), 3000);
        }
      } catch (error) {
        console.error('❌ Error verifying payment:', error);
        setMessage('⚠️ Could not verify payment. Redirecting to home...');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    verifyPayment();
  }, [success, orderId, navigate]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>{message}</h2>
    </div>
  );
};

export default VerifyOrders;
