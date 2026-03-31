import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const PendingBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: pendingBookings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pending-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/pending", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/bookings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pending-bookings", user?.email]);
      Swal.fire("Cancelled", "Booking has been cancelled", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to cancel the booking", "error");
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this pending booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) cancelMutation.mutate(id);
    });
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        Pending Bookings
      </h2>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center text-red-600 mt-6">
          Failed to load bookings: {error?.message}
        </div>
      )}

      {/* Table */}
      {!isLoading && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-[#E8F5BD]/40 text-gray-700 text-sm font-medium">
              <tr>
                <th>Court</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingBookings.length > 0 ? (
                pendingBookings.map((booking, idx) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-[#E8F5BD]/30 transition"
                  >
                    <td className="text-gray-700">{booking.courtName}</td>
                    <td className="text-gray-500">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="text-gray-700">
                      {booking.slots?.join(", ") || "N/A"}
                    </td>
                    <td className="text-[#84B179] font-semibold">
                      ${booking.price.toFixed(2)}
                    </td>
                    <td className="flex gap-2 justify-center py-2">
                      <button
                        onClick={() => handleCancel(booking._id)}
                        disabled={cancelMutation.isLoading}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#84B179] text-white hover:bg-[#6F9F62] transition flex items-center justify-center"
                        title="Cancel Booking"
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 448 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-1"
                        >
                          <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                        </svg>
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No pending bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingBookings;