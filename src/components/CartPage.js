// src/components/CartPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } =
    useCart();
  const navigate = useNavigate();

  const totalValue = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = totalValue > 100000 ? totalValue * 0.02 : 0;
  const finalPrice = totalValue - discount;

  const handlePlaceOrder = () => {
    navigate("/address");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {cart.length === 0 ? (
            <p className="text-xl">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4"
              >
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-800 font-bold mt-2">
                  ₹{item.price / 100}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-200"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="text-xl font-bold mb-2">Price Summary</div>
          <p className="text-lg">
            Total Value: ₹{(totalValue / 100).toFixed(2)}
          </p>
          {discount > 0 && (
            <p className="text-lg text-green-500">
              Discount: -₹{(discount / 100).toFixed(2)}
            </p>
          )}
          <p className="text-2xl font-bold">
            Final Price: ₹{(finalPrice / 100).toFixed(2)}
          </p>
          <button
            onClick={handlePlaceOrder}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 w-full"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
