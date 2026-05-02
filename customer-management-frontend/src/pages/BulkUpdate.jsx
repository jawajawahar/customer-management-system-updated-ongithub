import { useState } from "react";
import toast from "react-hot-toast";
import { bulkUpdate } from "../services/api";

export default function BulkUpdate({ onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const ext = selected.name.split(".").pop().toLowerCase();

    if (!["csv", "xlsx"].includes(ext)) {
      toast.error("Only CSV or Excel files allowed");
      return;
    }

    setFile(selected);
  };

  const handleUpdate = async () => {
    if (!file) return toast.error("Please select a file");

    setLoading(true);

    try {
      const res = await bulkUpdate(file);

      toast.success(res.data || "Bulk update successful");

      onClose();
    } catch (err) {
      console.error(err);

      const msg =
        err.response?.data ||
        err.response?.data?.message ||
        "Bulk update failed";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Bulk Update Customers</h2>

      <p className="text-sm text-gray-600 mb-3">
        Update customers using NIC (must match existing records)
      </p>

      <input
        type="file"
        onChange={handleFile}
        accept=".csv, .xlsx"
        className="border p-2 w-full"
      />

      <div className="mt-4 flex gap-2 justify-end">
        <button onClick={onClose} className="border px-4 py-2 rounded">
          Cancel
        </button>

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Processing..." : "Update"}
        </button>
      </div>
    </div>
  );
}
