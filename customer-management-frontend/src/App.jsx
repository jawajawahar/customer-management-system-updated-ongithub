import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import CustomerList from "./pages/CustomerList";
import Dashboard from "./pages/Dashboard";

// ✅ TOASTER
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      {/* ✅ GLOBAL TOASTER (ONLY ONE!) */}
      <Toaster
        position="top-center"
        containerStyle={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
            padding: "14px 20px",
            borderRadius: "12px",
            fontSize: "15px",
            textAlign: "center",
            minWidth: "250px",
          },
        }}
      />

      {/* MAIN LAYOUT */}
      <MainLayout>
        <Routes>
          {/* Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<CustomerList />} />

          {/* 404 */}
          <Route path="*" element={<h1 className="p-5">Page Not Found</h1>} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
