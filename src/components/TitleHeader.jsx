import { useTheme } from '../contexts/ThemeContext';

const TitleHeader = ({ title, sub }) => {
  const { isDark } = useTheme();
  
  return (
    <div className="flex flex-col items-center gap-5">
      <div className={`hero-badge ${
        isDark ? 'bg-black-200 text-white' : 'bg-gray-200 text-gray-800'
      }`}>
        <p>{sub}</p>
      </div>
      <div>
        <h1 className={`font-semibold md:text-5xl text-3xl text-center ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h1>
      </div>
    </div>
  );
};

export default TitleHeader;
