import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import jsPDF from "jspdf";
import { storage } from "./Firebase"; // Import storage from Firebase
import { ref, uploadBytes } from "firebase/storage"; // Import necessary storage methods
import Modal from "react-modal";

const PaymentForm = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(""); // State to manage payment method
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const totalValue = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setTextColor("#333333");
    doc.setFontSize(16);
    doc.text("open cafe resturant welcomes you ✅", 15, 10);
    doc.text("Thank You for Your Order!", 15, 20);
    doc.setFontSize(12);
    doc.text("Order Summary:", 15, 30);

    let y = 40;
    cart.forEach((item, index) => {
      doc.text(
        `✅${index + 1}. ${item.name} - Quantity: ${item.quantity} - Price: ₹${
          item.price / 100
        }`,
        15,
        y
      );
      y += 10;
    });

    doc.setFontSize(14);
    doc.text(`Total: ₹${totalValue / 100}`, 15, y + 10);
    doc.setFontSize(12);
    doc.text("We appreciate your trust in us @code_riders team!", 15, y + 20);

    doc.setLineWidth(0.5);
    doc.line(15, y + 30, 195, y + 30);

    doc.save("receipt.pdf");
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  const handleDownloadPDF = async () => {
    generatePDF();

    // Store order information in Firebase Storage
    try {
      const orderData = {
        cart,
        totalValue,
        createdAt: new Date().toISOString(),
        paymentMethod,
      };

      console.log("Order Data:", orderData); // Debugging log

      const orderBlob = new Blob([JSON.stringify(orderData)], {
        type: "application/json",
      });

      const orderRef = ref(storage, `orders/order_${Date.now()}.json`);
      await uploadBytes(orderRef, orderBlob);

      console.log("Order stored successfully!"); // Debugging log

      setModalIsOpen(false);
      clearCart();
      setTimeout(() => {
        navigate("/thankyou");
      }, 1000);
    } catch (error) {
      console.error("Error storing order:", error);
      setModalIsOpen(false);
    }
  };

  const handleProceed = (e) => {
    e.preventDefault();
    if (paymentMethod) {
      navigate(`/payment/${paymentMethod}`);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Payment Form</h1>
      {!paymentMethod ? (
        <form onSubmit={handleProceed}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Choose Payment Method
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
              >
                UPI
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-200"
              >
                Cash on Delivery
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            Proceed
          </button>
        </form>
      ) : paymentMethod === "card" ? (
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="cardNumber"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="expiryDate"
            >
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="cvv">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 mb-4"
          >
            Pay Now
          </button>
        </form>
      ) : paymentMethod === "upi" ? (
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="upiId"
            >
              UPI ID
            </label>
            <input
              type="text"
              id="upiId"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 mb-4"
          >
            Pay Now
          </button>
        </form>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Cash on Delivery</h2>
          <button
            onClick={handlePayment}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 mb-4"
          >
            Confirm Order
          </button>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Download Receipt"
        className="modal bg-white rounded-lg p-8 shadow-lg"
        overlayClassName="overlay fixed top-0 left-0 w-full h-full bg-black opacity-50"
      >
        <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
        <p className="mb-4">
          Your order has been placed. Click the button below to download your
          receipt.
        </p>
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Download Receipt
        </button>
      </Modal>
    </div>
  );
};

export default PaymentForm;
