import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { loginWithGoogle, loginUserWithEmail } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmittingSocial, setIsSubmittingSocial] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUserWithEmail(data.email, data.password);

      const userData = { name: "User", email: data.email };
      await axiosInstance.post("/users", userData);

      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Login failed");
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

      toast.success("Google login successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google sign-in failed");
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
      {/* Soft gradient blobs */}
      <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full opacity-25 bg-green-300 blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] rounded-full opacity-20 bg-emerald-300 blur-3xl"></div>
      <div className="absolute top-1/2 left-[10%] w-[200px] h-[200px] rounded-full opacity-15 bg-green-200 blur-2xl"></div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-lg relative z-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 hover:underline">
            Sign up
          </Link>
        </p>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmittingSocial}
            className="bg-gray-100 cursor-pointer dark:bg-white/5 w-full h-12 justify-center hover:bg-gray-200 dark:hover:bg-white/10 dark:hover:text-white/90 transition text-gray-700 dark:text-gray-400 font-normal text-sm rounded-full flex items-center gap-3 px-5 py-2.5"
          >
            <FcGoogle size={20} />
            Log in with Google
          </button>

          <button
            type="button"
            className="bg-gray-100 cursor-pointer dark:bg-white/5 w-full h-12 justify-center hover:bg-gray-200 dark:hover:bg-white/10 dark:hover:text-white/90 transition text-gray-700 dark:text-gray-400 font-normal text-sm rounded-full flex items-center gap-3 px-5 py-2.5"
          >
            <FaFacebookF className="text-blue-600" size={18} />
            Log in with Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-200 dark:border-gray-700" />
          <span className="px-3 text-sm text-gray-400 dark:text-gray-500">
            or log in with email
          </span>
          <hr className="flex-grow border-gray-200 dark:border-gray-700" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            {...register("email", { required: "Email is required" })}
            className="border w-full text-sm dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-green-300 dark:focus:border-green-500 focus:outline-0 focus:ring-3 focus:ring-green-300/20 h-12 shadow-theme-xs border-gray-300 rounded-full px-5 py-2.5"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="border w-full text-sm dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 text-gray-800 placeholder:text-gray-400 focus:border-green-300 dark:focus:border-green-500 focus:outline-0 focus:ring-3 focus:ring-green-300/20 h-12 shadow-theme-xs border-gray-300 rounded-full px-5 py-2.5 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white/80"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 cursor-pointer hover:bg-green-700 text-white w-full h-12 rounded-full font-semibold transition"
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Forgot your password?{" "}
          <Link
            to="#"
            className="text-green-600 hover:underline cursor-pointer"
          >
            Reset here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
