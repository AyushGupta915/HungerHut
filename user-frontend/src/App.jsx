import { useState } from 'react';
import Navbar from './compnents/NavBar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Cart from './screens/Cart/cart';
import Order from './screens/Order/order';
import Home from './screens/Home/home';
import Footer from './compnents/footer/footer';
import Login from './compnents/LoginPopup/Login';
import ScrollToTop from './compnents/ScrollToTop/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import VerifyOrders from './compnents/VerifyOrder/VerifyOrder';
import MyOrders from './screens/MyOrders/MyOrders';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <div className="App">
        <ToastContainer />
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/verify" element={<VerifyOrders />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
