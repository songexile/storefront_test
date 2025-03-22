import React, { useContext } from "react";
import { title } from "../../settings/config";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/cart";
import { Link } from "react-router-dom";

function Nav() {
  const { cartItems } = useContext(CartContext);
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-black fixed top-0 z-50 w-full h-16 px-8 flex items-center justify-between text-white shadow-md">
      {/* Logo and Collections Link */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition">
          {title}
        </Link>
        <Link to="/products" className="text-lg hover:underline hover:text-gray-300 transition">
          View All Collections
        </Link>
      </div>

      {/* Cart Icon */}
      <div>
        <Link to="/cart" className="flex items-center space-x-2 text-lg hover:text-gray-300 transition">
          <FaShoppingCart className="text-2xl" />
          <span className="font-medium">{cartQuantity}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
