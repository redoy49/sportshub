// import React from "react";
// import { Outlet } from "react-router";
// import Navbar from "../components/shared/Navbar";
// import Footer from "../components/shared/Footer";

// const AuthLayout = () => {
//   return (
//     <div className="min-h-screen flex flex-col relative overflow-hidden">

//       <Navbar />

//       {/* Soft Background Gradient */}
//       <div
//         className="absolute inset-0 -z-10"
//         style={{
//           background:
//             "linear-gradient(135deg,#f0fdf4 0%,#ecfdf5 35%,#f8fafc 70%,#f0fdf4 100%)",
//         }}
//       />

//       {/* Gradient blobs */}
//       <div className="absolute top-[-120px] left-[-120px] w-[380px] h-[380px] bg-green-300/40 blur-3xl rounded-full -z-10"></div>

//       <div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-emerald-300/40 blur-3xl rounded-full -z-10"></div>

//       {/* Auth Content */}
//       <section className="flex-grow flex items-center justify-center px-4 pt-24 pb-16">
//         <div className="w-full max-w-[480px] bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-xl p-8 md:p-10">
//           <Outlet />
//         </div>
//       </section>

//       <Footer />

//     </div>
//   );
// };

// export default AuthLayout;