import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cookieCart");
    try {
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cookieCart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.name === newItem.name
      );

      if (existingIndex !== -1) {
        // Product already in cart — update quantity and total
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingIndex];

        const updatedQuantity = existingItem.quantity + newItem.quantity;

        updatedCart[existingIndex] = {
          ...existingItem,
          quantity: updatedQuantity,
          total: updatedQuantity * existingItem.price,
        };

        return updatedCart;
      } else {
        // New product — add it
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (itemName) => {
    setCart((prev) => prev.filter((item) => item.name !== itemName));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
