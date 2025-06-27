import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const url = 'http://localhost:4000';

  // Fetch food items
  const fetchFoodList = async () => {
    try {
      const res = await axios.get(url + '/api/food/list');
      setFoodList(res.data);
    } catch (error) {
      console.error('Error fetching food list:', error);
    }
  };

  // Load cart data from backend
  const loadCartData = async (token) => {
    try {
      const res = await axios.get(url + '/api/cart/get', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data.cartData || {});
    } catch (error) {
      console.error('Error loading cart data:', error);
      setCartItems({});
    }
  };

  // Add to cart (backend sync)
  const addToCart = async (itemId) => {
    if (!token) {
    toast("🚫 Please login to add items to cart");
    return;
  }
    try {
      const res = await axios.post(url + '/api/cart/add', { itemId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data.cartData);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Remove from cart (backend sync)
  const removeFromCart = async (itemId) => {
    if (!token) {
      toast("🚫 Please login to remove items from cart");
      return;
    }
    try {
      const res = await axios.post(url + '/api/cart/remove', { itemId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data.cartData);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let total = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find(food => food._id === item);
        if (itemInfo && itemInfo.price) {
          total += itemInfo.price * cartItems[item];
        }
      }
    }
    return total;
  };
  // Logout: clear token and cart
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  // Initial data loading
  useEffect(() => {
    const init = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) setToken(storedToken);
    };
    init();
  }, []);

  // Load cart once token is set
  useEffect(() => {
  if (token && token !== "") {
    loadCartData(token);
  } else {
    setCartItems({}); // ✅ force clear on logout
  }
}, [token]);  

  const contextValues = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    getTotalCartAmount,
    url,
    token,
    setToken,
    logout
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
