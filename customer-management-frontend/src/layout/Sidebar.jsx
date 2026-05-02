import { Link, useLocation } from "react-router-dom";

// 🔥 Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import UpdateIcon from "@mui/icons-material/Update";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      section: "MAIN",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
      ],
    },
    {
      section: "CUSTOMERS",
      items: [
        { name: "Customer List", path: "/customers", icon: <PeopleIcon /> },
        {
          name: "Bulk Upload",
          path: "/customers/upload",
          icon: <UploadFileIcon />,
        },
        {
          name: "Bulk Update",
          path: "/customers/bulk-update",
          icon: <UpdateIcon />,
        },
      ],
    },
    {
      section: "INSIGHTS",
      items: [
        { name: "Analytics", path: "/analytics", icon: <AnalyticsIcon /> },
      ],
    },
    {
      section: "SYSTEM",
      items: [
        { name: "Settings", path: "/settings", icon: <SettingsIcon /> },
        { name: "Logout", path: "/logout", icon: <LogoutIcon /> },
      ],
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-blue-100 shadow-xl h-screen p-4 flex flex-col">
      {/* LOGO */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-blue-600">Customer</h1>
        <p className="text-xs text-gray-500">Management System</p>
      </div>

      {/* MENU */}
      <div className="flex-1 overflow-y-auto">
        {menuItems.map((section, i) => (
          <div key={i} className="mb-5">
            <p className="text-md font-semibold text-gray-400 mb-2 px-2">
              {section.section}
            </p>

            {section.items.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition 
                  ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {item.icon}
                <span className="text-md">{item.name}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="border-t pt-3">
        <p className="text-xs text-gray-400 text-center"></p>
      </div>
    </div>
  );
}
