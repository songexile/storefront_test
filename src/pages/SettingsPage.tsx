import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';

function SettingsPage() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "luxury");

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(prevTheme => (prevTheme === "luxury" ? "light" : "luxury"));
  };

  return (
    <Layout>
      <div className='flex items-center justify-center h-64 w-screen'>
        <button className='btn btn-primary' onClick={handleToggle}>
          Toggle Theme
        </button>
      </div>
    </Layout>
  );
}

export default SettingsPage;
