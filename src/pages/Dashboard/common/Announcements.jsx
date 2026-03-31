import React from "react";
import useAnnouncements from "../../../hooks/useAnnouncements";
import { FaBullhorn } from "react-icons/fa";
import { format } from "date-fns";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Announcements = () => {
  const {
    data: announcements = [],
    isLoading,
    isError,
    error,
  } = useAnnouncements();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-6">
        Failed to load announcements: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <FaBullhorn className="text-[#84B179]" />
        Club Announcements
      </h2>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-[#E8F5BD]/40 text-gray-700 text-sm font-medium">
            <tr>
              <th>#</th>
              <th>Announcement</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {announcements.length > 0 ? (
              announcements.map((a, index) => (
                <tr
                  key={a._id}
                  className="hover:bg-[#E8F5BD]/30 transition"
                >
                  <td className="text-gray-500 font-medium">{index + 1}</td>
                  <td className="text-gray-700">{a.text}</td>
                  <td className="text-gray-500 text-sm">
                    {format(new Date(a.createdAt), "PPP p")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No announcements yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Announcements;