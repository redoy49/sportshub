import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaCalendarAlt,
  FaMoneyBill,
  FaUsers,
  FaCog,
  FaBullhorn,
  FaCheck,
  FaCheckCircle,
} from "react-icons/fa";
import useUserRole from "../hooks/useRole";
import athletedHub from "../assets/athletesHub.png";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  // ✅ Clean nav style
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
      isActive
        ? "bg-[#E8F5BD]/70 text-[#6F9F62]"
        : "text-gray-600 hover:bg-[#E8F5BD]/40 hover:text-gray-900"
    }`;

  return (
    <div className="drawer lg:drawer-open bg-[#FAFBF8]">

      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content flex flex-col">

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b bg-white">
          <label htmlFor="dashboard-drawer" className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <Link to="/">
            <img src={athletedHub} alt="Logo" className="h-7" />
          </Link>
        </div>

        {/* Page Content */}
        <main className="p-5 min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay" />

        <aside className="w-72 min-h-full bg-white border-r border-gray-200 p-5 flex flex-col">

          {/* Logo */}
          <Link to="/" className="flex items-center mb-8">
            <img src={athletedHub} alt="Logo" className="h-10" />
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">

            <NavLink to="/dashboard" end className={navLinkClass}>
              <FaHome size={18} className="text-[#84B179]" />
              Dashboard Home
            </NavLink>

            {/* USER */}
            {!roleLoading && role === "user" && (
              <>
                <NavLink to="/dashboard/pending-bookings" className={navLinkClass}>
                  <FaCalendarAlt size={18} className="text-[#84B179]" />
                  Pending Bookings
                </NavLink>

                <NavLink to="/dashboard/announcements" className={navLinkClass}>
                  <FaBullhorn size={18} className="text-[#84B179]" />
                  Announcements
                </NavLink>
              </>
            )}

            {/* MEMBER */}
            {!roleLoading && role === "member" && (
              <>
                <NavLink to="/dashboard/pending-bookings" className={navLinkClass}>
                  <FaCalendarAlt size={18} className="text-[#84B179]" />
                  Pending Bookings
                </NavLink>

                <NavLink to="/dashboard/approved-bookings" className={navLinkClass}>
                  <FaCheck size={18} className="text-[#84B179]" />
                  Approved Bookings
                </NavLink>

                <NavLink to="/dashboard/confirmed-bookings" className={navLinkClass}>
                  <FaCheckCircle size={18} className="text-[#84B179]" />
                  Confirmed Bookings
                </NavLink>

                <NavLink to="/dashboard/payment-history" className={navLinkClass}>
                  <FaMoneyBill size={18} className="text-[#84B179]" />
                  Payment History
                </NavLink>

                <NavLink to="/dashboard/announcements" className={navLinkClass}>
                  <FaBullhorn size={18} className="text-[#84B179]" />
                  Announcements
                </NavLink>
              </>
            )}

            {/* ADMIN */}
            {!roleLoading && role === "admin" && (
              <>
                <NavLink to="/dashboard/manage-bookings-approval" className={navLinkClass}>
                  <FaCheck size={18} className="text-[#84B179]" />
                  Manage Bookings Approval
                </NavLink>

                <NavLink to="/dashboard/manage-members" className={navLinkClass}>
                  <FaUsers size={18} className="text-[#84B179]" />
                  Manage Members
                </NavLink>

                <NavLink to="/dashboard/manage-users" className={navLinkClass}>
                  <FaUsers size={18} className="text-[#84B179]" />
                  All Users
                </NavLink>

                <NavLink to="/dashboard/manage-courts" className={navLinkClass}>
                  <FaCog size={18} className="text-[#84B179]" />
                  Manage Courts
                </NavLink>

                <NavLink to="/dashboard/manage-bookings" className={navLinkClass}>
                  <FaCalendarAlt size={18} className="text-[#84B179]" />
                  Manage Bookings
                </NavLink>

                <NavLink to="/dashboard/manage-coupons" className={navLinkClass}>
                  <FaMoneyBill size={18} className="text-[#84B179]" />
                  Manage Coupons
                </NavLink>

                <NavLink to="/dashboard/make-announcements" className={navLinkClass}>
                  <FaBullhorn size={18} className="text-[#84B179]" />
                  Make Announcement
                </NavLink>
              </>
            )}

          </nav>

          {/* Bottom (optional future user info) */}
          <div className="pt-6 border-t text-xs text-gray-400">
            © Athlete Hub
          </div>

        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;