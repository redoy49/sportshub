import React from "react";

const NewsletterSection = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* background glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(162,203,139,0.20) 0%, rgba(199,234,187,0.10) 30%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] text-center">
        {/* Title */}
        <span className="inline-block text-sm font-semibold text-[#84B179] bg-[#E8F5BD]/50 px-3 py-1 rounded-full">
          Newsletter
        </span>

        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
          Stay Updated with Club News
        </h2>

        <p className="mt-3 text-gray-600 max-w-xl mx-auto">
          Subscribe to our newsletter and get updates about events,
          announcements and promotions directly in your inbox.
        </p>

        {/* Form */}
        <form className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          {/* Input with icon */}
          <div className="relative w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-[#84B179] focus:ring-2 focus:ring-[#A2CB8B]/40 outline-none transition"
              required
            />

            {/* email icon */}
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908V6.75z" />
            </svg>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
            bg-[#84B179] text-white font-semibold 
            hover:bg-[#6F9F62] transition shadow-sm"
          >
            Subscribe
            <svg
              className="w-4 h-4 transition group-hover:translate-x-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>

        {/* privacy note */}
        <p className="mt-4 text-sm text-gray-500">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
