import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";

const usePendingBookings = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["pending-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings/pending");
      return res.data;
    },
  });
};

const ManageBookingsApproval = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = usePendingBookings();

  const approveBooking = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/bookings/approve/${id}`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Approved",
        text: "Booking approved successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["pending-bookings"]);
    },
  });

  const rejectBooking = useMutation({
    mutationFn: async (id) => axiosSecure.patch(`/bookings/reject/${id}`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Rejected",
        text: "Booking rejected successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["pending-bookings"]);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Manage Booking Approvals
        </h2>

        <span className="text-sm text-gray-500">
          {bookings.length} pending requests
        </span>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {bookings.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No pending bookings available
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* Head */}
              <thead className="bg-[#E8F5BD]/40 text-gray-700 text-sm">
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Court</th>
                  <th>Slot</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-[#E8F5BD]/30 transition"
                  >
                    <td className="text-gray-500">{index + 1}</td>

                    <td className="text-gray-700">{booking.userEmail}</td>

                    <td className="font-medium text-gray-900">
                      {booking.courtName}
                    </td>

                    <td className="text-gray-600">
                      {booking.slots?.join(", ") || "N/A"}
                    </td>

                    <td className="text-[#84B179] font-semibold">
                      ৳{booking.price}
                    </td>

                    <td className="text-gray-600">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>

                    <td className="flex gap-2 justify-center items-center py-2">
                      <button
                        onClick={() => approveBooking.mutate(booking._id)}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#84B179] text-white hover:bg-[#6F9F62] transition"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectBooking.mutate(booking._id)}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                      >
                        Reject
                      </button>
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

export default ManageBookingsApproval;
