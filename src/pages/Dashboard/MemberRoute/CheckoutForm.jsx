import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const { isAuthLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  //  FETCH BOOKING 
  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;

      try {
        const res = await axiosSecure.get(`/bookings/approved/${id}`);
        setBooking(res.data);
      } catch (error) {
        toast.error("Failed to load booking", error);
      }
    };

    fetchBooking();
  }, [axiosSecure, id]);

  //  CREATE PAYMENT INTENT 
  useEffect(() => {
    if (!booking) return;

    const createPaymentIntent = async () => {
      try {
        const amount = Number(booking.price) * 100;

        const res = await axiosSecure.post("/create-payment-intent", {
          amountInCents: amount,
          bookingId: booking._id,
          userEmail: booking.userEmail,
        });

        setClientSecret(res.data.clientSecret);
      } catch {
        toast.error("Payment initialization failed");
      }
    };

    createPaymentIntent();
  }, [booking, axiosSecure]);

  //  HANDLE PAYMENT 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return toast.error("Payment not ready");
    }

    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: booking.userEmail,
            },
          },
        },
      );

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        await axiosSecure.post("/save-payment", {
          amount: booking.price,
          bookingId: booking._id,
          userEmail: booking.userEmail,
          paymentIntentId: paymentIntent.id,
          status: paymentIntent.status,
          paidAt: new Date(),
        });

        toast.success("Payment successful 🎉");
        navigate("/dashboard/confirmed-bookings");
      }
    } catch {
      toast.error("Payment failed");
    }

    setLoading(false);
  };

  if (isAuthLoading || !booking) {
    return (
      <div className="flex justify-center py-10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 mt-16 lg:mt-2">
      {/*  HEADER CARD  */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Complete Payment
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Securely pay for your booking
        </p>
      </div>

      {/*  BOOKING INFO  */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 grid sm:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Court</p>
          <h3 className="text-lg font-semibold text-gray-900 mt-1">
            {booking.courtName}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">Date</p>
          <h3 className="text-gray-800 mt-1">
            {new Date(booking.date).toLocaleDateString()}
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">Slots</p>
          <h3 className="text-gray-800 mt-1">{booking.slots?.join(", ")}</h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <h3 className="text-xl font-semibold text-[#84B179] mt-1">
            ${booking.price}
          </h3>
        </div>
      </div>

      {/*  PAYMENT CARD  */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-gray-800">Payment Details</h3>

        {/* Stripe Input */}
        <div className="border border-gray-300 rounded-lg p-4 focus-within:ring-2 focus-within:ring-[#84B179]/40">
          <CardElement />
        </div>

        {/* Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!stripe || loading || !clientSecret}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-[#84B179] text-white hover:bg-[#6F9F62] transition disabled:opacity-50"
        >
          {loading ? "Processing..." : `Pay $${booking.price}`}
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
