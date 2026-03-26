import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">All Users</h2>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#84B179]/40 focus:border-[#84B179]"
          />
          <FaSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        ) : isError ? (
          <p className="text-red-500 text-center py-10">
            Error: {error.message}
          </p>
        ) : filteredUsers.length === 0 ? (
          <div className="py-10 text-center text-gray-500">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* Head */}
              <thead className="bg-[#E8F5BD]/40 text-gray-700 text-sm">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Last Login</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-[#E8F5BD]/30 transition"
                  >
                    <td className="text-gray-500">{index + 1}</td>
                    <td className="text-gray-700 font-medium">{user.name}</td>
                    <td className="text-gray-600">{user.email}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          user.role === "admin"
                            ? "bg-[#E8F5BD]/70 text-[#6F9F62]"
                            : user.role === "member"
                              ? "bg-[#E8F5BD]/50 text-[#6F9F62]"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="text-gray-600 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-gray-600 text-sm">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
