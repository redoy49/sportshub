import React from "react";
import { Link } from "react-router";
import errorSvg from "../../assets/404sportshub.svg";

const ErrorPage = () => {
  return (
    <section
      className="min-h-screen flex justify-center items-center relative overflow-hidden px-6"
      style={{
        background:
          "linear-gradient(135deg, #f0f8f3 0%, #e2f4da 50%, #d4efc5 100%)",
      }}
    >
      {/* top blur gradient */}
      <span className="absolute top-0">
        <svg
          width="1222"
          height="283"
          viewBox="0 0 1222 283"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.7" filter="url(#filter0)">
            <circle cx="772" cy="-167.171" r="250" fill="#22c55e" />
          </g>
          <g opacity="0.4" filter="url(#filter1)">
            <circle cx="450" cy="-167.171" r="250" fill="#86efac" />
          </g>

          <defs>
            <filter
              id="filter0"
              x="322"
              y="-617.171"
              width="900"
              height="900"
              filterUnits="userSpaceOnUse"
            >
              <feGaussianBlur stdDeviation="120" />
            </filter>

            <filter
              id="filter1"
              x="0"
              y="-617.171"
              width="900"
              height="900"
              filterUnits="userSpaceOnUse"
            >
              <feGaussianBlur stdDeviation="120" />
            </filter>
          </defs>
        </svg>
      </span>

      {/* content */}
      <div className="max-w-[450px] mx-auto text-center relative z-10">
        {/* SVG illustration */}
        <img
          src={errorSvg}
          alt="404 Not Found"
          className="mb-10 w-full max-w-[320px] mx-auto"
        />

        {/* title */}
        <h1 className="text-4xl font-black text-gray-800 mb-2">
          Oops! Page Not Found
        </h1>

        {/* description */}
        <p className="text-gray-500 text-base">
          We’re sorry, but the page you requested could not be found.
        </p>

        {/* button */}
        <Link
          to="/"
          className="inline-flex mt-8 items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-full py-3 px-6 transition"
        >
          ← Back To Home
        </Link>

        {/* small text */}
        <p className="mt-6 text-sm text-gray-500">
          Something broken?{" "}
          <Link
            to="/support"
            className="text-green-600 font-medium hover:underline"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ErrorPage;
