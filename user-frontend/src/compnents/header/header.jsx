import React from 'react'
import './header.css'

const header = () => {
  return (
    <div className='header'>
        <div className='header-content'>
            <h2>
                Order your Favourite Food Online
            </h2>
            <p>
                Welcome to our food delivery service! We bring your favorite meals right to your doorstep. 
                Enjoy a wide variety of cuisines, quick delivery, and exceptional service. 
                Order now and satisfy your cravings with just a few clicks! 
            </p>
            <a href="#explore"><button>View Menu</button></a>
        </div>
    </div>
  )
}

export default header