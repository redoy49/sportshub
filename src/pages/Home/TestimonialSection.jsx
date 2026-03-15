import React from "react";
import Marquee from "react-fast-marquee";

const testimonials = [
  {
    name: "Maya Patel",
    username: "@mayapatel",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    text: "The automation features alone have saved our team countless hours.",
  },
  {
    name: "Sophia Carter",
    username: "@sophiacodes",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&auto=format&fit=crop&q=60",
    text: "Managing bookings has never been this easy.",
  },
  {
    name: "Ethan Walker",
    username: "@ethanwrites",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=60",
    text: "Clean design and smooth experience. Recommended",
  },
  {
    name: "Liam Brooks",
    username: "@liambrooks",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    text: "Our sports club members love using this platform.",
  },
  {
    name: "Emma Watson",
    username: "@emmawatson",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60",
    text: "Very intuitive interface and great performance.",
  },
  {
    name: "Noah Smith",
    username: "@noahsmith",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60",
    text: "Perfect solution for managing sports facilities.",
  },
];

const TestimonialCard = ({ t }) => {
  return (
    <div
      className="p-5 rounded-xl mx-4 w-72 shrink-0 bg-white border border-green-200 
    hover:border-green-400 shadow-sm hover:shadow-lg 
    transition-all duration-300 group relative overflow-hidden"
    >
      {/* green glow background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
      bg-gradient-to-r from-green-200/20 via-green-300/10 to-green-200/20 blur-xl"
      ></div>

      <div className="relative z-10">
        <div className="flex gap-3 items-center">
          <img
            src={t.image}
            alt={t.name}
            className="size-11 rounded-full object-cover"
          />

          <div>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-gray-900">{t.name}</p>

              {/* verified icon */}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.555.72c-.09.07-.19.15-.297.24..."
                  fill="#22c55e"
                />
              </svg>
            </div>

            <span className="text-xs text-gray-500">{t.username}</span>
          </div>
        </div>

        <p className="text-sm pt-4 text-gray-600 leading-relaxed line-clamp-3">
          {t.text}
        </p>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* background glow like other sections */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(162,203,139,0.20) 0%, rgba(199,234,187,0.10) 30%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%]">
        {/* section title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            What Our Members Say
          </h2>
          <p className="text-gray-600 mt-3">
            Real feedback from our sports community
          </p>
        </div>

        {/* first marquee */}
        <Marquee pauseOnHover speed={40} gradient={false}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </Marquee>

        {/* second marquee reverse */}
        <Marquee
          pauseOnHover
          speed={40}
          direction="right"
          gradient={false}
          className="mt-8"
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TestimonialSection;
