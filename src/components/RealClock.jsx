import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook
import SEGMENT_PATHS from "../ui/segment_paths"

const DIGIT_MAP = {
  0: [0, 2, 3, 4, 5, 6],
  1: [3, 5],
  2: [0, 3, 1, 6, 4],
  3: [0, 3, 1, 5, 4],
  4: [2, 1, 3, 5],
  5: [0, 2, 1, 5, 4],
  6: [0, 2, 1, 6, 4, 5],
  7: [0, 3, 5],
  8: [0, 1, 2, 3, 4, 5, 6],
  9: [0, 1, 2, 3, 4, 5]
};

const SvgDigit = ({ value }) => {
  const activeSegments = DIGIT_MAP[value] || [];

  return (
    <svg width="29" height="52" viewBox="0 0 29 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {SEGMENT_PATHS.map((pathData, index) => {
        const isActive = activeSegments.includes(index);
        return (
          <path 
            key={index} 
            d={pathData} 
            className={`transition-colors duration-100 ${isActive ? 'fill-[#2c4c4e] dark:fill-[#39ff14]' : 'fill-black/5 dark:fill-white/5'}`} 
          />
        );
      })}
    </svg>
  );
};

const RealClock = () => {
    const [time, setTime] = useState(new Date());
    const navigate = useNavigate(); // 2. Initialize the navigation hook
  
    useEffect(() => {
      const timer = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);
  
    const h = String(time.getHours()).padStart(2, '0');
    const m = String(time.getMinutes()).padStart(2, '0');
  
    return (
      // 3. Add onClick handler and cursor-pointer utility class
      <div 
        onClick={() => navigate('/clock')} 
        className="glass-card hover-pop py-5 flex justify-center items-center w-[60%] h-30 bg-[#e8eae9] dark:bg-[#0a0a0a] rounded-[2rem] border-[6px] border-[#f4f5f5] dark:border-[#1a1a1a] shadow-sm cursor-pointer"
      >
        <div className="flex items-center justify-center gap-2 pointer-events-none">
          <SvgDigit value={parseInt(h[0], 10)} />
          <SvgDigit value={parseInt(h[1], 10)} />
          <div className="flex flex-col justify-center gap-2 px-1">
            <div className="bg-[#2c4c4e] dark:bg-[#39ff14] h-1.5 w-1.5 rounded-sm"></div>
            <div className="bg-[#2c4c4e] dark:bg-[#39ff14] h-1.5 w-1.5 rounded-sm"></div>
          </div>
          <SvgDigit value={parseInt(m[0], 10)} />
          <SvgDigit value={parseInt(m[1], 10)} />
        </div>
      </div>
    );
  };
  
  export default RealClock;