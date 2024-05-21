// src/components/PaymentPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const PaymentPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  // Calculate total value of items in the cart
  const totalValue = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleProceedToPayment = () => {
    navigate("/paymentform"); // Navigate to the PaymentForm component
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Payment Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white rounded-lg shadow-md mb-2"
            >
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price / 100}</p>
            </div>
          ))}
          <div className="p-4 bg-white rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-bold">Total: ₹{totalValue / 100}</h3>
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center">
          <button
            onClick={handleProceedToPayment}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 mb-4"
          >
            Pay Now
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
      <p className="mt-8 text-center text-gray-600">
        By placing your order, you agree to our terms and conditions. Your food
        will be delivered based on the estimated delivery time.
      </p>
    </div>
  );
};

export default PaymentPage;
