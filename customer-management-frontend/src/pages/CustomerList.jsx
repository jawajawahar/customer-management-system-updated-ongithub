import { useState, useEffect } from "react";
import {
  Plus,
  Upload,
  RefreshCw,
  Search,
  Eye,
  Edit3,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import toast from "react-hot-toast";
// import { deleteCustomer } from "../services/api";
import AddCustomer from "./AddCustomer";
import BulkUpload from "./BulkUpload";
import BulkUpdate from "./BulkUpdate";
import CustomerView from "../components/CustomerView";
import Modal from "../components/Modal";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  searchCustomers,
} from "../services/api";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showBulkUpdate, setShowBulkUpdate] = useState(false);
  const [loading, setLoading] = useState(false);


  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const fetchCustomers = async (searchValue = "", pageValue = 0) => {
    setLoading(true);
    try {
      let res;

      if (searchValue && searchValue.trim() !== "") {
        const query = searchValue.trim();

        const isNic = /^[0-9]{9}[VXvx]$|^[0-9]{12}$/.test(query);

        if (isNic) {
          res = await searchCustomers("", query, pageValue);
        } else {
          res = await searchCustomers(query, "", pageValue);
        }
      } else {
        res = await getCustomers(pageValue);
      }

      setCustomers(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
      setPage(pageValue); // pagination sync
    } catch (err) {
      console.error(err);
      toast.error("Search failed");
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCustomers("", 0);
  }, []);

  const handleSave = async (formData) => {
    try {
      if (editing) {
        await updateCustomer(editing.id, formData);
        toast.success("Customer updated successfully");
      } else {
        await createCustomer(formData);
        toast.success("Customer created successfully");
      }
      setShowForm(false);
      setEditing(null);
      fetchCustomers(search, page);
    } catch (err) {
      toast.error(err.response?.data || "Save failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 font-sans">
              Customer Directory
            </h1>
            <p className="text-gray-500">
              Manage your client base and their details.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg text-gray-700"
            >
              <Upload size={18} /> Bulk Upload
            </button>

            <button
              onClick={() => setShowBulkUpdate(true)}
              className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg text-gray-700"
            >
              <RefreshCw size={18} /> Bulk Update
            </button>

            <button
              onClick={() => {
                setEditing(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg text-white"
            >
              <Plus size={18} /> Add Customer
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              fetchCustomers(e.target.value, 0);
            }}
            className="w-full py-3 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-xl 
               text-gray-900 text-sm transition-all duration-200
               focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none
               placeholder:text-gray-400"
            placeholder="Search by name or NIC..."
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">NIC</th>
                <th className="px-6 py-4">Contact & Location</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-20 text-gray-400">
                    Synchronizing with Database...
                  </td>
                </tr>
              ) : customers.length > 0 ? (
                customers.map((c) => (
                  <tr key={c.id} className="hover:bg-blue-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold uppercase">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">{c.name}</p>
                          <p className="text-xs text-gray-500 italic font-medium">
                            DOB: {c.dob}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm font-mono text-gray-600 font-semibold">
                      {c.nic}
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700 font-medium">
                        {c.mobiles?.[0] || "No Mobile"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {c.addresses?.[0]?.city || "Location N/A"}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() => {
                            setEditing(c);
                            setShowView(true);
                          }}
                          className="p-2 rounded-full hover:bg-blue-100 transition group"
                          title="View"
                        >
                          <Eye
                            size={18}
                            className="text-blue-500 group-hover:scale-110 transition"
                          />
                        </button>

                        <button
                          onClick={() => {
                            setEditing(c);
                            setShowForm(true);
                          }}
                          className="p-2 rounded-full hover:bg-amber-100 transition group"
                          title="Edit"
                        >
                          <Edit3
                            size={18}
                            className="text-amber-500 group-hover:scale-110 transition"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-400 italic"
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/*  pagination */}
        <div className="flex items-center justify-between px-2 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Page <span className="font-medium text-gray-900">{page + 1}</span>{" "}
            of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 0}
              onClick={() => fetchCustomers(search, page - 1)}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <button
              disabled={page + 1 >= totalPages}
              onClick={() => fetchCustomers(search, page + 1)}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <AddCustomer
          customer={editing}
          onSave={handleSave}
          onClose={() => setShowForm(false)}
        />
      </Modal>

      <Modal isOpen={showView} onClose={() => setShowView(false)}>
        <CustomerView
          customer={editing}
          refresh={() => fetchCustomers(search, page)}
        />
      </Modal>

      <Modal isOpen={showUpload} onClose={() => setShowUpload(false)}>
        <BulkUpload onClose={() => fetchCustomers(search, page)} />
      </Modal>

      <Modal isOpen={showBulkUpdate} onClose={() => setShowBulkUpdate(false)}>
        <BulkUpdate onClose={() => fetchCustomers(search, page)} />
      </Modal>
    </div>
  );
}
