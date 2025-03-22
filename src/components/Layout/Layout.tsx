import React, { ReactNode } from "react";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import { title } from "../../settings/config";
import Footer from "../Footer/Footer";

type LayoutProps = { children?: ReactNode };

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow mt-16 mb-32">{children}</main>
      
    <Footer/>
    </div>
  );
}

export default Layout;
