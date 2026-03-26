import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";

const fetchMembers = async (axiosSecure) => {
  const res = await axiosSecure.get("/members");
  return res.data;
};

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const {
    data: members = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["members"],
    queryFn: () => fetchMembers(axiosSecure),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/members/${id}`);
    },
    onSuccess: () => {
      Swal.fire({
        title: "Deleted",
        text: "Member has been removed",
        icon: "success",
        confirmButtonColor: "#84B179",
      });
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: () => toast.error("Failed to delete member"),
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete member?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#84B179",
      cancelButtonColor: "#d1d5db",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const filteredMembers = members.filter((member) =>
    `${member.name} ${member.email}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="max-w-full mx-auto border border-gray-200 px-5 py-6 rounded-xl bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Manage Members</h2>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#84B179]/30 focus:border-[#84B179]"
          />

          <FaSearch
            size={14}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : isError ? (
        <p className="text-center text-red-500">Error: {error.message}</p>
      ) : filteredMembers.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No members found</p>
      ) : (
        <div className="overflow-x-auto rounded-xl">
          <table className="table w-full">
            <thead className="bg-[#E8F5BD]/60 text-sm font-semibold text-gray-700">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Joined</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.map((member, index) => (
                <tr
                  key={member._id}
                  className="hover:bg-[#E8F5BD]/30 transition"
                >
                  <td className="text-gray-500">{index + 1}</td>

                  <td className="font-medium text-gray-800">{member.name}</td>

                  <td className="text-gray-600">{member.email}</td>

                  <td className="text-gray-500">
                    {new Date(member.createdAt).toLocaleDateString()}
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[#84B179] hover:bg-[#6F9F62] transition"
                    >
                      {deleteMutation.isPending ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
