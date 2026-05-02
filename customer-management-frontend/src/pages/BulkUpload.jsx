import { useState } from "react";
import toast from "react-hot-toast";
import { bulkUpload } from "../services/api";

export default function BulkUpload({ onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const fileExt = selectedFile.name.split(".").pop().toLowerCase();

    if (["csv", "xlsx", "xls"].includes(fileExt)) {
      setFile(selectedFile);
      toast.success("File selected successfully");
    } else {
      toast.error("Only CSV or Excel files allowed");
      e.target.value = null;
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file");

    setLoading(true);

    try {
      const res = await bulkUpload(file);

      toast.success(res.data || "Upload successful");

      onClose();
    } catch (err) {
      const msg = err.response?.data || "Upload failed";

      toast.error(
        typeof msg === "string"
          ? msg
          : "Check for duplicate NICs or invalid data",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Bulk Create Customers</h2>

      <div className="space-y-2">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".csv, .xlsx, .xls"
          className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {file && (
          <p className="text-sm text-green-600">
            Selected: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`
            px-4 py-2 rounded text-white transition
            ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }
          `}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}
