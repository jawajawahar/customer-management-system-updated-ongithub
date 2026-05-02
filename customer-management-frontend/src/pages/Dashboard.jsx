export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p>Welcome to Customer Management System</p>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold">Total Customers</h2>
          <p className="text-xl text-blue-600">--</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold">Active Users</h2>
          <p className="text-xl text-green-600">--</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="font-semibold">New Registrations</h2>
          <p className="text-xl text-purple-600">--</p>
        </div>
      </div>
    </div>
  );
}
