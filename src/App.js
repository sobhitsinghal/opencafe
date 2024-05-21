// src/App.js
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/Firebase";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import ErrorComponent from "./components/ErrorComponent";
import Footer from "./components/Footer";
import MenuPage from "./components/MenuPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import CartPage from "./components/CartPage";
import AddressPage from "./components/AddressPage";
import PaymentPage from "./components/PaymentPage";
import PaymentForm from "./components/PaymentForm";
import ThankYouPage from "./components/ThankYouPage";
import OrderHistory from "./components/OrderHistory";

import { useState, useEffect } from "react";
const App = () => {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

//routes here
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/rest/:resId", element: <MenuPage /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/address",
        element: <AddressPage />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/thankyou",
        element: <ThankYouPage />,
      },
      {
        path: "/paymentform",
        element: <PaymentForm />,
      },
      {
        path: "/myorders",
        element: <OrderHistory />,
      },
    ],
    errorElement: <ErrorComponent />,
  },
]);

const Root = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user); // Set loggedIn based on whether user is present
      setAuthChecked(true);
    });

    return unsubscribe; // Cleanup function
  }, []);

  if (!authChecked) {
    // Show loading spinner or something while authentication status is being checked
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={appRouter}>
          {loggedIn ? <App /> : <Login />}
        </RouterProvider>
      </CartProvider>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
