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
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
      }
    });
  };

  return (
    <div className="w-full px-6 py-6 mt-16 lg:mt-2 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Pending Bookings</h2>

      {isLoading && (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      )}

      {isError && (
        <p className="text-red-500">
          Error: {error?.message || "Something went wrong."}
        </p>
      )}

      {!isLoading && pendingBookings.length === 0 && (
        <p className="text-center text-gray-500 py-6 italic">
          No pending bookings found.
        </p>
      )}

      {!isLoading && pendingBookings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table w-full border border-gray-200 rounded-xl">
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
              {pendingBookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-[#E8F5BD]/30 transition"
                >
                  <td className="text-gray-700">{booking.courtName}</td>
                  <td className="text-gray-500">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="text-gray-700">{booking.slots?.join(", ") || "N/A"}</td>
                  <td className="text-[#84B179] font-semibold">
                    ${booking.price.toFixed(2)}
                  </td>
                  <td className="flex justify-center gap-2 py-2">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={cancelMutation.isLoading}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#84B179] text-white hover:bg-[#6F9F62] transition"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingBookings;