import React from "react";
import SectionTitle from "../../components/shared/SectionTitle";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [23.9322, 90.7151];

const LocationSection = () => {
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      
      {/* glow background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 35%, rgba(162,203,139,0.20) 0%, rgba(199,234,187,0.10) 30%, transparent 65%)`,
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%]">

        <SectionTitle
          title="Our Location"
          subtitle="Find us on the map"
        />

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 mt-12 items-stretch">

          {/* MAP */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 h-[420px]">

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
                <Popup>Narsingdi, Bangladesh</Popup>
              </Marker>

            </MapContainer>

          </div>

          {/* INFO CARD */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col justify-center h-[420px]">

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Narsingdi, Bangladesh
            </h3>

            <div className="space-y-2 text-gray-600 text-sm">

              <p>Phone: +880 1234 567 890</p>
              <p>Email: info@sportsclub.com</p>

            </div>

            <button
              onClick={() =>
                window.open(
                  "https://maps.google.com/?q=23.9322,90.7151",
                  "_blank"
                )
              }
              className="mt-6 px-5 py-3 rounded-lg bg-[#84B179] hover:bg-[#6fa463] text-white text-sm transition"
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