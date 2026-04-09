import { useState, useEffect, useRef } from "react";
import SEGMENT_PATHS from "../ui/segment_paths";

// --- Helper Components ---

// Map digits to SVG segment indices
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
  9: [0, 1, 2, 3, 4, 5],
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
            className={`transition-colors duration-100 ${
              isActive ? "fill-[#35bfab] dark:fill-[#39ff14]" : "fill-black/5 dark:fill-white/5"
            }`}
          />
        );
      })}
    </svg>
  );
};

const Colon = () => (
  <div className="flex flex-col justify-center gap-2 px-1 mx-1">
    <div className="bg-[#35bfab] dark:bg-[#39ff14] h-1.5 w-1.5 rounded-sm shadow-[0_0_8px_rgba(53,191,171,0.5)] dark:shadow-[0_0_8px_rgba(57,255,20,0.6)]"></div>
    <div className="bg-[#35bfab] dark:bg-[#39ff14] h-1.5 w-1.5 rounded-sm shadow-[0_0_8px_rgba(53,191,171,0.5)] dark:shadow-[0_0_8px_rgba(57,255,20,0.6)]"></div>
  </div>
);

// --- Main Component ---

const ClockView = ({ lang = "CN" }) => {
  const [activeTab, setActiveTab] = useState("stopwatch"); // 'stopwatch' | 'timer'

  // --- Stopwatch State ---
  const [swTime, setSwTime] = useState(0); // in centiseconds (1/100th sec)
  const [swIsRunning, setSwIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const swRequestRef = useRef(null);
  const swStartTimeRef = useRef(null);

  // --- Timer State ---
  const [tHours, setTHours] = useState(0);
  const [tMinutes, setTMinutes] = useState(0);
  const [tSeconds, setTSeconds] = useState(0);
  const [tIsRunning, setTIsRunning] = useState(false);
  const [tRemainingMs, setTRemainingMs] = useState(0);
  const timerIntervalRef = useRef(null);

  // --- Stopwatch Logic ---
  const updateStopwatch = (timeNow) => {
    if (!swStartTimeRef.current) swStartTimeRef.current = timeNow - swTime * 10;
    const elapsedMs = timeNow - swStartTimeRef.current;
    setSwTime(Math.floor(elapsedMs / 10)); // Convert ms to cs
    swRequestRef.current = requestAnimationFrame(updateStopwatch);
  };

  const toggleStopwatch = () => {
    if (swIsRunning) {
      cancelAnimationFrame(swRequestRef.current);
      swStartTimeRef.current = null;
    } else {
      swRequestRef.current = requestAnimationFrame(updateStopwatch);
    }
    setSwIsRunning(!swIsRunning);
  };

  const resetStopwatch = () => {
    cancelAnimationFrame(swRequestRef.current);
    setSwIsRunning(false);
    setSwTime(0);
    setLaps([]);
    swStartTimeRef.current = null;
  };

  const recordLap = () => {
    if (swIsRunning) {
      setLaps((prev) => [swTime, ...prev]);
    }
  };

  // --- Timer Logic ---
  const startTimer = () => {
    if (!tIsRunning && tRemainingMs === 0) {
      // Initialize from inputs
      const totalMs = (tHours * 3600 + tMinutes * 60 + tSeconds) * 1000;
      if (totalMs <= 0) return;
      setTRemainingMs(totalMs);
    }
    
    setTIsRunning(true);
    timerIntervalRef.current = setInterval(() => {
      setTRemainingMs((prev) => {
        if (prev <= 100) {
          clearInterval(timerIntervalRef.current);
          setTIsRunning(false);
          // Optional: Play a sound here
          return 0;
        }
        return prev - 100; // update every 100ms for smoothness
      });
    }, 100);
  };

  const pauseTimer = () => {
    clearInterval(timerIntervalRef.current);
    setTIsRunning(false);
  };

  const resetTimer = () => {
    clearInterval(timerIntervalRef.current);
    setTIsRunning(false);
    setTRemainingMs(0);
  };

  // Cleanups
  useEffect(() => {
    return () => {
      cancelAnimationFrame(swRequestRef.current);
      clearInterval(timerIntervalRef.current);
    };
  }, []);

  // --- Formatting Helpers ---
  const formatSwTime = (cs) => {
    const mins = String(Math.floor(cs / 6000)).padStart(2, "0");
    const secs = String(Math.floor((cs / 100) % 60)).padStart(2, "0");
    const centis = String(cs % 100).padStart(2, "0");
    return { mins, secs, centis };
  };

  const currentSwDisplay = formatSwTime(swTime);

  return (
    <div className="w-full max-w-[600px] mx-auto space-y-8 mt-24 px-4 z-20 relative">
      
      {/* --- Toggle Tabs --- */}
      <div className="glass-card relative flex gap-4 rounded-xl p-2 bg-white/50 dark:bg-black/40 shadow-sm border border-white/60 dark:border-[#39ff14]/30">
        <button
          onClick={() => setActiveTab("stopwatch")}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
            activeTab === "stopwatch"
              ? "bg-[#35bfab] dark:bg-[#39ff14] text-white dark:text-black shadow-md font-bold"
              : "text-gray-500 dark:text-gray-400 hover:text-[#35bfab] dark:hover:text-[#39ff14]"
          }`}
        >
          {lang === "EN" ? "Stopwatch" : "秒表"}
        </button>
        <button
          onClick={() => setActiveTab("timer")}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
            activeTab === "timer"
              ? "bg-[#35bfab] dark:bg-[#39ff14] text-white dark:text-black shadow-md font-bold"
              : "text-gray-500 dark:text-gray-400 hover:text-[#35bfab] dark:hover:text-[#39ff14]"
          }`}
        >
          {lang === "EN" ? "Timer" : "计时器"}
        </button>
      </div>

      {/* --- STOPWATCH VIEW --- */}
      {activeTab === "stopwatch" && (
        <div className="glass-card relative p-6 flex flex-col items-center gap-8 border border-white/60 dark:border-[#39ff14]/30">
          
          {/* SVG Digital Display */}
          <div className="bg-white/40 dark:bg-[#111] flex w-full items-center justify-center rounded-3xl p-8 border border-white/80 dark:border-[#39ff14]/20 shadow-inner">
            <div className="flex items-center justify-center">
              <SvgDigit value={parseInt(currentSwDisplay.mins[0])} />
              <SvgDigit value={parseInt(currentSwDisplay.mins[1])} />
              <Colon />
              <SvgDigit value={parseInt(currentSwDisplay.secs[0])} />
              <SvgDigit value={parseInt(currentSwDisplay.secs[1])} />
              <Colon />
              <SvgDigit value={parseInt(currentSwDisplay.centis[0])} />
              <SvgDigit value={parseInt(currentSwDisplay.centis[1])} />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={recordLap}
              disabled={!swIsRunning}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white dark:border-[#39ff14]/40 bg-white/60 dark:bg-black/50 text-sm font-medium text-gray-700 dark:text-[#39ff14] backdrop-blur-sm transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {lang === "EN" ? "Lap" : "计次"}
            </button>
            
            <button
              onClick={toggleStopwatch}
              className="flex h-20 w-20 items-center justify-center rounded-full text-white dark:text-black shadow-[0_4px_20px_rgba(53,191,171,0.4)] dark:shadow-[0_4px_20px_rgba(57,255,20,0.4)] transition-all hover:scale-110 bg-[#35bfab] dark:bg-[#39ff14]"
            >
              {swIsRunning ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 3l14 9-14 9V3z"></path>
                </svg>
              )}
            </button>

            <button
              onClick={resetStopwatch}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white dark:border-[#39ff14]/40 bg-white/60 dark:bg-black/50 text-gray-700 dark:text-[#39ff14] backdrop-blur-sm transition-all hover:scale-105 hover:rotate-[-45deg]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
            </button>
          </div>

          {/* Laps List */}
          {laps.length > 0 && (
            <div className="w-full mt-4 max-h-48 overflow-y-auto space-y-2 pr-2">
              {laps.map((lapTime, i) => {
                const formatted = formatSwTime(lapTime);
                return (
                  <div key={i} className="flex justify-between items-center py-2 px-4 rounded-lg bg-white/30 dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 border border-white/40 dark:border-[#39ff14]/10 text-sm">
                    <span className="font-medium text-gray-500 dark:text-gray-500">
                      {lang === "EN" ? "Lap" : "计次"} {laps.length - i}
                    </span>
                    <span className="font-mono tracking-wider font-bold">
                      {formatted.mins}:{formatted.secs}.{formatted.centis}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* --- TIMER VIEW --- */}
      {activeTab === "timer" && (
        <div className="glass-card relative p-8 flex flex-col items-center gap-8 border border-white/60 dark:border-[#39ff14]/30">
          
          <div className="flex items-center justify-center gap-4 py-4 w-full">
            {tRemainingMs > 0 || tIsRunning ? (
              // Countdown Display
              <div className="text-6xl font-mono font-bold text-[#2c4c4e] dark:text-[#39ff14] tracking-widest drop-shadow-sm">
                {String(Math.floor(tRemainingMs / 3600000)).padStart(2, "0")}:
                {String(Math.floor((tRemainingMs / 60000) % 60)).padStart(2, "0")}:
                {String(Math.floor((tRemainingMs / 1000) % 60)).padStart(2, "0")}
              </div>
            ) : (
              // Input Mode
              <>
                <div className="flex flex-col items-center gap-2">
                  <label className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{lang === "EN" ? "Hr" : "时"}</label>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={tHours}
                    onChange={(e) => setTHours(Math.max(0, Math.min(23, Number(e.target.value))))}
                    className="w-20 rounded-2xl border-2 border-white dark:border-[#39ff14]/30 bg-white/60 dark:bg-black/50 px-2 py-4 text-center text-4xl font-bold text-gray-800 dark:text-[#39ff14] backdrop-blur-sm focus:outline-none focus:border-[#35bfab] dark:focus:border-[#39ff14] transition-all"
                  />
                </div>
                <div className="text-gray-400 dark:text-[#39ff14]/50 mt-6 text-3xl font-bold">:</div>
                <div className="flex flex-col items-center gap-2">
                  <label className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{lang === "EN" ? "Min" : "分"}</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={tMinutes}
                    onChange={(e) => setTMinutes(Math.max(0, Math.min(59, Number(e.target.value))))}
                    className="w-20 rounded-2xl border-2 border-white dark:border-[#39ff14]/30 bg-white/60 dark:bg-black/50 px-2 py-4 text-center text-4xl font-bold text-gray-800 dark:text-[#39ff14] backdrop-blur-sm focus:outline-none focus:border-[#35bfab] dark:focus:border-[#39ff14] transition-all"
                  />
                </div>
                <div className="text-gray-400 dark:text-[#39ff14]/50 mt-6 text-3xl font-bold">:</div>
                <div className="flex flex-col items-center gap-2">
                  <label className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">{lang === "EN" ? "Sec" : "秒"}</label>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={tSeconds}
                    onChange={(e) => setTSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
                    className="w-20 rounded-2xl border-2 border-white dark:border-[#39ff14]/30 bg-white/60 dark:bg-black/50 px-2 py-4 text-center text-4xl font-bold text-gray-800 dark:text-[#39ff14] backdrop-blur-sm focus:outline-none focus:border-[#35bfab] dark:focus:border-[#39ff14] transition-all"
                  />
                </div>
              </>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <button
              onClick={tIsRunning ? pauseTimer : startTimer}
              disabled={!tIsRunning && tRemainingMs === 0 && (tHours + tMinutes + tSeconds === 0)}
              className="flex h-20 w-20 items-center justify-center rounded-full text-white dark:text-black shadow-[0_4px_20px_rgba(53,191,171,0.4)] dark:shadow-[0_4px_20px_rgba(57,255,20,0.4)] transition-all hover:scale-110 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed bg-[#35bfab] dark:bg-[#39ff14]"
            >
              {tIsRunning ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="M5 3l14 9-14 9V3z"></path>
                </svg>
              )}
            </button>

            <button
              onClick={resetTimer}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white dark:border-[#39ff14]/40 bg-white/60 dark:bg-black/50 text-gray-700 dark:text-[#39ff14] backdrop-blur-sm transition-all hover:scale-105 hover:rotate-[-45deg]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClockView;