import React from "react";
import { Link } from "react-router";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Club Management",
    excerpt:
      "Discover how digital tools are transforming the way clubs operate and engage members.",
    image:
      "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?semt=ais_hybrid&w=740&q=80",
    date: "August 18, 2025",
  },
  {
    id: 2,
    title: "Top 5 Benefits of Booking Courts Online",
    excerpt:
      "Save time, reduce conflicts, and enjoy a seamless booking experience with online tools.",
    image:
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=900&q=80",
    date: "August 10, 2025",
  },
  {
    id: 3,
    title: "Engaging Your Club Members",
    excerpt:
      "From announcements to events, learn strategies to keep your community active and connected.",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
    date: "August 05, 2025",
  },
  {
    id: 4,
    title: "How Sports Communities Grow Faster",
    excerpt:
      "Learn how modern sports clubs build strong communities and increase participation.",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
    date: "July 30, 2025",
  },
];

const BlogSection = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">

      {/* background glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(162,203,139,0.20) 0%, rgba(199,234,187,0.10) 30%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-5 lg:px-8 xl:px-[8%]">

        {/* Section Title */}
        <div className="text-center mb-16">

          <span className="inline-block text-sm font-semibold text-[#84B179] bg-[#E8F5BD]/50 px-3 py-1 rounded-full">
            Insights & Articles
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
            Latest Blogs
          </h2>

          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Insights and tips to help you get the most out of your club.
          </p>

          <div className="mt-4 w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-[#84B179] to-[#A2CB8B]" />

        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group rounded-xl p-4 hover:bg-[#F8FFF5] transition"
            >

              {/* image */}
              <div className="aspect-[16/10] overflow-hidden rounded-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* content */}
              <div className="mt-5">

                <p className="text-sm text-gray-500">
                  {post.date}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-gray-900 leading-snug group-hover:text-[#84B179] transition">
                  {post.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* read more */}
                <p className="mt-4 inline-flex items-center gap-x-1 text-sm font-semibold text-[#84B179]">
                  Read article
                  <svg
                    className="size-4 transition group-hover:translate-x-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </p>

              </div>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
};

export default BlogSection;