import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Add from './Screens/Add/Add';
import List from './Screens/List/List';
import Order from './Screens/Order/Order';
import { ToastContainer } from 'react-toastify';
import ProtectedAdminRoute from './Components/ProtectedAdminRoute/ProtectedAdminRoute';
import './App.css';

const url = "http://localhost:4000";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          {/* ✅ Wrap these with ProtectedAdminRoute */}
          <Route path='/' element={
            <ProtectedAdminRoute><Add url={url} /></ProtectedAdminRoute>
          } />
          <Route path='/add' element={
            <ProtectedAdminRoute><Add url={url} /></ProtectedAdminRoute>
          } />
          <Route path='/list' element={
            <ProtectedAdminRoute><List url={url} /></ProtectedAdminRoute>
          } />
          <Route path='/order' element={
            <ProtectedAdminRoute><Order url={url} /></ProtectedAdminRoute>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default App;
