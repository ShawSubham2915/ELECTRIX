import React from 'react'
import { Link } from "react-router-dom";
import { MdCall, MdEmail, MdHome, MdModeComment } from "react-icons/md";
import { FaLinkedin, FaGithub, FaYoutube, FaHeart, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer >
      <div className='container mx-auto p-2'>
        <div className="w-full py-2 px-16 bg-slate-200 shadow-lg">
        <h3 className=' text-center font-bold  py-6'> E-Commerce Online System</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xl font-semibold mb-4">SHOPKART</h4>
          <ul>
            <li>
              <Link to="/" className="flex items-center text-gray-600 mb-2">
                Take me home!
              </Link>
            </li>
            <li>
              <Link to="/product" className="flex items-center text-gray-600 mb-2">
                All Products
              </Link>
            </li>
            <li>
              <Link className="flex items-center text-gray-600 mb-2">Mouse</Link>
            </li>
            <li>
              <Link className="flex items-center text-gray-600 mb-2">
                Airpodes
              </Link>
            </li>
            <li>
              <Link className="flex items-center text-gray-600 mb-2">Refrigerator</Link>
            </li>
            <li>
              <Link className="flex items-center text-gray-600 mb-2">
                Speakers
              </Link>
            </li>
            <li>
              <Link className="flex items-center text-gray-600 mb-2">
                Bluetooth Earphones
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold mb-4">USEFUL LINKS</h4>
          <ul>
            <li>
              <Link  className="flex items-center text-gray-600 mb-2">
              About Us
              </Link>
            </li>
            <li>
              <Link to="" className="flex items-center text-gray-600 mb-2">
                Cart
              </Link>
            </li>
            
            <li>
              <Link  className="flex items-center text-gray-600 mb-2">
              Careers
              </Link>
            </li>
            <li>
              <Link to="/sign-up" className="flex items-center text-gray-600 mb-2">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold mb-4">KEEP IN TOUCH</h4>
          <ul>
            <li>
              <Link className="flex items-center text-gray-600 mb-2">
                <MdCall className="text-lg mr-2" /> +91-8340234251
              </Link>
            </li>
            <li>
              <Link className="flex items-center text-gray-600 mb-2">
                <MdEmail className="text-lg mr-2" /> E-Mail
              </Link>
            </li>
            <li>
              <a
                href="https://www.instagram.com/__electronic__gadgets_?igsh=MTVvdTM0OWJ3MHhtZA=="
                target="_blank"
                className="flex items-center text-gray-600 mb-2"
              >
                <FaInstagram className="text-lg mr-2" /> Instagram
              </a>
            </li>
            <li>
              <a href="https://github.com/ShawSubham2915" target="_blank" className="flex items-center text-gray-600 mb-2">
                <FaGithub className="text-lg mr-2" /> Github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/subham-shaw29/"
                target="_blank"
                className="flex items-center text-gray-600 mb-2"
              >
                <FaLinkedin className="text-lg mr-2" /> LinkedIn
              </a>
            </li>
            <li>
              <a href="https://blog.myntra.com/" className="flex items-center text-gray-600 mb-2">
                <MdModeComment className="text-lg mr-2" /> Blogs
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold mb-4">POLICIES</h4>
          <ul>
            <li>
              <p className="flex items-center text-gray-600 mb-2">Contact Us</p>
            </li>
            <li>
              <p className="flex items-center text-gray-600 mb-2">FAQ</p>
            </li>
            <li>
              <p className="flex items-center text-gray-600 mb-2">T&C</p>
            </li>
            <li>
              <p className="flex items-center text-gray-600 mb-2">Terms of Use</p>
            </li>
            <li>
              <a
                href=""
                target="_blank"
                className="flex items-center text-gray-600 mb-2"
              >
                Track Order
              </a>
            </li>
            <li>
              <p className="flex items-center text-gray-600 mb-2">Privacy Policy</p>
            </li>
            <li>
              <p className="flex items-center text-gray-600 mb-2">
                <FaHeart className="text-lg mr-2" /> Like my project?
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p className='text-center p-2'>© 2024 www.Electrix.com. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer