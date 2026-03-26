import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CourtsPage = () => {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [slots, setSlots] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const modalRef = useRef(null);
  const courtsPerPage = 8;

  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxiosSecure();

  // Fetch courts
  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const res = await axiosInstance.get("/courts");
        setCourts(res.data || []);
      } catch {
        toast.error("Failed to load courts");
      } finally {
        setLoading(false);
      }
    };
    fetchCourts();
  }, [axiosInstance]);

  // Booking
  const handleBookNow = (court) => {
    if (!user) return navigate("/login");
    setSelectedCourt(court);
    setSlots([]);
    setTimeout(() => modalRef.current?.showModal(), 0);
  };

  const toggleSlot = (slot) => {
    setSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = e.target.date.value;

    if (!slots.length) return toast.error("Select at least one slot");

    try {
      await axiosInstance.post("/bookings", {
        userEmail: user?.email,
        courtId: selectedCourt._id,
        courtName: selectedCourt.type,
        price: selectedCourt.price * slots.length,
        slots,
        date,
      });

      toast.success("Booking request sent 🚀");
      modalRef.current?.close();
      setSlots([]);
      e.target.reset();
    } catch {
      toast.error("Booking failed");
    }
  };

  // Search filter
  const filteredCourts = courts.filter((c) =>
    c.type.toLowerCase().includes(search.toLowerCase()),
  );

  // Pagination
  const indexOfLast = currentPage * courtsPerPage;
  const currentCourts = filteredCourts.slice(
    indexOfLast - courtsPerPage,
    indexOfLast,
  );
  const totalPages = Math.ceil(filteredCourts.length / courtsPerPage);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Soft Glow Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(162, 203, 139, 0.2) 0%, rgba(199, 234, 187, 0.1) 30%, transparent 65%)",
        }}
      />

      {/* HERO */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] pt-[100px] pb-14 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Find Your Court
        </h1>

        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          Book courts quickly and easily with a smooth experience
        </p>

        {/* Search */}
        <div className="mt-10 flex justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="e.g. Badminton"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-5 pr-28 py-3 rounded-xl border border-gray-300 bg-white
              focus:border-[#84B179] focus:ring-2 focus:ring-[#A2CB8B]/40
              outline-none transition"
            />

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-xl
              bg-[#84B179] text-white text-sm font-semibold
              hover:bg-[#6F9F62] transition shadow-sm"
            >
              Search
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          {filteredCourts.length} courts found
        </p>
      </div>

      {/* COURTS */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%] pb-20">
        {/* Loading */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-60 bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filteredCourts.length === 0 && (
          <p className="text-center text-gray-400 py-20">😔 No courts found</p>
        )}

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCourts.map((court) => (
            <div
              key={court._id}
              className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#A2CB8B] transition"
            >
              <div className="relative">
                <img
                  src={court.image}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                <span className="absolute top-3 left-3 bg-white/90 px-3 py-1 text-xs rounded-full font-medium">
                  {court.type}
                </span>

                <div className="absolute bottom-3 right-3 bg-[#84B179] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  ৳{court.price}/hr
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900">
                  {court.name || court.type}
                </h3>

                <p className="text-xs text-gray-500 mt-1">Available today</p>

                <button
                  onClick={() => handleBookNow(court)}
                  className="mt-3 w-full py-2 rounded-lg
                  bg-[#84B179] text-white text-sm font-medium
                  hover:bg-[#6F9F62] transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredCourts.length > courtsPerPage && (
          <div className="flex justify-center mt-14 gap-2 flex-wrap">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  currentPage === i + 1
                    ? "bg-[#84B179] text-white"
                    : "bg-white border border-gray-300 hover:border-[#84B179]"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedCourt && (
        <dialog ref={modalRef} className="modal">
          <div className="modal-box max-w-md rounded-2xl">
            <h3 className="text-xl font-semibold text-center mb-4">
              Book {selectedCourt.type}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="date"
                name="date"
                required
                className="w-full px-4 py-3 border rounded-lg
                focus:border-[#84B179] focus:ring-2 focus:ring-[#A2CB8B]/40"
              />

              <div className="grid grid-cols-2 gap-2">
                {selectedCourt.availableSlots?.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => toggleSlot(slot)}
                    className={`py-2 rounded-lg text-sm ${
                      slots.includes(slot)
                        ? "bg-[#84B179] text-white"
                        : "border border-gray-300 hover:border-[#84B179]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <p className="text-right font-semibold text-[#84B179]">
                Total: ৳{selectedCourt.price * slots.length}
              </p>

              <button className="w-full py-3 rounded-xl bg-[#84B179] text-white font-semibold hover:bg-[#6F9F62] transition">
                Confirm Booking
              </button>
            </form>

            <div className="text-center mt-4">
              <button
                onClick={() => modalRef.current?.close()}
                className="text-gray-400 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default CourtsPage;
