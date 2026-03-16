import React, { useState } from "react";

const faqData = [
  {
    question: "How do I update my billing information?",
    answer:
      "Log in to your account and go to the billing page. From there you can update payment methods or edit your billing details.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "Go to account settings and choose the delete account option. Our team will confirm your request shortly.",
  },
  {
    question: "How do I join a group or community?",
    answer:
      "Navigate to the community section from your dashboard and select the group you'd like to join.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can submit a support request using the form below and our team will respond within 24 hours.",
  },
  {
    question: "Which is better short term or long term?",
    answer:
      "Long term memberships usually offer better pricing while short term provides more flexibility.",
  },
  {
    question: "How do I change my email address?",
    answer:
      "Go to your profile settings and update your email address inside the account section.",
  },
];

const SupportFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      
      {/* Green Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(162,203,139,0.25),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(199,234,187,0.25),transparent_40%)]"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-[8%]">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Find answers to common questions about bookings, memberships, and
            account management.
          </p>
        </div>

        {/* FAQ */}
        <div className="space-y-4 mb-20">

          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300 ${
                activeIndex === index
                  ? "bg-[#F3F8F1] border-[#A2CB8B]"
                  : "bg-white border-gray-200 hover:border-[#A2CB8B] hover:shadow-sm"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="font-medium text-gray-900">
                  {faq.question}
                </span>

                <span className="text-[#84B179] text-xl font-bold">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              {activeIndex === index && (
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact + Image */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Contact Form */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              In what way can we help?
            </h3>

            <p className="text-gray-500 mb-6">
              Feel free to reach out to us with your inquiries.
            </p>

            <form className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#84B179] focus:outline-none"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#84B179] focus:outline-none"
                />

              </div>

              <textarea
                rows="5"
                placeholder="Write your question..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#84B179] focus:outline-none"
              ></textarea>

              <button
                type="submit"
                className="bg-[#84B179] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#6da863] transition"
              >
                Submit Now
              </button>

            </form>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <img
              src="https://cdn.vectorstock.com/i/750p/08/81/graphic-cartoon-character-faq-vector-37100881.avif"
              alt="FAQ Illustration"
              className="w-full max-w-md mx-auto"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default SupportFAQ;