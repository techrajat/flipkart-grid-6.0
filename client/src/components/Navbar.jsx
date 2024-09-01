import { React, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { FaShoppingCart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import logo from "../assets/7.png";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (props.logged) {
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      setName(user.name);
    }
    //eslint-disable-next-line
  }, [props.logged]);

  const log_out = () => {
    googleLogout();
    props.logout();
    props.setLogoutModal(true);
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav className="relative bottom-8 text-white py-3 h-2 z-[500] w-full">
      <div className="container mx-auto flex justify-between items-center h-full">
        <div className="relative left-8 text-3xl flex gap-4 items-center justify-center font-bold text-white px-4 py-2 shadow-md shadow-pink-200">
          <Link to="/">
            <img src={logo}  width="200" alt="" />
          </Link>
        </div>
        <div className="flex items-center gap-10 ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-yellow-100 flex gap-3 px-4 py-2 shadow-md shadow-caribbeangreen-100 font-bold ${
                isActive ? "text-yellow-200" : ""
              }`
            }
          >
            <FaHome size={24} />
            Home
          </NavLink>
          <NavLink
            to="/cartitems"
            className={({ isActive }) =>
              `hover:text-yellow-100 flex gap-3 px-4 py-2 shadow-md shadow-caribbeangreen-100 font-bold ${
                isActive ? "text-yellow-200" : ""
              }`
            }
          >
            <FaShoppingCart size={24} />
            
            {/* <span className="relative bottom-2 right-3 rounded-full w-5 h-5 bg-caribbeangreen-100 text-black flex items-center justify-center text-xs animate-bounce">
                 {props.cart?.length || 0}
            </span> */}
              Cart
    
          </NavLink>

          {!props.logged ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `hover:text-yellow-100 flex gap-3 px-4 py-2 shadow-md shadow-caribbeangreen-100 font-bold ${
                  isActive ? "text-yellow-200" : ""
                }`
              }
            >
              <FaRegUser size={24} />
              Login
            </NavLink>
          ) : <div></div>}
          {props.logged ? (
            <div>
              <button
                className="relative  right-10  text-white font-bold focus:outline-none px-4 py-2 shadow-md shadow-caribbeangreen-100  hover:text-yellow-100"
                onClick={toggleDropdown}
              >
                {name}
                <svg
                  className={`w-4 h-4 ml-2 inline-block transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06 0L10 10.939l3.71-3.73a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-5 mt-4 w-28 bg-transparent rounded-md  z-250 text-white font-bold shadow-md shadow-white">
                  <ul className="py-1 text-gray-yellow ">
                    <li>
                      <Link
                        to="/recommend"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 shadow-md shadow-caribbeangreen-200 hover:text-yellow-200"
                        onClick={closeDropdown}
                      >
                        Top Picks
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 shadow-md shadow-caribbeangreen-200 hover:text-yellow-200"
                        onClick={closeDropdown}
                      >
                       Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/order"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 shadow-md shadow-caribbeangreen-200 hover:text-yellow-200"
                        onClick={closeDropdown}
                      >
                       My Orders
                      </Link>
                    </li>


                    <li>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:text-yellow-200"
                        onClick={log_out}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}

          {/* {props.logged === true && <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={log_out}>
            {name ? name : ""} */}
          {/* </Link>} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
