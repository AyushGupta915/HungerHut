import React from 'react'
import { assets } from '../../assets/assets'
import './footer.css'

const footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>
                    Hunger Hut is your go-to destination for delicious, freshly prepared meals that bring joy to every bite. 
                    Whether you're in the mood for spicy street food, hearty home-style meals, or gourmet indulgence, Hunger Hut serves up flavors that satisfy every craving. 
                    With a focus on quality ingredients, fast service, and customer happiness, we deliver not just food—but comfort, warmth, and taste in every order.
                </p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content center">
                <h2>
                    Hunger Hut
                </h2>
                <ul>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Reviews</li>
                    <li>Blog</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Get In Touch</h2>
                <ul>
                    <li>+91 7027710156</li>
                    <li>ag18012005@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p>© 2025 HungerHut. All rights reserved.</p>
        <p>Terms of Service | Privacy Policy | FAQ</p>
    </div>
  )
}

export default footer