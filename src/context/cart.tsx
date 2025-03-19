import React, {useState, useEffect, createContext, ReactNode} from "react"
import { Product, CartInterface } from "../components/Product/product.interface"

type CartProps = {children?: ReactNode}

 
export const CartContext = createContext({})

export const CartProvider = ({children }: CartProps)  => {
    const [cartItems, setCartItems] = useState<CartInterface[]>([])

    const addToCart = (item : Product) => {
        console.log(cartItems)
        
        debugger
        const isItemInCart = cartItems.find((cartItem) => cartItem.products.id=== cartItem.products.id); // check if the item is already in the cart
        debugger
        console.log(isItemInCart)
        if (isItemInCart) {
        setCartItems(
            cartItems.map((cartItem) => // if the item is already in the cart, increase the quantity of the item
            cartItem.products.id === cartItem.products.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem // otherwise, return the cart item
            )
        );
        } else {
        setCartItems([...cartItems, { ...item, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
        }
        

    }

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }, [cartItems]);
    
      useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
          setCartItems(JSON.parse(cartItems));
        }
      }, []);

      return (
        <CartContext.Provider
          value={{
            cartItems,
            addToCart,
           
          }}
        >
          {children}
        </CartContext.Provider>
      );

    

}