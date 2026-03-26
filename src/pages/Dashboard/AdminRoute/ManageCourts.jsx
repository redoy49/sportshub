import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ManageCourts = () => {
  const axiosInstance = useAxiosSecure();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [editCourt, setEditCourt] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    image: "",
  });

  const { data: courts = [], isLoading, isError } = useQuery({
    queryKey: ["courts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/courts");
      return res.data;
    },
  });

  const openAddModal = () => {
    setEditCourt(null);
    setFormData({ name: "", type: "", price: "", image: "" });
    setShowModal(true);
  };

  const openEditModal = (court) => {
    setEditCourt(court);
    setFormData({
      name: court.name,
      type: court.type,
      price: court.price,
      image: court.image,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/courts/${id}`);
        toast.success("Court deleted");
        queryClient.invalidateQueries(["courts"]);
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      type: formData.type,
      price: parseFloat(formData.price),
      image: formData.image,
    };

    try {
      if (editCourt) {
        await axiosInstance.patch(`/courts/${editCourt._id}`, payload);
        toast.success("Court updated");
      } else {
        await axiosInstance.post("/courts", payload);
        toast.success("New court added");
      }
      queryClient.invalidateQueries(["courts"]);
      setShowModal(false);
    } catch {
      toast.error("Action failed");
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Manage Courts</h2>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#84B179] text-white text-sm font-medium hover:bg-[#6F9F62] transition"
        >
          <FaPlus /> Add Court
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        ) : isError ? (
          <p className="text-red-500 text-center py-10">Failed to load courts</p>
        ) : courts.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No courts found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-[#E8F5BD]/40 text-gray-700 text-sm font-medium">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Price</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courts.map((court) => (
                  <tr
                    key={court._id}
                    className="hover:bg-[#E8F5BD]/30 transition"
                  >
                    <td>
                      <img
                        src={court.image}
                        alt={court.name}
                        className="w-24 h-16 rounded-md object-cover"
                      />
                    </td>
                    <td className="text-gray-700 font-medium">{court.name}</td>
                    <td className="text-gray-600">{court.type}</td>
                    <td className="text-[#84B179] font-semibold">${court.price}</td>
                    <td className="flex gap-2 justify-center py-2">
                      <button
                        onClick={() => openEditModal(court)}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#84B179] text-white hover:bg-[#6F9F62] transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(court._id)}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg relative">
            <h3 className="text-lg font-semibold mb-4">
              {editCourt ? "Update Court" : "Add New Court"}
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                required
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84B179]/40 focus:border-[#84B179]"
              />
              <input
                type="text"
                placeholder="Type"
                value={formData.type}
                required
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84B179]/40 focus:border-[#84B179]"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                required
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84B179]/40 focus:border-[#84B179]"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                required
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#84B179]/40 focus:border-[#84B179]"
              />

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#84B179] text-white hover:bg-[#6F9F62] transition"
                >
                  {editCourt ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourts;