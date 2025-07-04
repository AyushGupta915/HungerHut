import React from 'react'
import {NavLink} from 'react-router-dom'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="sidebar-options">
            <NavLink to="/add" className="sidebar-option">
                <img src={assets.add_icon} width="30px" alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to="/list" className="sidebar-option">
                <img src={assets.list_icon} width="30px" alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to="/order" className="sidebar-option">
                <img src={assets.order_icon} width="30px" alt="" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar