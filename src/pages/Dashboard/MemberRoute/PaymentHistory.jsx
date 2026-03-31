import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCardView, setIsCardView] = useState(false);

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        setPayments(res.data);
      } catch (error) {
        console.error("Failed to load payments", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchPayments();
  }, [axiosSecure, user?.email]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Payment History</h2>

        <button
          onClick={() => setIsCardView((prev) => !prev)}
          className="px-4 py-2 text-xs font-medium rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
        >
          {isCardView ? "Table View" : "Card View"}
        </button>
      </div>

      {/* ================= CARD VIEW ================= */}
      {isCardView ? (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <div className="col-span-full flex justify-center py-10">
              <LoadingSpinner />
            </div>
          ) : payments.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 italic py-10">
              No payments found.
            </div>
          ) : (
            payments.map((pay, index) => (
              <div
                key={pay._id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow transition"
              >
                {/* Top */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm text-gray-500">
                    Payment #{index + 1}
                  </h3>
                  <span className="text-[#84B179] font-semibold">
                    ৳{pay.amount}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="text-gray-500">Booking:</span>{" "}
                    {pay.bookingId}
                  </p>
                  <p>
                    <span className="text-gray-500">Transaction:</span>{" "}
                    {pay.paymentIntentId}
                  </p>
                  <p>
                    <span className="text-gray-500">Paid At:</span>{" "}
                    {new Date(pay.paidAt).toLocaleString()}
                  </p>
                </div>

                {/* Status */}
                <div className="mt-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-[#E8F5BD]/60 text-[#6F9F62] font-medium capitalize">
                    {pay.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* ================= TABLE VIEW ================= */
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-10">
              <LoadingSpinner />
            </div>
          ) : payments.length === 0 ? (
            <div className="py-10 text-center text-gray-500 italic">
              No payments found.
            </div>
          ) : (
            <table className="table w-full">
              {/* Head */}
              <thead className="bg-[#E8F5BD]/40 text-gray-700 text-sm font-medium">
                <tr>
                  <th>#</th>
                  <th>Booking ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Transaction</th>
                  <th>Paid At</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {payments.map((pay, index) => (
                  <tr
                    key={pay._id}
                    className="hover:bg-[#E8F5BD]/30 transition"
                  >
                    <td className="text-gray-500 font-medium">{index + 1}</td>

                    <td className="text-gray-700">{pay.bookingId}</td>

                    <td className="text-[#84B179] font-semibold">
                      ৳{pay.amount}
                    </td>

                    <td>
                      <span className="px-3 py-1 text-xs rounded-full bg-[#E8F5BD]/60 text-[#6F9F62] font-medium capitalize">
                        {pay.status}
                      </span>
                    </td>

                    <td className="text-gray-600 text-sm">
                      {pay.paymentIntentId}
                    </td>

                    <td className="text-gray-500 text-sm">
                      {new Date(pay.paidAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
