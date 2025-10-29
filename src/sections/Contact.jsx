import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTheme } from "../contexts/ThemeContext";
import TitleHeader from "../components/TitleHeader";
import ResumeDownload from "../components/ResumeDownload";
import { contactMethods } from "../constants";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [notification, setNotification] = useState({
    show: false,
    type: "", // 'success' or 'error'
    message: "",
  });
  const { isDark } = useTheme();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 5000); // Hide after 5 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setForm({ name: "", email: "", message: "" });
      showNotification(
        "success",
        "Message sent successfully! I'll get back to you soon. 🚀"
      );
    } catch (error) {
      console.error("EmailJS Error:", error);
      showNotification(
        "error",
        "Failed to send message. Please try again or contact me directly via email. 😔"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding mb-16">
      {/* Notification Toast */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg backdrop-blur-sm border transition-all duration-300 transform max-w-md ${
            notification.type === "success"
              ? isDark
                ? "bg-green-900/90 border-green-500/50 text-green-100 notification-success"
                : "bg-green-50/90 border-green-200 text-green-800 notification-success"
              : isDark
              ? "bg-red-900/90 border-red-500/50 text-red-100 notification-error"
              : "bg-red-50/90 border-red-200 text-red-800 notification-error"
          } ${
            notification.show
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {notification.type === "success" ? (
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
            <button
              onClick={() =>
                setNotification({ show: false, type: "", message: "" })
              }
              className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* Progress bar for auto-dismiss */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/30 rounded-b-lg overflow-hidden">
            <div
              className={`h-full ${
                notification.type === "success" ? "bg-green-500" : "bg-red-500"
              } animate-[shrink_5s_linear_forwards]`}
              style={{
                animation: "shrink 5s linear forwards",
              }}
            ></div>
          </div>
        </div>
      )}

      <div className="w-full max-w-7xl mx-auto px-5 md:px-10">
        <TitleHeader
          title="Get in Touch – Let's Connect"
          sub="💬 Have questions or ideas? Let's talk! 🚀"
        />

        {/* Resume Download Section */}
        <div className="mt-8 text-center">
          <div
            className={`inline-flex flex-col sm:flex-row items-center gap-4 p-6 backdrop-blur-sm border rounded-xl ${
              isDark
                ? "bg-gray-900/40 border-gray-700/50"
                : "bg-white/80 border-gray-200/50 shadow-lg"
            }`}
          >
            <div className="text-center sm:text-left">
              <h3
                className={`text-lg font-semibold mb-1 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Interested in my background?
              </h3>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Download my resume for detailed experience and qualifications
              </p>
            </div>
            <ResumeDownload />
          </div>
        </div>

        {/* Interactive Contact Methods */}
        <div className="mt-16">
          <h3
            className={`text-2xl font-bold text-center mb-8 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Choose Your Preferred Way to Connect
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {contactMethods.map((method) => (
              <div
                key={method.id}
                onClick={method.action}
                className={`group relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                  isDark
                    ? "bg-gray-900/60 border border-gray-700/50 hover:border-gray-600/50"
                    : "bg-white/80 border border-gray-200/50 hover:border-gray-300/50 shadow-lg"
                }`}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-2xl shadow-lg`}
                      >
                        {method.icon}
                      </div>
                      <div>
                        <h4
                          className={`text-xl font-bold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {method.title}
                        </h4>
                        <p
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {method.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <svg
                        className={`w-6 h-6 ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </div>

                  <div
                    className={`text-lg font-mono mb-3 ${
                      isDark ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    {method.value}
                  </div>

                  {/* Chunked description with visual elements */}
                  <div className={`text-sm space-y-2 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}>
                    <p className="leading-relaxed">
                      {method.description}
                    </p>
                    
                    {/* Visual indicators */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium">Active</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs font-medium">Fast Response</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16">
          <div
            className={`max-w-2xl mx-auto p-8 rounded-2xl backdrop-blur-sm ${
              isDark
                ? "bg-gray-900/60 border border-gray-700/50"
                : "bg-white/80 border border-gray-200/50 shadow-xl"
            }`}
          >
            <div className="text-center mb-8">
              <h3
                className={`text-2xl font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Send Me a Message
              </h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Prefer to write? Fill out the form below and I'll get back to
                you soon!
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your good name?"
                    className={`w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      isDark
                        ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can I help you? Tell me about your project or question..."
                  rows="5"
                  className={`w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                    isDark
                      ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`p-6 rounded-xl ${
                isDark ? "bg-gray-900/40" : "bg-white/60"
              }`}
            >
              <div className="text-3xl mb-2">⚡</div>
              <div
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                24h
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Average Response Time
              </div>
            </div>

            <div
              className={`p-6 rounded-xl ${
                isDark ? "bg-gray-900/40" : "bg-white/60"
              }`}
            >
              <div className="text-3xl mb-2">🌍</div>
              <div
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Remote
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Available Worldwide
              </div>
            </div>

            <div
              className={`p-6 rounded-xl ${
                isDark ? "bg-gray-900/40" : "bg-white/60"
              }`}
            >
              <div className="text-3xl mb-2">💼</div>
              <div
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Open
              </div>
              <div
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                For New Opportunities
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
