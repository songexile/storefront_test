import React, { useState, useEffect, createContext, ReactNode } from "react"
import { Product, CartInterface } from "../components/Product/product.interface"

type CartProps = { children?: ReactNode }
 
export const CartContext = createContext({} as {
  cartItems: CartInterface[];
  addToCart: (item: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
});

export const CartProvider = ({ children }: CartProps) => {
  const [cartItems, setCartItems] = useState<CartInterface[]>(() => { 
    try {
      const savedCartItems = localStorage.getItem("cartItems");
      return savedCartItems ? JSON.parse(savedCartItems) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });
  
  const addToCart = (item: Product) => {
    // Check if the item is already in the cart using the correct product ID
    const isItemInCart = cartItems.find((cartItem) => cartItem.products.id === item.id);
    
    console.log(isItemInCart);
    
    if (isItemInCart) {
      // If the item is already in the cart, increase its quantity
      setCartItems(
        cartItems.map((cartItem) => 
          cartItem.products.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCartItems([...cartItems, { products: item, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cartItems
      .map((cartItem) =>
        cartItem.products.id === productId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
      .filter((item) => item.quantity > 0);
  
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems"); // Clear cart from localStorage as well
  };
  
  
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
   
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);
  
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};