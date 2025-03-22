import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout/Layout';
import { CartContext } from '../context/cart';


function SettingsPage() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "luxury");
  const { clearCart } = useContext(CartContext);

  

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(prevTheme => (prevTheme === "luxury" ? "light" : "luxury"));
  };

  const handleRemoveFromCart = () => {
    clearCart();
  }

  return (
    <Layout>
    <div className='flex items-center flex-col gap-4 justify-center h-64 w-screen'>
        <h1>Welcome to the settings page.</h1>
      <button className='btn btn-primary w-40' onClick={handleToggle}>
        Toggle Theme
      </button>
      <button className='btn btn-secondary w-40' onClick={handleRemoveFromCart}>
        Reset Cart
      </button>
    </div>
  </Layout>
  
  );
}

export default SettingsPage;
