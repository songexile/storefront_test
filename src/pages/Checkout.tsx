import React, { useContext, useState } from 'react';
import { CartContext } from '../context/cart';
import Layout from '../components/Layout/Layout';
import { useLocation, Navigate } from 'react-router-dom';

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const location = useLocation();

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.products.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    clearCart();
    setOrderConfirmed(true);
  };

  if (location.state?.from !== '/cart') {
    return <Navigate to="/cart" replace />;
  }

  return (
    <Layout>
      <div className="flex  justify-center items-center min-h-screen">
        <div className="card w-full max-w-3xl p-6 bg-base-100 shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

          {orderConfirmed ? (
            <div className="text-center text-green-600 text-xl">
              <p>Thank you for your order! Your purchase has been confirmed.</p>
            </div>
          ) : (
            <>
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="space-y-4">
                    {cartItems.map((item, index) => (
                      <li key={index} className="flex items-center p-4 border rounded-lg shadow-sm">
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
                    <p className="text-2xl font-bold mb-4">Total: ${totalPrice.toFixed(2)}</p>
                    <button
                      onClick={handleCheckout}
                      className="btn btn-primary btn-block"
                    >
                      Confirm Order
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Checkout;
