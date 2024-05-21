import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
// import { useAuth } from "../context/AuthContext";
import logo2 from "../../assets/logo2.png";
import { useCart } from "../context/CartContext";

const Logo = () => (
  <a href="/">
    <img className="w-24 p-2 rounded-full" src={logo2} alt="logo" />
  </a>
);

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { cart, clearCart, saveCart, loadCart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = async () => {
    try {
      clearCart;
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <div className="flex justify-between items-center shadow-lg z-10 w-full bg-slate-200 header-container sticky top-0 left-0">
      <div className="logo flex items-center">
        <Logo />
      </div>
      <div className="headerlist">
        <ul className="lists flex list-none pr-14 font-semibold text-gray-700">
          <li className="p-3 mr-10 hover:text-yellow-600 hover:bg-slate-800 rounded-lg">
            <Link to="/myorders" className="hover:text-gray-300 justify-center">
              My Orders
            </Link>
          </li>
          <li className="p-3 mr-10 hover:text-yellow-600 hover:bg-slate-800 rounded-lg">
            <Link to="/">Home</Link>
          </li>
          <li className="p-3 mr-10 hover:text-yellow-600 hover:bg-slate-800 rounded-lg">
            <Link to="/about">About</Link>
          </li>

          {currentUser ? (
            <>
              <li
                className="p-3 mr-10 relative flex items-center cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {currentUser.photoURL && (
                  <img
                    src={currentUser.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <span className="ml-2">{currentUser.displayName}</span>
                {dropdownVisible && (
                  <ul className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md z-10 w-32">
                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
              <li className="p-3 mr-10 hover:text-yellow-600 hover:bg-slate-800 rounded-lg">
                <button onClick={handleLogout} className="w-full text-left">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="p-3 mr-10 hover:text-yellow-600 hover:bg-slate-800 rounded-lg">
                <Link to="/login">Login</Link>
              </li>
              <li className="p-3 mr-10 hover:text-yellow-600 hover:bg-slate-800 rounded-lg">
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
          <li className="relative p-3 hover:text-yellow-600 hover:bg-slate-800 rounded-lg">
            <Link to="/cart">
              <FaShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-block w-6 h-6 text-center text-white bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
