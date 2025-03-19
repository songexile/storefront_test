
import React, { useContext } from 'react'
import { title } from '../../settings/config'
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from '../../context/cart';
import { Link } from 'react-router-dom';





function Nav() {
  const { cartItems } = useContext(CartContext)
  return (
    <nav className="bg-black w-screen h-16 gap-4 text-2xl text-white flex items-center justify-evenly cursor-pointer">
      <Link to='/'>
        <h1 className='underline'>{title}</h1>

      </Link>
      <Link to='/products'>View All Collections</Link>

      <a className='flex items-center gap-1 font-light' href='/cart'><FaShoppingCart />
        {cartItems.length}
      </a>

    </nav>
  )
}

export default Nav