import { Link } from "react-router-dom"
import { title } from "../../settings/config"

function Footer() {
  return (
    <footer className="bg-black  py-6">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
      <p className="text-sm">&copy; 2025 {title}. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/products" className="hover:underline">Collections</Link>
        <Link to="/cart" className="hover:underline">Cart</Link>
      </div>
    </div>
  </footer>
  )
}

export default Footer
 