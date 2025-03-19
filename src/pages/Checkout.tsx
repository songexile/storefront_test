import React, { useContext, useState } from 'react';
import { CartContext } from '../context/cart';
import Layout from '../components/Layout/Layout';

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleCheckout = () => {
    // Clear the cart
    clearCart();
    // Set confirmation state
    setOrderConfirmed(true);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

        {orderConfirmed ? (
          <p className="text-center text-green-600 text-xl">
            Thank you for your order! Your purchase has been confirmed.
          </p>
        ) : (
          <>
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              <>
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
                        <p className="text-gray-600">Price: ${item.products.price.toFixed(2)}</p>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 text-right">
                  <button
                    onClick={handleCheckout}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Confirm Order
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default Checkout;
