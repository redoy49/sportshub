import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";

const Register = () => {
  const { registerUserWithEmail, updateUserDetails, loginWithGoogle } =
    useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [isSubmittingSocial, setIsSubmittingSocial] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleRegister = async (data) => {
    try {
      await registerUserWithEmail(data.email, data.password);
      await updateUserDetails(data.fullName, null);

      const userData = { name: data.fullName || "Unknown", email: data.email };
      await axiosInstance.post("/users", userData);

      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Registration failed!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmittingSocial(true);
      const result = await loginWithGoogle();
      const userData = {
        name: result?.user?.displayName || "Unknown",
        email: result?.user?.email,
      };
      await axiosInstance.post("/users", userData);
      toast.success("Google sign-in successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Google sign-in failed!");
    } finally {
      setIsSubmittingSocial(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #f0f8f3 0%, #e2f4da 50%, #d4efc5 100%)",
      }}
    >
      {/* Optional soft gradient blobs for premium feel */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full opacity-30 bg-green-300 blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] rounded-full opacity-25 bg-emerald-300 blur-3xl"></div>
      <div className="absolute top-1/2 left-[10%] w-[200px] h-[200px] rounded-full opacity-20 bg-green-200 blur-2xl"></div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-lg relative z-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Register Now
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
          Fill the form below to create your account
        </p>

        {/* Social Sign-Up Buttons */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmittingSocial}
            className="bg-gray-100 dark:bg-white/5 w-full h-12 justify-center hover:bg-gray-200 dark:hover:bg-white/10 dark:hover:text-white/90 transition text-gray-700 dark:text-gray-400 font-normal text-sm rounded-full flex items-center gap-3 px-5 py-2.5"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <button
            type="button"
            className="bg-gray-100 dark:bg-white/5 w-full h-12 justify-center hover:bg-gray-200 dark:hover:bg-white/10 dark:hover:text-white/90 transition text-gray-700 dark:text-gray-400 font-normal text-sm rounded-full flex items-center gap-3 px-5 py-2.5"
          >
            <FaFacebookF className="text-blue-600" size={18} />
            Continue with Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-200 dark:border-gray-700" />
          <span className="px-3 text-sm text-gray-400 dark:text-gray-500">
            or register with email
          </span>
          <hr className="flex-grow border-gray-200 dark:border-gray-700" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName", { required: "Full name is required" })}
            className="border w-full text-sm dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-green-300 dark:focus:border-green-500 focus:outline-0 focus:ring-3 focus:ring-green-300/20 h-12 shadow-theme-xs border-gray-300 rounded-full px-5 py-2.5"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName.message}</p>
          )}

          <input
            type="email"
            placeholder="Email address"
            {...register("email", { required: "Email is required" })}
            className="border w-full text-sm dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-green-300 dark:focus:border-green-500 focus:outline-0 focus:ring-3 focus:ring-green-300/20 h-12 shadow-theme-xs border-gray-300 rounded-full px-5 py-2.5"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="border w-full text-sm dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-green-300 dark:focus:border-green-500 focus:outline-0 focus:ring-3 focus:ring-green-300/20 h-12 shadow-theme-xs border-gray-300 rounded-full px-5 py-2.5"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white w-full h-12 rounded-full font-semibold transition"
          >
            {isSubmitting ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 hover:underline cursor-pointer"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
