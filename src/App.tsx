import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Products from './pages/Products';
import IndividualProducts from './pages/IndividualProduct';
import { CartProvider } from './context/cart';

function App() {
  const [count, setCount] = useState(0)

  return (
    <CartProvider>
    <BrowserRouter>
<Routes>
  <Route path="/" element={<HomePage/>} />
  <Route path='/products' element={<Products/>} />
  <Route path='products/:id' element={<IndividualProducts/>} />

</Routes>
    </BrowserRouter>
    </CartProvider>
  )
}

export default App
