
import React, { useContext } from 'react'
import { title } from '../../settings/config'
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from '../../context/cart';
import { Link } from 'react-router-dom';





function Nav() {
  const { cartItems } = useContext(CartContext)
  return (
    <nav className="bg-black fixed top-0 z-50  w-screen h-16 gap-4 text-2xl text-white flex items-center justify-evenly cursor-pointer">
      <Link to='/'>
        <h1 className='underline'>{title}</h1>

      </Link>
      <Link to='/products'>View All Collections</Link>

      <Link to='/cart' className='flex items-center gap-1 font-light'><FaShoppingCart />
      {cartItems.reduce((total, item) => total + item.quantity, 0)}
      </Link>

    </nav>
  )
}

export default Nav