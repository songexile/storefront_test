import React, { useContext, useState } from "react";
import { title } from "../../settings/config";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { CartContext } from "../../context/cart";
import { Link } from "react-router-dom";

function Nav() {
  const { cartItems } = useContext(CartContext);
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <>
      <nav className="navbar bg-base-200 fixed top-0 z-50 w-full h-16 px-4 md:px-8 shadow-md">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link to="/" className="btn btn-ghost text-2xl font-bold text-primary">
            {title}
          </Link>
          
          {/* Hamburger and Cart for Mobile */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="btn btn-ghost relative">
              <FaShoppingCart className="text-2xl" />
              <span className="badge badge-secondary absolute top-0 right-0">{cartQuantity}</span>
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="btn btn-ghost ml-2">
              <FaBars className="text-2xl" />
            </button>
          </div>
          
          {/* Menu for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/products" className="btn btn-ghost text-lg">
              View All Collections
            </Link>
            <Link to="/cart" className="btn btn-ghost flex items-center space-x-2 text-lg">
              <FaShoppingCart className="text-2xl" />
              <span className="badge badge-secondary">{cartQuantity}</span>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-base-200 p-4 fixed w-full z-40 mt-16 shadow-md">
          <Link to="/products" className="block py-2 text-lg">
            View All Collections
          </Link>
        </div>
      )}
    </>
  );
}

export default Nav;