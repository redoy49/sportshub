import React from "react";
import Marquee from "react-fast-marquee";

const partners = [
  {
    name: "Slack",
    url: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/slack.svg",
  },
  {
    name: "Framer",
    url: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/framer.svg",
  },
  {
    name: "Netflix",
    url: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/netflix.svg",
  },
  {
    name: "Google",
    url: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/google.svg",
  },
  {
    name: "LinkedIn",
    url: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/linkedin.svg",
  },
  {
    name: "Instagram",
    url: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/instagram.svg",
  },
  {
    name: "Facebook",
    url: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/facebook.svg",
  },
];

const PartnerSection = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* background glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(162,203,139,0.20) 0%, rgba(199,234,187,0.10) 30%, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto px-5 lg:px-8 xl:px-[8%]">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-[#84B179] bg-[#E8F5BD]/50 px-3 py-1 rounded-full">
            Trusted Worldwide
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
            Our Trusted Partners
          </h2>

          <div className="mt-4 w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-[#84B179] to-[#A2CB8B]" />

          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            We collaborate with leading organizations to deliver the best
            experience for our club members.
          </p>
        </div>

        {/* marquee */}
        <div className="relative overflow-hidden border-y border-gray-100 py-10">
          {/* fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-white to-transparent z-10" />

          <Marquee speed={35} pauseOnHover={false} gradient={false}>
            {partners.map((partner, index) => (
              <div
                key={index}
                className="mx-12 flex items-center justify-center"
              >
                <img
                  src={partner.url}
                  alt={partner.name}
                  draggable="false"
                  className="h-9 md:h-10 w-auto object-contain opacity-80 hover:opacity-100 hover:scale-110 transition duration-300"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
