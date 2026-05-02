import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function CustomerTable({ customers, onDelete, onView }) {
  const navigate = useNavigate();

  return (
    <table className="w-full border mt-4">
      <thead className="bg-gray-200">
        <tr>
          <th>Name</th>
          <th>NIC</th>
          <th>DOB</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {customers.map((c) => (
          <tr key={c.id} className="text-center border-t">
            <td>{c.name}</td>
            <td>{c.nic}</td>
            <td>{c.dob}</td>

            <td>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => onView && onView(c)}
                  className="p-2 rounded-full hover:bg-blue-100 transition group"
                  title="View"
                >
                  <Eye
                    size={18}
                    className="text-blue-500 group-hover:scale-110 transition"
                  />
                </button>

                <button
                  onClick={() => navigate(`/edit/${c.id}`)}
                  className="p-2 rounded-full hover:bg-yellow-100 transition group"
                  title="Edit"
                >
                  <Pencil
                    size={18}
                    className="text-yellow-500 group-hover:scale-110 transition"
                  />
                </button>

                <button
                  onClick={() => onDelete && onDelete(c.id)}
                  className="p-2 rounded-full hover:bg-red-100 transition group"
                  title="Delete"
                >
                  <Trash2
                    size={18}
                    className="text-red-500 group-hover:scale-110 transition"
                  />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
