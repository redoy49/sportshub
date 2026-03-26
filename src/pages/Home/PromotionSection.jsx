import React from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PromotionSection = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: coupons = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      if (Array.isArray(res.data)) return res.data;
      if (res.data?.coupons && Array.isArray(res.data.coupons))
        return res.data.coupons;
      return [];
    },
  });

  return (
    <section className="relative py-20 bg-white overflow-hidden">

      {/* Soft Green Glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(162, 203, 139, 0.2) 0%, rgba(199, 234, 187, 0.1) 30%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%]">
        
        <SectionTitle
          title="Exclusive Promotions"
          subtitle="Save more with our latest discount coupons"
        />

        {/* Loading */}
        {isLoading && (
          <p className="text-center mt-8 text-gray-600">
            Loading promotions...
          </p>
        )}

        {/* Error */}
        {isError && (
          <p className="text-center text-red-500 mt-8">
            Failed to load coupons.
          </p>
        )}

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {Array.isArray(coupons) && coupons.length > 0 ? (
            coupons.slice(0, 4).map(({ _id, code, discount, description }) => (
              <div
                key={_id || code}
                className="group bg-white rounded-xl border border-gray-200 p-5 text-center
                hover:border-[#A2CB8B] transition"
              >
                {/* Discount */}
                <div className="text-3xl font-bold text-[#84B179]">
                  {discount}% OFF
                </div>

                {/* Code Label */}
                <p className="text-xs text-gray-500 mt-2">
                  Use Code
                </p>

                {/* Coupon Code */}
                <div
                  className="mt-2 inline-block font-mono text-sm
                  bg-[#E8F5BD]/50 text-gray-800 px-4 py-2 rounded-lg
                  border border-[#A2CB8B]/30 select-all cursor-pointer"
                >
                  {code}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-3">
                  {description}
                </p>

                {/* Optional CTA */}
                <button
                  className="mt-4 px-4 py-2 rounded-lg text-sm font-medium
                  bg-[#84B179] text-white hover:bg-[#6F9F62] transition"
                >
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            !isLoading && (
              <p className="text-center text-gray-500 col-span-full">
                No active promotions available.
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;