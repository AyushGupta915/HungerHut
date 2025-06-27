import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './order.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phoneNumber: ''
  });

  const { getTotalCartAmount, food_list, cartItems, token, url } = useContext(StoreContext);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ( { ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id]) {
        orderItems.push({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id]
        });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      totalAmount: getTotalCartAmount() + 20
    };

    try {
      const res = await axios.post(`${url}/api/orders/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.sessionurl) {
        window.location.href = res.data.sessionurl; // Redirect to Stripe Checkout
      }
    } catch (error) {
      console.error("❌ Error placing order:", error);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if(!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token])

  return (
    <div className='order'>
      <form onSubmit={onSubmitHandler} className="place-order-left">
        <p className='title'>Delivery Address</p>
        <div className="inputs">
          <input required type="text" name="firstName" placeholder='First Name' value={data.firstName} onChange={onChangeHandler} />
          <input required type="text" name="lastName" placeholder='Last Name' value={data.lastName} onChange={onChangeHandler} />
        </div>
        <input required type="email" name="email" placeholder='Email' value={data.email} onChange={onChangeHandler} />
        <input required type="text" name="street" placeholder='Street' value={data.street} onChange={onChangeHandler} />
        <div className="inputs">
          <input required type="text" name="city" placeholder='City' value={data.city} onChange={onChangeHandler} />
          <input required type="text" name="state" placeholder='State' value={data.state} onChange={onChangeHandler} />
        </div>
        <div className="inputs">
          <input required type="text" name="zipcode" placeholder='Zipcode' value={data.zipcode} onChange={onChangeHandler} />
          <input required type="text" name="country" placeholder='Country' value={data.country} onChange={onChangeHandler} />
        </div>
        <input required type="tel" name="phoneNumber" placeholder='Phone Number' value={data.phoneNumber} onChange={onChangeHandler} />

        <button type="submit" className="place-order-btn">Proceed to Payment</button>
      </form>

      <div className="place-order-right">
        <p className='title'>Order Summary</p>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>₹{getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Total</p>
          <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</p>
        </div>
      </div>
    </div>
  );
};

export default Order;
