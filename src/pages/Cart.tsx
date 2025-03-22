import React, { useContext } from "react";
import { CartContext } from "../context/cart";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.products.price * item.quantity;
  }, 0);

  return (
    <Layout>
      <div className="flex bg-secondary justify-center items-center min-h-screen">
        <div className="card w-full max-w-3xl p-6 bg-base-100 shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center p-4 border rounded-lg shadow-sm">
                  <img
                    src={item.products.image}
                    alt={item.products.title}
                    className="w-24 h-24 object-cover rounded-md mr-6"
                  />
                  <div className="flex-1">
                    <p className="text-lg font-semibold">{item.products.title}</p>
                    <p className="text-gray-600">Price: ${item.products.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => removeFromCart(item.products.id)}
                      >
                        -
                      </button>
                      <span className="mx-4">{item.quantity}</span>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => addToCart(item.products)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-right text-2xl font-bold">
                Total: ${totalPrice.toFixed(2)}
              </div>
              <Link
                to="/checkout"
                state={{ from: "/cart" }}
                className="btn btn-primary btn-block"
              >
                Proceed to Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
