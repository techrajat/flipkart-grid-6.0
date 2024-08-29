import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

const Navbar = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    if (props.logged) {
      let user = localStorage.getItem('user');
      user = JSON.parse(user)
      setName(user.name);
    }
    //eslint-disable-next-line
  }, [props.logged]);

  const log_out = () => {
    googleLogout();
    props.logout();
    props.setLogoutModal(true);
    navigate("/");
  }

  return (
    <nav className="relative bottom-8 text-white py-3 h-2 z-[120] w-full">
      <div className="container mx-auto flex justify-between items-center h-full shadow-lg shadow-blue-100">
        <div className="text-3xl font-bold text-white">
          <Link to="/">FlipBuddy Shopping App</Link>
        </div>
        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-100">
            Home
          </Link>
          <Link to="/products" className="hover:text-yellow-100">
            Products
          </Link>
          <Link to="/cart" className="hover:text-yellow-100">
            Cart
          </Link>
          <Link to="/login" className="hover:text-yellow-100">
            Login
          </Link>
          <Link to="/login" className="hover:text-richblack-900 px-4 py-2 rounded-full bg-yellow-50">
           Login
          </Link>
          {props.logged === true && <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={log_out}>
            {name ? name : ""}
          </a>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

