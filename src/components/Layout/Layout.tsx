import React, { ReactNode, useContext } from 'react'
import Nav from '../Nav/Nav'
import { CartContext } from '../../context/cart'




type LayoutProps = {children?: ReactNode}


function Layout({children}: LayoutProps) {
  const cart = useContext(CartContext)
  console.log(cart)
  return (
    <div>
        <Nav>
            
        </Nav>

    <main>
        {children}</main>  
    </div>
    
  )
}

export default Layout
