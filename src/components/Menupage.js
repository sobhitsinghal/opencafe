// src/components/MenuPage.js
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { MENU_API, LEFT_MENU_API, IMG_CDN_URL } from "../util/constants";
import BodyShimmer from "./BodyShimmerTest";

const MenuPage = () => {
  const { resId } = useParams();
  const [resMenu, setResMenu] = useState(null);
  const { cart, addToCart, incrementQuantity, decrementQuantity } = useCart();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const menuData = await fetch(MENU_API + resId + LEFT_MENU_API);
      const json = await menuData.json();
      setResMenu(json.data);
    } catch (error) {
      console.error("Failed to fetch menu data:", error);
    }
  };

  if (!resMenu) {
    return <BodyShimmer />;
  }

  const { name, cuisines, costForTwoMessage, cloudinaryImageId, avgRating } =
    resMenu?.cards[2]?.card?.card?.info || {};

  const itemCards =
    resMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card
      ?.itemCards || [];

  const getCartQuantity = (itemId) => {
    const item = cart.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="resmenu min-h-full p-4">
      <div className="resdetails flex flex-col items-center mb-8">
        <img
          className="w-40 h-40 rounded-full object-cover mb-4"
          src={IMG_CDN_URL + cloudinaryImageId}
          alt="Restaurant"
        />
        <h1 className="text-3xl font-bold">{name}</h1>
        <h3 className="text-xl text-gray-700">{cuisines?.join(", ")}</h3>
        <h3 className="text-lg text-gray-700">{costForTwoMessage}</h3>
        <h4 className="text-lg text-gray-700">{avgRating} &#9733;</h4>
      </div>

      <div className="menuitemscontainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {itemCards.map((item) => {
          const { id, name, description, price } = item.card.info;
          const quantity = getCartQuantity(id);

          return (
            <div
              key={id}
              className="menu-card p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-2">{name}</h2>
              <p className="text-gray-600">{description}</p>
              <p className="text-gray-800 font-bold mt-2">
                ₹{price ? price / 100 : "N/A"}
              </p>
              <div className="mt-4 flex items-center">
                {quantity > 0 ? (
                  <div className="flex items-center">
                    <button
                      onClick={() => decrementQuantity(id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                    >
                      -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button
                      onClick={() => incrementQuantity(id)}
                      className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-200"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(item.card.info)}
                    className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition duration-200"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuPage;
