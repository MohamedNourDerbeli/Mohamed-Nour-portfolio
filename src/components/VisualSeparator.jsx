import { useTheme } from "../contexts/ThemeContext";

const VisualSeparator = ({ className = "", type = "gradient" }) => {
  const { isDark } = useTheme();

  if (type === "dots") {
    return (
      <div className={`flex items-center justify-center gap-2 my-6 ${className}`}>
        <div className={`w-2 h-2 rounded-full ${isDark ? "bg-blue-400" : "bg-blue-600"}`}></div>
        <div className={`w-2 h-2 rounded-full ${isDark ? "bg-purple-400" : "bg-purple-600"}`}></div>
        <div className={`w-2 h-2 rounded-full ${isDark ? "bg-pink-400" : "bg-pink-600"}`}></div>
      </div>
    );
  }

  if (type === "line") {
    return (
      <div className={`h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8 ${
        isDark ? "via-gray-700" : "via-gray-300"
      } ${className}`}></div>
    );
  }

  // Default gradient type
  return (
    <div className={`visual-separator ${className}`}></div>
  );
};

export default VisualSeparator;