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

  // Fetch approved booking data by id
  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;

      try {
        const res = await axiosSecure.get(`/bookings/approved/${id}`);
        setBooking(res.data);
      } catch (error) {
        console.error("Error fetching booking:", error);
        toast.error("Failed to load booking");
      }
    };

    fetchBooking();
  }, [axiosSecure, id]);

  // Create payment intent after booking is loaded
  useEffect(() => {
    if (!booking) return;

    const createPaymentIntent = async () => {
      try {
        // Ensure price is valid number and convert to cents
        const amount = Number(booking.price) * 100;

        if (!amount || isNaN(amount)) {
          console.error("Invalid amount:", booking.price);
          toast.error("Invalid payment amount");
          return;
        }

        const res = await axiosSecure.post("/create-payment-intent", {
          amountInCents: amount,
          bookingId: booking._id,
          userEmail: booking.userEmail,
        });

        setClientSecret(res.data.clientSecret);
      } catch (error) {
        console.error(
          "Error creating payment intent:",
          error.response?.data || error
        );
        toast.error("Failed to initiate payment");
      }
    };

    createPaymentIntent();
  }, [booking, axiosSecure]);

  // Handle payment submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure Stripe is ready
    if (!stripe || !elements) {
      toast.error("Stripe not loaded yet");
      return;
    }

    if (!clientSecret) {
      toast.error("Payment is not ready");
      return;
    }

    setLoading(true);

    try {
      // Confirm payment directly using card element
      // No need to manually create paymentMethod separately
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: booking.userEmail,
            },
          },
        }
      );

      // Handle Stripe error
      if (error) {
        console.error("Stripe confirm error:", error);
        toast.error(error.message);
        setLoading(false);
        return;
      }

      // If payment succeeds
      if (paymentIntent.status === "succeeded") {
        try {
          // Save payment info to backend
          await axiosSecure.post("/save-payment", {
            amount: booking.price,
            bookingId: booking._id,
            userEmail: booking.userEmail,
            paymentIntentId: paymentIntent.id,
            status: paymentIntent.status,
            paidAt: new Date(),
          });

          toast.success("Payment successful");
          navigate("/dashboard/confirmed-bookings");
        } catch (saveError) {
          console.error("Error saving payment:", saveError);
          toast.error("Payment saved failed");
        }
      }
    } catch (err) {
      console.error("Payment failed:", err);
      toast.error("Payment failed");
    }

    setLoading(false);
  };

  // Show loader while auth or booking is loading
  if (isAuthLoading || !booking) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        Pay for: {booking.courtName}
      </h2>

      <p className="text-center mb-2 text-gray-600">
        Date: {new Date(booking.date).toLocaleDateString()}
      </p>

      <p className="text-center mb-6 text-gray-600">
        Slot(s): {booking.slots?.join(", ")} | Price: ${booking.price}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Stripe card input field */}
        <CardElement className="p-4 border rounded-md" />

        <button
          type="submit"
          disabled={!stripe || loading || !clientSecret}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : `Pay $${booking.price}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;