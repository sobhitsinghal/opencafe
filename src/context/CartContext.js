import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { db, storage } from "../components/Firebase"; // storage import
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getBlob } from "firebase/storage"; //  necessary imports from Firebase storage

export const CartContext = createContext("");

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const fetchCart = async () => {
        const cartRef = doc(db, "carts", currentUser.uid);
        const cartSnap = await getDoc(cartRef);

        if (cartSnap.exists()) {
          setCart(cartSnap.data().items);
        }
      };
      fetchCart();
    }
  }, [currentUser]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const incrementQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const saveCart = async (userId) => {
    try {
      const cartData = { cart };
      const cartBlob = new Blob([JSON.stringify(cartData)], {
        type: "application/json",
      });
      const cartRef = ref(storage, `carts/${userId}/cart.json`);
      await uploadBytes(cartRef, cartBlob);
      console.log("Cart saved successfully!");
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  const loadCart = async (userId) => {
    try {
      const cartRef = ref(storage, `carts/${userId}/cart.json`);
      const cartBlob = await getBlob(cartRef);
      const cartData = await cartBlob.text();
      setCart(JSON.parse(cartData).cart);
      console.log("Cart loaded successfully!");
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      saveCart(currentUser.uid);
    }
  }, [cart, currentUser]);

  const value = {
    cart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    saveCart,
    loadCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
