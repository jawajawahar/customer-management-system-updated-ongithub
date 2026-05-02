import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  const user = {
    name: "Kasun Perera",
    role: "Admin",
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center bg-white px-6 py-3 shadow">
      {/* LEFT */}
      <h2 className="font-semibold text-lg">Dashboard</h2>

      {/* RIGHT */}
      <div className="relative" ref={dropdownRef}>
        {/* PROFILE BUTTON */}
        <div
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-lg transition"
        >
          {/* Avatar */}
          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full text-sm font-bold">
            KP
          </div>

          <div className="text-sm text-left">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-3 w-56 bg-white shadow-2xl rounded-xl border z-50 overflow-hidden animate-fadeIn">
            <div className="px-4 py-3 bg-gray-50 border-b">
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>

            <div className="py-2">
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 transition text-sm"
              >
                <PersonIcon fontSize="small" />
                Profile
              </button>

              <button
                onClick={() => navigate("/settings")}
                className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 transition text-sm"
              >
                <SettingsIcon fontSize="small" />
                Settings
              </button>

              <div className="border-t my-1"></div>

              <button
                onClick={() => alert("Logged out")}
                className="flex items-center gap-3 w-full px-4 py-2 hover:bg-red-50 text-red-500 transition text-sm"
              >
                <LogoutIcon fontSize="small" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
