import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import fallbackImage from "../../../assets/profileFallback.png";
import { FaUserCircle, FaCalendarAlt } from "react-icons/fa";

const MemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: member = {}, isLoading } = useQuery({
    queryKey: ["member", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="w-full space-y-8">
      {/* ================= HEADER ================= */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-6">
        <img
          src={member.image || fallbackImage}
          alt="Member"
          className="w-24 h-24 rounded-full object-cover ring-2 ring-[#E8F5BD]"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {member.name || "N/A"}
          </h2>
          <p className="text-gray-500 text-sm">{member.email}</p>

          <span className="inline-block mt-2 text-xs bg-[#E8F5BD]/60 text-[#6F9F62] px-3 py-1 rounded-full">
            Member Panel
          </span>
        </div>
      </div>

      {/* ================= MEMBER STATS ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Joined Date */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-center justify-between hover:shadow-sm transition">
          <div>
            <p className="text-sm text-gray-500">Joined On</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">
              {member.createdAt
                ? new Date(member.createdAt).toLocaleDateString()
                : "N/A"}
            </h3>
          </div>
          <FaCalendarAlt size={22} className="text-[#84B179]" />
        </div>

        {/* Placeholder - bookings */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-center justify-between hover:shadow-sm transition">
          <div>
            <p className="text-sm text-gray-500">Total Bookings</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">
              0
            </h3>
          </div>
          <FaUserCircle size={22} className="text-[#84B179]" />
        </div>

        {/* Membership Type */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl flex items-center justify-between hover:shadow-sm transition">
          <div>
            <p className="text-sm text-gray-500">Membership</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">
              Standard
            </h3>
          </div>
          <FaUserCircle size={22} className="text-[#84B179]" />
        </div>
      </div>

      {/* ================= ACCOUNT INFO ================= */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaUserCircle className="text-[#84B179]" />
          Account Information
        </h3>

        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <span className="text-gray-500">Full Name:</span>{" "}
            <span className="font-medium">{member.name}</span>
          </p>

          <p>
            <span className="text-gray-500">Email:</span>{" "}
            <span className="font-medium">{member.email}</span>
          </p>

          <p>
            <span className="text-gray-500">Role:</span>{" "}
            <span className="font-medium capitalize">
              {member.role || "Member"}
            </span>
          </p>

          <p>
            <span className="text-gray-500">Joined:</span>{" "}
            <span className="font-medium">
              {member.createdAt
                ? new Date(member.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;