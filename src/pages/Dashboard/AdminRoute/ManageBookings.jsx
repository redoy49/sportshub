import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { FaSearch } from "react-icons/fa";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const query = search ? `?title=${search}` : "";
        const res = await axiosSecure.get(`/bookings/confirmed${query}`);
        setBookings(res.data);
      } catch (err) {
        console.error("Error loading confirmed bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [axiosSecure, search]);

  const filteredBookings = bookings.filter((booking) =>
    booking.courtName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Manage Confirmed Bookings
        </h2>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search by court..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#84B179]/30 focus:border-[#84B179]"
          />
          <FaSearch
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="py-10 text-center text-gray-500">No bookings found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* Head */}
              <thead className="bg-[#E8F5BD]/40 text-gray-700 text-sm">
                <tr>
                  <th>#</th>
                  <th>Court</th>
                  <th>Date</th>
                  <th>Slot</th>
                  <th>Email</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-[#E8F5BD]/30 transition"
                  >
                    <td className="text-gray-500">{index + 1}</td>
                    <td className="text-gray-700 font-medium">{booking.courtName}</td>
                    <td className="text-gray-600 text-sm">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="text-gray-600 text-sm">{booking.slots?.join(", ") || "N/A"}</td>
                    <td className="text-gray-600 text-sm">{booking.userEmail}</td>
                    <td className="text-[#84B179] font-semibold">${booking.price}</td>
                    <td className="flex justify-center">
                      <span className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#84B179] text-white capitalize">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;