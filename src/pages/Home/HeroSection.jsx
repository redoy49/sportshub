import React, { useRef } from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

import badminton from "../../assets/badminton.jpg";
import badminton2 from "../../assets/badminton2.jpg";
import basketball from "../../assets/basketball.jpg";
import tennis from "../../assets/tennis.png";
import tennis2 from "../../assets/tennis2.jpg";

const HeroSection = () => {
  const images = [badminton, badminton2, basketball, tennis, tennis2];

  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * -8;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div className="w-full relative overflow-hidden bg-white">
      
      {/* Center Gradient Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              circle at 50% 45%,
              rgba(162,203,139,0.35) 0%,
              rgba(199,234,187,0.25) 25%,
              rgba(232,245,189,0.12) 40%,
              transparent 70%
            )
          `,
        }}
      />

      {/* Soft Grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 45%, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 45%, black 40%, transparent 85%)",
        }}
      />

      {/* Hero */}
      <section className="relative z-10 pt-24 lg:pt-28 xl:pl-6 min-h-[85vh]">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] py-10 lg:py-16">

          {/* Text */}
          <div className="relative text-center lg:text-left flex-1 space-y-6 mt-6 lg:mt-0">

            {/* Glow */}
            <div className="absolute -top-12 -left-10 w-[420px] h-[420px] bg-gradient-to-r from-[#A2CB8B] via-[#C7EABB] to-[#84B179] opacity-30 blur-3xl rounded-full animate-pulse"></div>

            <h1 className="relative max-w-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Manage Your{" "}
              <span className="bg-gradient-to-r from-[#84B179] to-[#A2CB8B] bg-clip-text text-transparent">
                Club
              </span>{" "}
              Effortlessly
            </h1>

            <p className="relative text-gray-600 max-w-lg">
              Book courts, manage memberships, and stay updated with club
              announcements all in one place.
            </p>

            <div className="relative flex justify-center lg:justify-start gap-4">
              <Link
                to="/courts"
                className="rounded-full px-8 py-3 font-semibold bg-[#84B179] text-white shadow-md hover:shadow-lg hover:scale-105 transition duration-300"
              >
                View Courts
              </Link>

              <Link
                to="/register"
                className="rounded-full px-8 py-3 font-semibold text-[#84B179] border border-[#84B179] hover:bg-[#84B179] hover:text-white shadow-md hover:shadow-lg transition duration-300"
              >
                Join Now
              </Link>
            </div>
          </div>

          {/* 3D Swiper Card */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="flex-1 w-full flex justify-center lg:justify-end mt-10 lg:mt-0 transition-transform duration-300"
          >
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              className="max-w-sm lg:max-w-md"
            >
              {images.map((img, i) => (
                <SwiperSlide
                  key={i}
                  className="bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl shadow-2xl border border-white/40"
                >
                  <img
                    src={img}
                    alt={`Slide ${i + 1}`}
                    className="w-full h-[360px] object-cover rounded-2xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HeroSection;