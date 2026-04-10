import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import fallbackImage from "../../../assets/profileFallback.png";
import { FaUserCircle, FaCalendarAlt } from "react-icons/fa";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData = {}, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full space-y-8 mx-auto mt-16 lg:mt-2">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-6">
        <img
          src={userData.image || fallbackImage}
          alt="User"
          className="w-24 h-24 rounded-full object-cover ring-2 ring-[#E8F5BD]"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {userData.name}
          </h2>
          <p className="text-gray-500 text-sm">{userData.email}</p>
          <span className="inline-block mt-2 text-xs bg-[#E8F5BD]/60 text-[#6F9F62] px-3 py-1 rounded-full">
            Member Panel
          </span>
        </div>
      </div>

      {/* USER STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Registered Date */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-center justify-between hover:shadow-sm transition">
          <div>
            <p className="text-sm text-gray-500">Registered On</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">
              {userData.createdAt
                ? new Date(userData.createdAt).toLocaleDateString()
                : "N/A"}
            </h3>
          </div>
          <FaCalendarAlt size={22} className="text-[#84B179]" />
        </div>

        {/* Optional placeholder for stats */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-center justify-between hover:shadow-sm transition">
          <div>
            <p className="text-sm text-gray-500">Total Bookings</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">0</h3>
          </div>
          <FaUserCircle size={22} className="text-[#84B179]" />
        </div>

        {/* Optional placeholder for more info */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-center justify-between hover:shadow-sm transition">
          <div>
            <p className="text-sm text-gray-500">Membership Level</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">
              Standard
            </h3>
          </div>
          <FaUserCircle size={22} className="text-[#84B179]" />
        </div>
      </div>

      {/* ADDITIONAL INFO / ACTIVITY */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaUserCircle className="text-[#84B179]" />
          Account Information
        </h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <span className="text-gray-500">Full Name:</span>{" "}
            <span className="font-medium">{userData.name}</span>
          </p>
          <p>
            <span className="text-gray-500">Email:</span>{" "}
            <span className="font-medium">{userData.email}</span>
          </p>
          <p>
            <span className="text-gray-500">Role:</span>{" "}
            <span className="font-medium capitalize">
              {userData.role || "Member"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
