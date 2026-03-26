import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaBullhorn } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";

const ManageAnnouncements = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [editing, setEditing] = useState(null);

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  const { mutate: saveAnnouncement } = useMutation({
    mutationFn: async (announcement) => {
      if (editing) {
        return await axiosSecure.patch(
          `/announcements/${editing._id}`,
          announcement,
        );
      } else {
        return await axiosSecure.post("/announcements", announcement);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["announcements"]);
      Swal.fire(
        "Success",
        `Announcement ${editing ? "updated" : "added"} successfully`,
        "success",
      );
      reset();
      setEditing(null);
    },
  });

  const { mutate: deleteAnnouncement } = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/announcements/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["announcements"]);
      Swal.fire("Deleted", "Announcement deleted successfully", "success");
    },
  });

  const onSubmit = (data) => {
    saveAnnouncement({ text: data.text.trim() });
  };

  const handleEdit = (announcement) => {
    setEditing(announcement);
    setValue("text", announcement.text);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this announcement?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) deleteAnnouncement(id);
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto mt-16 lg:mt-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <FaBullhorn className="text-[#84B179]" />
          Club Announcements
        </h2>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <FaBullhorn className="text-[#84B179]" />
          {editing ? "Update Announcement" : "Add New Announcement"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row gap-3"
        >
          <input
            {...register("text", { required: true })}
            placeholder="Announcement text..."
            className="flex-1 bg-white border border-gray-300 text-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#84B179]/30 focus:border-[#84B179]"
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium rounded-full bg-[#84B179] text-white hover:bg-[#6F9F62] transition"
          >
            {editing ? "Update Announcement" : "Add Announcement"}
          </button>
        </form>
      </div>

      {/* Announcements Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <LoadingSpinner />
          </div>
        ) : announcements.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No announcements found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-[#E8F5BD]/40 text-gray-700 text-sm font-medium">
                <tr>
                  <th>#</th>
                  <th>Announcement</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((a, idx) => (
                  <tr key={a._id} className="hover:bg-[#E8F5BD]/30 transition">
                    <td className="text-gray-500">{idx + 1}</td>
                    <td className="text-gray-700 font-medium">{a.text}</td>
                    <td className="flex gap-2 justify-center py-2">
                      {/* Edit Button */}
                      <button
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#84B179] text-white hover:bg-[#6F9F62] transition flex items-center justify-center"
                        onClick={() => handleEdit(a)}
                        title="Edit Announcement"
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 576 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
                        </svg>
                      </button>

                      {/* Delete Button */}
                      <button
                        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition flex items-center justify-center"
                        onClick={() => handleDelete(a._id)}
                        title="Delete Announcement"
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 448 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                        </svg>
                      </button>
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

export default ManageAnnouncements;
