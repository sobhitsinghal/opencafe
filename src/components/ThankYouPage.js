// src/components/ThankYouPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Thank You!</h1>
      <p className="text-xl mb-4">Your order has been placed successfully.</p>
      <p className="text-lg mb-4">We appreciate your business!</p>
      <button
        onClick={() => navigate("/")}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ThankYouPage;
