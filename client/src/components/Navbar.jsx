import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      
      <div className="flex justify-between items-center px-6 py-4">

        {/* LOGO */}
        <h1 className="text-2xl font-bold tracking-wide">
          BDA CRM
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center">

          <Link to="/" className="hover:text-gray-200 transition">
            Dashboard
          </Link>

          <Link to="/leads" className="hover:text-gray-200 transition">
            Leads
          </Link>

          <Link to="/add-lead" className="hover:text-gray-200 transition">
            Add Lead
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg transition"
          >
            Logout
          </button>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden flex flex-col gap-3 px-6 pb-4 bg-blue-700">

          <Link onClick={() => setOpen(false)} to="/" className="py-1">
            Dashboard
          </Link>

          <Link onClick={() => setOpen(false)} to="/leads" className="py-1">
            Leads
          </Link>

          <Link onClick={() => setOpen(false)} to="/add-lead" className="py-1">
            Add Lead
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 px-3 py-2 rounded mt-2"
          >
            Logout
          </button>

        </div>
      )}
    </nav>
  );
};

export default Navbar;