import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ConfirmedBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchConfirmedBookings = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(
          `/bookings/confirmed?email=${user.email}`
        );
        setBookings(res.data);
      } catch (error) {
        console.error("Failed to load confirmed bookings", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchConfirmedBookings();
  }, [axiosSecure, user?.email]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800">
        Confirmed Bookings
      </h2>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
        {loading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-10 text-center text-gray-500 italic">
            No confirmed bookings found.
          </div>
        ) : (
          <table className="table w-full">
            {/* Head */}
            <thead className="bg-[#E8F5BD]/40 text-gray-700 text-sm font-medium">
              <tr>
                <th>#</th>
                <th>Court</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking._id}
                  className="hover:bg-[#E8F5BD]/30 transition"
                >
                  <td className="text-gray-500 font-medium">
                    {index + 1}
                  </td>

                  <td className="text-gray-700">
                    {booking.courtName}
                  </td>

                  <td className="text-gray-500">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>

                  <td className="text-gray-700">
                    {booking.slots?.join(", ") || "N/A"}
                  </td>

                  <td className="text-[#84B179] font-semibold">
                    ৳{booking.price}
                  </td>

                  <td>
                    <span className="px-3 py-1 text-xs rounded-full bg-[#E8F5BD]/60 text-[#6F9F62] font-medium capitalize">
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ConfirmedBookings;