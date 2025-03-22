import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Products from './pages/ProductsPage';
import IndividualProducts from './pages/SingleProductPage';
import { CartProvider } from './context/cart';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {

  return (
    <CartProvider>
    <BrowserRouter>
<Routes>
  <Route path="/" element={<HomePage/>} />
  <Route path='/products' element={<Products/>} />
  <Route path='products/:id' element={<IndividualProducts/>} />
  <Route path='cart/' element={<Cart/>} />
  <Route path='checkout' element={<Checkout/>} />

</Routes>
    </BrowserRouter>
    </CartProvider>
  )
}

export default App
