import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getCustomers, addFamilyMember } from "../services/api";

export default function AddCustomer({ customer, onSave, onClose }) {
  const [form, setForm] = useState({
    name: "",
    nic: "",
    dob: "",
    mobiles: [""],
    addresses: [{ line1: "", line2: "", city: "", country: "" }],
  });

  // family member states
  const [allCustomers, setAllCustomers] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState([]);

  // load customers for family member selection

  useEffect(() => {
    getCustomers().then((res) => {
      setAllCustomers(res.data.content || []);
    });
  }, []);

  // load existing customer data if editing

  useEffect(() => {
    if (customer) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: customer.name || "",
        nic: customer.nic || "",
        dob: customer.dob || "",
        mobiles: customer.mobiles?.length ? customer.mobiles : [""],
        addresses:
          customer.addresses?.length > 0
            ? customer.addresses
            : [{ line1: "", line2: "", city: "", country: "" }],
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // mobile number handlers

  const updateMobile = (i, value) => {
    const arr = [...form.mobiles];
    arr[i] = value;
    setForm({ ...form, mobiles: arr });
  };

  const addMobile = () => {
    setForm({ ...form, mobiles: [...form.mobiles, ""] });
  };

  const removeMobile = (i) => {
    const arr = form.mobiles.filter((_, index) => index !== i);
    setForm({ ...form, mobiles: arr.length ? arr : [""] });
  };

  // address handlers

  const updateAddress = (i, field, value) => {
    const arr = [...form.addresses];
    arr[i][field] = value;
    setForm({ ...form, addresses: arr });
  };

  const addAddress = () => {
    setForm({
      ...form,
      addresses: [
        ...form.addresses,
        { line1: "", line2: "", city: "", country: "" },
      ],
    });
  };

  const removeAddress = (i) => {
    const arr = form.addresses.filter((_, index) => index !== i);
    setForm({
      ...form,
      addresses:
        arr.length > 0
          ? arr
          : [{ line1: "", line2: "", city: "", country: "" }],
    });
  };

  const toggleFamily = (id) => {
    if (selectedFamily.includes(id)) {
      setSelectedFamily(selectedFamily.filter((f) => f !== id));
    } else {
      setSelectedFamily([...selectedFamily, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.nic || !form.dob) {
      toast.error("Name, NIC, and DOB are required!");
      return;
    }

    // nic validation (removing spaces and converting to uppercase for consistency)
    const nicValue = form.nic?.replace(/\s+/g, "").toUpperCase();

    const nicPattern = /^([0-9]{9}[VX]|[0-9]{12})$/;

    if (!nicPattern.test(nicValue)) {
      toast.error("Invalid NIC format");
      return;
    }

    // mobile number validation
    for (let m of form.mobiles) {
      if (m && !/^[0-9]{10}$/.test(m)) {
        return toast.error("Invalid mobile number");
      }
    }

    const payload = {
      name: form.name.trim(),
      nic: nicValue,
      dob: form.dob,
      mobiles: form.mobiles.filter((m) => m.trim() !== ""),
      addresses: form.addresses
        .filter((a) => a.line1 && a.city && a.country)
        .map((a) => ({
          line1: a.line1,
          line2: a.line2 || "",
          city: a.city,
          country: a.country,
        })),
    };

    try {
      const res = await onSave(payload);

      // link family members if any selected (only for new customers or if ID is returned)

      if (selectedFamily.length > 0 && res?.data?.id) {
        for (let memberId of selectedFamily) {
          await addFamilyMember(res.data.id, memberId);
        }
      }

      toast.success("Customer saved!");
    } catch (err) {
      toast.error(err.response?.data || "Save failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold">Full Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border w-full p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-semibold">NIC *</label>

          <input
            name="nic"
            value={form.nic}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            placeholder="Enter NIC"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold">Date of Birth *</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="border w-full p-2 rounded mt-1 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="font-semibold mb-3">Mobile Numbers</h3>

        {form.mobiles.map((m, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              value={m}
              onChange={(e) => updateMobile(i, e.target.value)}
              className="border w-full p-2 rounded"
              placeholder="Enter mobile number"
            />

            <button
              type="button"
              onClick={() => removeMobile(i)}
              className="text-red-500 font-bold px-2"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addMobile}
          className="text-blue-600 text-sm mt-1"
        >
          + Add Mobile
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="font-semibold mb-3">Addresses</h3>

        {form.addresses.map((a, i) => (
          <div key={i} className="border p-3 mb-3 rounded">
            <input
              placeholder="Address Line 1"
              value={a.line1}
              onChange={(e) => updateAddress(i, "line1", e.target.value)}
              className="border w-full p-2 mb-2 rounded"
            />

            <input
              placeholder="Address Line 2"
              value={a.line2}
              onChange={(e) => updateAddress(i, "line2", e.target.value)}
              className="border w-full p-2 mb-2 rounded"
            />

            <div className="flex gap-2">
              <input
                placeholder="City"
                value={a.city}
                onChange={(e) => updateAddress(i, "city", e.target.value)}
                className="border w-1/2 p-2 rounded"
              />

              <input
                placeholder="Country"
                value={a.country}
                onChange={(e) => updateAddress(i, "country", e.target.value)}
                className="border w-1/2 p-2 rounded"
              />
            </div>

            <button
              type="button"
              onClick={() => removeAddress(i)}
              className="text-red-500 text-sm mt-2"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addAddress}
          className="text-blue-600 text-sm"
        >
          + Add Address
        </button>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border">
        <h3 className="font-semibold mb-3">Family Members</h3>

        <div className="max-h-32 overflow-y-auto space-y-1">
          {allCustomers.map((c) => (
            <label key={c.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedFamily.includes(c.id)}
                onChange={() => toggleFamily(c.id)}
              />
              {c.name} ({c.nic})
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="border px-4 py-2 rounded"
        >
          Cancel
        </button>

        <button className="bg-blue-600 text-white px-5 py-2 rounded shadow">
          Save Customer
        </button>
      </div>
    </form>
  );
}
