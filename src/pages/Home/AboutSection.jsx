import React from "react";
import about from "../../assets/about.avif";
import SectionTitle from "../../components/shared/SectionTitle";

const AboutSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">

      {/* soft background glow (match hero) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(
              circle at 30% 40%,
              rgba(162,203,139,0.25) 0%,
              rgba(199,234,187,0.15) 30%,
              transparent 65%
            )
          `,
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] py-14 lg:py-24 flex flex-col-reverse lg:flex-row items-center gap-14">

        {/* Image */}
        <div className="flex-1 w-full">
          <div className="relative group">

            {/* image glow */}
            <div className="absolute -inset-3 bg-gradient-to-r from-[#A2CB8B] via-[#C7EABB] to-[#84B179] opacity-30 blur-2xl rounded-3xl"></div>

            <img
              src={about}
              alt="Our sports club facility"
              className="relative w-full h-auto rounded-3xl shadow-xl border border-white/40 object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 space-y-6 text-left">

          {/* badge */}
          <span className="inline-block text-sm font-semibold text-[#84B179] bg-[#E8F5BD]/50 px-3 py-1 rounded-full">
            Our Story
          </span>

          <SectionTitle
            title="Discover the Heart of Our Club"
            subtitle="10+ Years of Empowering the Community Through Sports"
          />

          {/* accent line */}
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[#84B179] to-[#A2CB8B]"></div>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
            Since day one, our mission has been to create a welcoming space for
            athletes of all levels. Whether you're a beginner or a seasoned
            competitor, our club is built to elevate your game and build
            lifelong connections.
          </p>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
            With professional coaching, organized tournaments, and modern
            facilities, we’re more than just a club—we’re a vibrant community
            united by a passion for sports.
          </p>

          {/* small stats */}
          <div className="flex gap-10 pt-4">

            <div>
              <h3 className="text-2xl font-bold text-gray-900">10+</h3>
              <p className="text-sm text-gray-500">Years Experience</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">500+</h3>
              <p className="text-sm text-gray-500">Active Members</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900">15+</h3>
              <p className="text-sm text-gray-500">Courts Available</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;