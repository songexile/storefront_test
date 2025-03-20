import React, { ReactNode } from "react";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";


type LayoutProps = { children?: ReactNode };

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Nav></Nav>

      <main className="mt-16 min-h-screen mb-32">{children}</main>
      <footer className="h-16 bg-black text-white flex gap-8 items-center justify-center">
    <h1>Copyright 2025</h1>
    <Link to="/">Home</Link>
    <Link to="/products">View All Collections</Link>
    <Link to="/cart">Cart</Link>
  </footer>
    </div>
  );
}

export default Layout;
