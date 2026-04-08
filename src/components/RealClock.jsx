import { useState, useEffect } from 'react';
// ==========================================
// 2. Real Clock Component (3/5 Width)
// ==========================================
const RealClock = () => {
    const [time, setTime] = useState(new Date());
  
    useEffect(() => {
      const timer = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);
  
    return (
      // w-[60%] ensures it is exactly 3/5 the width of its container (the right column)
      <div className="glass-card py-5 flex justify-center items-center w-[60%] h-30">
        <span className="text-4xl font-mono text-gray-600 tracking-[0.15em] font-semibold opacity-80">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
        </span>
      </div>
    );
  };

export default RealClock;