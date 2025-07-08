import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../../../contexts/AuthContext";
import { toast } from "react-toastify";

const Navber = () => {
  const { logout, user } = useContext(AuthContext);
  const notify = () => toast("Logout Successfully");

  const handleLogout = () => {
    logout()
      .then(() => notify())
      .catch((e) => e);
  };
  const navLinks = (
    <>
      <li>
        <NavLink to="/"> Home</NavLink>
      </li>
      <li>
        <NavLink to="/payment">Payment</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar  bg-[#202c45] text-white shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[#202c45] rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end gap-3">
        {user ? (
          <button onClick={handleLogout} className="btn btn-sm btn-primary">
            Logout
          </button>
        ) : (
          <NavLink to="/login" className="btn btn-sm btn-outline">
            Login
          </NavLink>
        )}

        <Link to="/register" className="btn btn-sm btn-outline">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navber;
