import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import fallbackImage from "../../assets/profileFallback.png";
import athletedHub from "../../assets/athletesHub.png";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch {
      toast.error("Logout failed.");
    }
  };

  const navItemClass = ({ isActive }) =>
    `relative text-sm font-medium transition
      ${isActive ? "text-[#84B179]" : "text-gray-700 hover:text-[#84B179]"}
      after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
      after:bg-[#84B179] after:transition-all hover:after:w-full`;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-sm
        border-b ${scrolled ? "border-black/10" : "border-black/5"} bg-white/70`}
    >
      <div className="max-w-[1600px] mx-auto h-16 flex items-center justify-between px-5 lg:px-8 xl:px-[8%]">
        {/* Mobile menu */}
        <div className="dropdown lg:hidden">
          <button tabIndex={0} className="btn btn-ghost p-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul className="menu dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/courts">Courts</NavLink>
            </li>
            <li>
              <NavLink to="/support">Support</NavLink>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="hidden lg:flex items-center">
          <img
            src={athletedHub}
            alt="Logo"
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-8">
          <li>
            <NavLink className={navItemClass} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={navItemClass} to="/courts">
              Courts
            </NavLink>
          </li>
          <li>
            <NavLink className={navItemClass} to="/support">
              Support
            </NavLink>
          </li>
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <img
                  className="w-10 h-10 rounded-full border border-slate-300 object-cover"
                  src={user.photoURL || fallbackImage}
                  alt="User"
                />
              </label>
              <ul className="menu dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
                <li>
                  <span className="text-sm">
                    {user.displayName || user.email}
                  </span>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              {/* Secondary CTA */}
              <Link
                to="/login"
                className="text-sm px-4 py-2 border border-[#84B179] text-[#84B179] rounded-full hover:bg-[#84B179] hover:text-white transition"
              >
                Sign In
              </Link>

              {/* Primary CTA */}
              <Link
                to="/courts"
                className="text-sm px-4 py-2 bg-gradient-to-r from-[#84B179] to-[#A2CB8B] text-white rounded-full shadow hover:shadow-lg hover:scale-105 transition"
              >
                Book Now
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
