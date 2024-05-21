// src/components/AddressPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const AddressPage = () => {
  const { cart } = useCart();
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          const fetchedAddress = await fetchAddressFromCoords(
            latitude,
            longitude
          );
          setAddress(fetchedAddress);
          calculateDeliveryTime(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchAddressFromCoords = async (latitude, longitude) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();
    return data.display_name || "Address not found";
  };

  const calculateDeliveryTime = (latitude, longitude) => {
    const kolkataCoords = { lat: 22.5726, lon: 88.3639 };
    const distance = haversineDistance(
      { lat: latitude, lon: longitude },
      kolkataCoords
    );

    let deliveryEstimate = "Not deliverable to your location.";
    if (distance <= 25) {
      deliveryEstimate = "30 minutes";
    } else if (distance <= 100) {
      deliveryEstimate = "45 minutes";
    } else if (distance <= 150) {
      deliveryEstimate = "More than 1 hour";
    }

    setDeliveryTime(deliveryEstimate);
  };

  const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLon = toRad(coords2.lon - coords1.lon);
    const lat1 = toRad(coords1.lat);
    const lat2 = toRad(coords2.lat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePlaceOrder = () => {
    navigate("/payment");
  };

  const handleCancel = () => {
    navigate("/cart");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Enter Address</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <textarea
          className="w-full p-2 border rounded mb-4"
          value={address}
          onChange={handleInputChange}
          placeholder="Enter your address"
        ></textarea>
        <p className="text-gray-600 mb-4">Delivery Estimate: {deliveryTime}</p>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            Place Order
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
        <p className="text-gray-600 mt-6">
          Note: Once the order is placed, it cannot be cancelled as the food
          would be wasted. Thank you for understanding.
        </p>
      </div>
    </div>
  );
};

export default AddressPage;
