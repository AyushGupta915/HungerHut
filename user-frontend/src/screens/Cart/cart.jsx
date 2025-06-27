import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './cart.css';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount} = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-title">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Modify</p>
      </div>
      <br />
      <hr />
      {
        food_list.map((food) => {
          if (cartItems[food._id] > 0) {
            return (
              <div key={food._id} className="cart-items-item">
                <img src={food.image} alt={food.name} />
                <p>{food.name}</p>
                <p>{food.price}</p>
                <p>{cartItems[food._id]}</p>
                <p>{cartItems[food._id] * food.price}</p>
                <div className="food-item-counter cart-counter">
                  <img
                    onClick={() => removeFromCart(food._id)}
                    src={assets.remove_icon_red}
                    alt="Remove one"
                  />
                  <p>{cartItems[food._id]}</p>
                  <img
                    onClick={() => addToCart(food._id)}
                    src={assets.add_icon_green}
                    alt="Add one"
                  />
                </div>
              </div>
            );
          }
          return null;
        })
      }
      <div className="cart-bottom">
        <div className="cart-total">
  <h2>Cart Total</h2>
  <div className="cart-total-details">
    <p>Subtotal</p>
    <p>₹{getTotalCartAmount()}</p>
  </div>
  <hr />
  <div className="cart-total-details">
    <p>Delivery Fee</p>
    <p>₹{getTotalCartAmount()===0?0:20}</p>
  </div>
  <hr />
  <div className="cart-total-details">
    <p>Total</p>
    <p>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+20}</p>
  </div>
  <button onClick={() => navigate("/order")}>Proceed to CheckOut</button>
</div>
        <div className="cart-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cart-promo-input">
            <input type="text" placeholder='Enter promo code' />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
