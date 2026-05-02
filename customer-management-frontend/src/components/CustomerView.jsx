import { Phone, MapPin, Users, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { getCustomers, addFamilyMember } from "../services/api";
import toast from "react-hot-toast";

export default function CustomerView({ customer, refresh }) {
  const [allCustomers, setAllCustomers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");

  // Load customers for dropdown
  useEffect(() => {
    getCustomers().then((res) => {
      setAllCustomers(res.data.content || []);
    });
  }, []);

  // Add family member
  const handleAddFamily = async () => {
    if (!selectedMember) {
      return toast.error("Select a customer");
    }

    // PREVENT DUPLICATE
    if (
      customer.familyMemberNames?.includes(
        allCustomers.find((c) => c.id == selectedMember)?.name,
      )
    ) {
      return toast.error("Already added as family member");
    }

    try {
      await addFamilyMember(customer.id, selectedMember);
      toast.success("Family member added");

      setSelectedMember("");
      if (refresh) refresh();
    } catch (err) {
      toast.error(err.response?.data || "Failed");
    }

  };

  if (!customer) return null;

  const handleRemoveFamily = async (memberId) => {
    try {
      // eslint-disable-next-line no-undef
      await removeFamilyMember(customer.id, memberId);
      toast.success("Removed");
      if (refresh) refresh();
    } catch {
      toast.error("Failed");
    }
  };
  
  return (
    <div className="p-5">
      <div className="bg-white rounded-2xl border shadow-md p-6">
       
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            {/* AVATAR */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center text-white text-xl font-bold uppercase shadow">
              {customer.name?.charAt(0)}
            </div>

            {/* NAME + INFO */}
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {customer.name}
              </h2>

              <p className="text-gray-500 text-sm font-medium">
                {customer.nic}
              </p>

              <p className="text-gray-400 text-xs mt-1">
                DOB: {customer.dob || "N/A"}
              </p>
            </div>
          </div>

          {/* EDIT BUTTON */}
          <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition">
            <Pencil size={16} />
          </button>
        </div>

        <div className="my-5 border-t"></div>

       
        <div className="grid grid-cols-1 gap-4">
          {/* MOBILE */}
          <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-full text-blue-500">
              <Phone size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700">
                Mobile Numbers
              </p>

              {customer.mobiles?.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {customer.mobiles.map((m, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm mt-1">No Mobile</p>
              )}
            </div>
          </div>

          {/* ADDRESS */}
          <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition">
            <div className="w-10 h-10 flex items-center justify-center bg-green-50 rounded-full text-green-500">
              <MapPin size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700">Address</p>

              {customer.addresses?.length > 0 ? (
                <div className="mt-1 space-y-1">
                  {customer.addresses.map((a, i) => (
                    <p key={i} className="text-gray-600 text-sm">
                      {a.line1 || ""} {a.city}, {a.country}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm mt-1">Location N/A</p>
              )}
            </div>
          </div>

          {/* FAMILY */}
          <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition">
            <div className="w-10 h-10 flex items-center justify-center bg-purple-50 rounded-full text-purple-500">
              <Users size={18} />
            </div>

            <div className="w-full">
              <p className="text-sm font-semibold text-gray-700">
                Family Members
              </p>

              {customer.familyMemberNames?.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {customer.familyMemberNames.map((f, i) => {
                    const member = allCustomers.find((c) => c.name === f);

                    return (
                      <span
                        key={i}
                        className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs flex items-center gap-1"
                      >
                        {f}

                        <button
                          onClick={() => handleRemoveFamily(member?.id)}
                          className="text-red-500 text-xs"
                        >
                          ✕
                        </button>
                      </span>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-400 text-sm mt-1">No Family Members</p>
              )}

              <div className="flex gap-2 mt-3">
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="border p-2 rounded text-sm flex-1"
                >
                  <option value="">Select customer</option>

                  {allCustomers
                    .filter((c) => c.id !== customer.id)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.nic})
                      </option>
                    ))}
                </select>

                <button
                  onClick={handleAddFamily}
                  className="bg-purple-600 text-white px-3 py-2 rounded text-sm"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
