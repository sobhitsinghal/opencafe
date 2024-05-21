import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../components/Firebase";
import { useCart } from "./CartContext";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { clearCart, saveCart, loadCart } = useCart();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // If user is logged in, load their cart
        await loadCart;
      } else {
        // If user is logged out, clear the cart
        clearCart;
      }
    });

    return unsubscribe; // Cleanup function
  }, [loadCart, clearCart]);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Cart loading will be handled by the effect hook
    } catch (error) {
      console.error("Error logging in:", error);
      throw error; // Rethrow the error for handling in the UI
    }
  };

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Cart loading will be handled by the effect hook
    } catch (error) {
      console.error("Error signing up:", error);
      throw error; // Rethrow the error for handling in the UI
    }
  };

  const logout = async () => {
    try {
      if (currentUser) {
        // await saveCart(currentUser.uid);
      }
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error; // Rethrow the error for handling in the UI
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
