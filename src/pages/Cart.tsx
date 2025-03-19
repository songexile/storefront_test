import React, { useContext } from "react";
import { CartContext } from "../context/cart";
import Layout from "../components/Layout/Layout";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.products.price * item.quantity;
  }, 0);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
        
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="flex items-center p-4 border rounded-md shadow-sm">
                <img 
                  src={item.products.image} 
                  alt={item.products.title} 
                  className="w-24 h-24 object-cover rounded-md mr-6"
                />
                <div className="flex-1">
                  <p className="text-lg font-semibold">{item.products.title}</p>
                  <p className="text-gray-600">Price: ${item.products.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded-md"
                      onClick={() => removeFromCart(item.products.id)}
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded-md"
                      onClick={() => addToCart(item.products)}
                    >
                      +
                    </button>
                    <p className="text-xl font-bold">
    </p>
                  </div>
                </div>
              </li>
            ))}
         <p className="text-2xl">Total: ${totalPrice.toFixed(2)} </p>   
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
