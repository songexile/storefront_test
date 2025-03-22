import React, { ReactNode } from "react";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import { title } from "../../settings/config";


type LayoutProps = { 
  children?: ReactNode;
  pageTitle?: string; // Make pageTitle optional
};

function Layout({ children, pageTitle = title }: LayoutProps) { // Default to title if not provided
  return (
    <div className="flex flex-col min-h-screen">
      <title>{pageTitle}</title>
      <Nav />
      <main className="flex-grow mt-16 mb-32">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
