import React from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [23.9322, 90.7151];

const LocationSection = () => {
  return (
    <section className="relative bg-white py-24 overflow-hidden">

      {/* Soft Glow Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(162,203,139,0.20) 0%, rgba(199,234,187,0.10) 30%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%]">

        <SectionTitle
          title="Visit Our Club"
          subtitle="Find us and plan your next game with confidence"
        />

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 mt-14 items-stretch">

          {/* MAP */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 h-[440px]">
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution="© OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={position}>
                <Popup>Sports Club - Narsingdi</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* INFO CARD */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 p-8 flex flex-col justify-between h-[440px]">

            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Narsingdi Sports Club
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                A modern sports facility offering premium courts for badminton,
                tennis, and more. Book easily and enjoy a seamless experience.
              </p>

              {/* Divider */}
              <div className="my-6 border-t border-gray-200" />

              {/* Info List */}
              <div className="space-y-4 text-sm text-gray-700">

                <div>
                  <p className="text-gray-500 text-xs">Location</p>
                  <p>Narsingdi, Dhaka, Bangladesh</p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">Contact</p>
                  <p>+880 1234 567 890</p>
                  <p>info@sportsclub.com</p>
                </div>

                <div>
                  <p className="text-gray-500 text-xs">Opening Hours</p>
                  <p>Daily · 6:00 AM – 11:00 PM</p>
                </div>

              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() =>
                window.open(
                  "https://maps.google.com/?q=23.9322,90.7151",
                  "_blank"
                )
              }
              className="mt-6 w-full px-5 py-3 rounded-xl
              bg-[#84B179] text-white font-semibold
              hover:bg-[#6F9F62] transition"
            >
              Get Directions
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationSection;