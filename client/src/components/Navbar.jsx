import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className=" bottom-200 top-0 left-0 z-50 w-full flex justify-center">
      <div className="mt-3 mx-3 flex w-full max-w-6xl items-center justify-between bg-[#1f1f1f] px-4 py-2 rounded-full">

        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="text-black"
          >
            <path
              d="M12 2C7.58 2 4 5.58 4 10c0 3.53 2.29 6.53 5.47 7.59L9 22l3-3 3 3-.47-4.41C17.71 16.53 20 13.53 20 10c0-4.42-3.58-8-8-8z"
              fill="currentColor"
            />
          </svg>
        </Link>

        {/* Center title (hidden on small screens) */}
        <span className="hidden md:block text-white text-base font-medium">
          Exams Of DCRUST
        </span>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-white text-base font-medium">
          <Link
            to="/"
            className={isActive("/") ? "opacity-100" : "opacity-70 hover:opacity-100"}
          >
            Home
          </Link>

          <Link
            to="/papers"
            className={isActive("/papers") ? "opacity-100" : "opacity-70 hover:opacity-100"}
          >
            Question Papers
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute top-20 w-[90%] max-w-sm bg-[#1f1f1f] rounded-2xl py-4 flex flex-col items-center gap-4 md:hidden">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`text-white ${
              isActive("/") ? "opacity-100" : "opacity-70"
            }`}
          >
            Home
          </Link>

          <Link
            to="/papers"
            onClick={() => setOpen(false)}
            className={`text-white ${
              isActive("/papers") ? "opacity-100" : "opacity-70"
            }`}
          >
            Question Papers
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
