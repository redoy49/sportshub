import React from "react";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const ApprovedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: approvedBookings = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["approved-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/approved", {
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
      queryClient.invalidateQueries(["approved-bookings", user?.email]);
    },
  });

  const handlePayment = (id) => {
    navigate(`/dashboard/payment-page/${id}`);
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        cancelMutation.mutate(id);
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800">
        Approved Bookings
      </h2>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        ) : isError ? (
          <p className="text-red-500 text-center py-10">
            Error: {error?.message || "Something went wrong."}
          </p>
        ) : approvedBookings.length === 0 ? (
          <div className="py-10 text-center text-gray-500 italic">
            No approved bookings found.
          </div>
        ) : (
          <table className="table w-full">
            {/* Head */}
            <thead className="bg-[#E8F5BD]/40 text-gray-700 text-sm font-medium">
              <tr>
                <th>Court</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {approvedBookings.map((booking) => (
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
                    ৳{booking.price}
                  </td>

                  <td className="flex gap-2 justify-center py-2">
                    {/* Pay Button */}
                    <button
                      onClick={() => handlePayment(booking._id)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#84B179] text-white hover:bg-[#6F9F62] transition flex items-center justify-center"
                      title="Pay Now"
                    >
                      {/* Credit Card Icon */}
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 576 512"
                        height="1em"
                        width="1em"
                        className="mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 80C0 53.5 21.5 32 48 32h480c26.5 0 48 21.5 48 48v48H0V80zm0 96h576v256c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176zm64 192h96v32H64v-32zm128 0h192v32H192v-32z"></path>
                      </svg>
                      Pay
                    </button>

                    {/* Cancel Button */}
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={cancelMutation.isLoading}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition flex items-center justify-center"
                      title="Cancel Booking"
                    >
                      {/* Trash Icon */}
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 448 512"
                        height="1em"
                        width="1em"
                        className="mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                      </svg>
                      Cancel
                    </button>
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

export default ApprovedBookings;