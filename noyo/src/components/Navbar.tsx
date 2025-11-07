import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiSearch } from "react-icons/fi";
import { useAuth } from "@/hooks";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white p-4 relative shadow-md">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-3xl font-semibold text-pink-500">
            Beauty Store
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 items-center">
            {currentUser ? (
              <>
                <li>Hello, {currentUser.username}</li>
                <li>
                  <button onClick={logout} className="hover:underline">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/auth" className="hover:underline">
                  Login/Signup
                </Link>
              </li>
            )}
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </li>

            {/* Search Icon */}
            <li>
              <button
                onClick={() => navigate("/search")}
                className="text-2xl text-pink-500 hover:text-pink-600"
              >
                <FiSearch />
              </button>
            </li>

            {/* Cart Icon */}
            <li>
              <Link to="/cart" className="hover:text-pink-500 text-2xl relative">
                <FiShoppingCart />
              </Link>
            </li>

            {/* Wishlist Icon */}
            <li>
              <Link
                to="/wishlist"
                className="hover:text-pink-500 text-2xl relative"
              >
                <FiHeart />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
