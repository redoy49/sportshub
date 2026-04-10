import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import {
  FaUsers,
  FaTableTennis,
  FaUserCheck,
  FaMoneyBillWave,
} from "react-icons/fa";
import fallbackImage from "../../../assets/profileFallback.png";
import RevenueChart from "../AdminRoute/RevenueChart";

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Admin info
  const { data: admin = {}, isLoading: loadingAdmin } = useQuery({
    queryKey: ["admin", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });

  // Courts
  const { data: courts = [] } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courts`);
      return res.data;
    },
  });

  // Users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  // Bookings (for revenue + activity)
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings`);
      return res.data;
    },
  });

  const totalMembers = users.filter((u) => u.role === "member").length;

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);

  if (loadingAdmin) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <img
            src={admin.image || fallbackImage}
            alt="Admin"
            className="w-20 h-20 rounded-full object-cover ring-2 ring-[#E8F5BD]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = fallbackImage;
            }}
          />

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {admin.name}
            </h2>
            <p className="text-gray-500 text-sm">{admin.email}</p>

            <span className="inline-block mt-2 text-xs bg-[#E8F5BD]/60 text-[#6F9F62] px-3 py-1 rounded-full">
              Admin Panel
            </span>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Courts */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-center justify-between hover:shadow-sm transition">
          <div>
            <p className="text-sm text-gray-500">Total Courts</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">
              {courts.length}
            </h3>
          </div>
          <FaTableTennis size={22} className="text-[#84B179]" />
        </div>

        {/* Users */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-center justify-between hover:shadow-sm transition">
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">
              {users.length}
            </h3>
          </div>
          <FaUsers size={22} className="text-[#84B179]" />
        </div>

        {/* Members */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-center justify-between hover:shadow-sm transition">
          <div>
            <p className="text-sm text-gray-500">Total Members</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">
              {totalMembers}
            </h3>
          </div>
          <FaUserCheck size={22} className="text-[#84B179]" />
        </div>

        {/* Revenue (NEW) */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-center justify-between hover:shadow-sm transition">
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">
              ৳{totalRevenue.toLocaleString()}
            </h3>
          </div>
          <FaMoneyBillWave size={22} className="text-[#84B179]" />
        </div>
      </div>

      {/* CHART + ACTIVITY */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">
            Recent Bookings
          </h3>

          <div className="space-y-3 text-sm text-gray-600">
            {bookings
              .slice(-5)
              .reverse()
              .map((b, i) => (
                <div key={i} className="flex justify-between">
                  <span>{b.courtName}</span>
                  <span className="text-[#84B179]">৳{b.price}</span>
                </div>
              ))}

            {bookings.length === 0 && (
              <p className="text-gray-400">No recent bookings</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
