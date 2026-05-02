import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 overflow-auto bg-gray-50 flex-1">{children}</div>
      </div>
    </div>
  );
}
