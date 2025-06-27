import {menu_list} from '../../assets/assets'
import React from 'react'
import './explore.css'

const Explore = ({category, setCategory}) => {
  return (
    <div className='explore' id='explore'>
        <h1>
            Explore our Menu
        </h1>
        <p className='explore-description'>
            Discover a variety of delicious dishes crafted with the finest ingredients. Our menu offers something for everyone, from appetizers to desserts. Whether you're in the mood for a hearty meal or a light snack, we have you covered. Explore our menu and find your new favorite dish today!
        </p>
        <div className='explore-menu-list'>
            {menu_list.map((item, index)=>{
                return(
                    <div onClick={() => setCategory(category=>category===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?'active':''} src={item.menu_image} alt="" />
                        <p className='item'>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default Explore