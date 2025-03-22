import React, { useContext } from "react";
import { title } from "../../settings/config";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/cart";
import { Link } from "react-router-dom";

function Nav() {
  const { cartItems } = useContext(CartContext);
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar bg-base-200 fixed top-0 z-50 w-full h-16 px-8 shadow-md">
      {/* Logo and Collections Link */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-2xl font-bold text-primary">
          {title}
        </Link>
        <Link to="/products" className="btn btn-ghost text-lg">
          View All Collections
        </Link>
      </div>

      {/* Cart Icon */}
      <div className="flex-none">
        <Link to="/cart" className="btn btn-ghost flex items-center space-x-2 text-lg">
          <FaShoppingCart className="text-2xl" />
          <span className="badge badge-secondary">{cartQuantity}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
