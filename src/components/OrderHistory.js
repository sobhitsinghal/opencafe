import React, { useEffect, useState } from "react";
import { storage } from "../components/Firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = ref(storage, "orders");
        const orderList = await listAll(ordersRef);

        const orderPromises = orderList.items.map(async (orderRef) => {
          const url = await getDownloadURL(orderRef);
          const response = await fetch(url);
          const data = await response.json();
          return data;
        });

        const orderData = await Promise.all(orderPromises);
        setOrders(orderData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="p-4 bg-white rounded shadow-md">
              <h2 className="text-xl font-bold mb-2">Order {index + 1}</h2>
              <ul className="list-disc ml-5">
                {order.cart.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - Quantity: {item.quantity} - Price: ₹
                    {item.price / 100}
                  </li>
                ))}
              </ul>
              <p className="mt-2">Total: ₹{order.totalValue / 100}</p>
              <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
