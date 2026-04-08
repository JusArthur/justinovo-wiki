import { useState, useEffect } from 'react';

// ==========================================
// 1. Sidebar Component (1000ms Animated Pill)
// ==========================================
const Sidebar = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = [
    { label: '近期文章', icon: (<svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>) },
    { label: '我的项目', icon: (<svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"/></svg>) },
    { label: '关于网站', icon: (<svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>) },
    { label: '推荐分享', icon: (<svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>) },
    { label: '优秀博客', icon: (<svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.09 13.36 4 12.69 4 12s.09-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c1.03-1.77 2.7-3.11 4.71-3.71-.62 1.15-1.11 2.38-1.46 3.71z"/></svg>) },
  ];

  return (
    <aside className="glass-card p-6 w-[260px]">
      <section className="mb-6 flex items-center gap-3">
        <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center text-xl shadow-sm">🐱</div>
        <div>
          <h2 className="font-semibold text-lg text-gray-800 leading-none flex items-center gap-2">
            lvy-neko
            <span className="text-[10px] text-[#35bfab] bg-[#35bfab]/10 px-1.5 py-0.5 rounded-full font-medium">开发中</span>
          </h2>
        </div>
      </section>

      <div className="text-xs font-semibold text-gray-400 mb-3 tracking-wider">GENERAL</div>
      
      <nav 
        className="relative flex flex-col gap-1.5"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Animated Background Pill - 1000ms latency */}
        <div 
          className={`absolute left-0 w-full h-[44px] bg-white rounded-full shadow-sm border border-white/80 pointer-events-none transition-all duration-[1000ms] ease-out ${hoveredIndex !== null ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: `translateY(${hoveredIndex !== null ? hoveredIndex * (44 + 6) : 0}px)` }}
        />

        {navItems.map((item, i) => (
          <a 
            key={i} 
            href="#" 
            className="group relative z-10 flex items-center gap-3 px-4 h-[44px] rounded-full text-sm font-medium text-[#7b888e] transition-colors"
            onMouseEnter={() => setHoveredIndex(i)}
          >
            <span className={`transition-colors duration-300 ${hoveredIndex === i ? 'text-[#35bfab]' : 'text-gray-400'}`}>
              {item.icon}
            </span>
            <span className={hoveredIndex === i ? 'text-gray-800' : ''}>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};

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
    <div className="glass-card py-5 flex justify-center items-center w-[60%]">
      <span className="text-4xl font-mono text-gray-600 tracking-[0.15em] font-semibold opacity-80">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
      </span>
    </div>
  );
};

// ==========================================
// 3. Real Calendar Component
// ==========================================
const RealCalendar = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const padDays = firstDay === 0 ? 6 : firstDay - 1; 

  const days = Array(padDays).fill(null).concat(Array.from({length: daysInMonth}, (_, i) => i + 1));

  return (
    <article className="glass-card p-6 w-full mt-2">
      <p className="mb-4 text-xs font-semibold text-gray-400">
        {currentYear}/{currentMonth + 1}/{currentDate}
      </p>
      <div className="grid grid-cols-7 gap-y-2 text-center mb-2">
        {['一', '二', '三', '四', '五', '六', '日'].map((day, i) => (
          <span key={day} className={`text-xs font-medium ${(today.getDay() === (i+1)%7) ? 'text-[#35bfab]' : 'text-gray-400'}`}>
            {day}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-2 justify-items-center">
        {days.map((day, i) => (
          <span key={i} className={`cal-day ${day === currentDate ? 'active' : ''} ${!day ? 'opacity-0' : ''}`}>
            {day}
          </span>
        ))}
      </div>
    </article>
  );
};

// ==========================================
// 4. Main App (Tightly Packed & Staggered)
// ==========================================
function App() {
  return (
    // Changed justify-between to justify-center, and gap-8 to gap-6 to bring columns much closer together
    <main className="max-w-[1100px] mx-auto min-h-screen p-8 pt-12 flex flex-wrap justify-center items-start gap-6 relative">
      
      {/* ---------------- LEFT COLUMN ---------------- */}
      <div className="w-[260px] flex flex-col gap-6 mt-12 z-10">
        <Sidebar />
        
        <article className="glass-card p-5 w-[260px] transform -rotate-1 ml-2">
          <h4 className="mb-3 text-xs font-semibold text-gray-400 tracking-wider">最新文章</h4>
          <div className="flex gap-3 items-center">
            <div className="h-12 w-12 rounded-xl bg-gray-200 overflow-hidden shrink-0">
              <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=100&q=80" alt="" />
            </div>
            <div>
              <h5 className="text-sm font-semibold text-gray-800 leading-tight">Harness 用于...</h5>
              <p className="text-[11px] text-[#7b888e] mt-1">如何设计自动化的评估函数</p>
              <time className="text-[10px] text-gray-400 mt-1 block">2026/4/1</time>
            </div>
          </div>
        </article>
      </div>

      {/* ---------------- CENTER COLUMN ---------------- */}
      <div className="w-[420px] flex flex-col items-center relative z-20">
        
        {/* Top Photo Collage */}
        <div className="glass-card w-full h-[160px] relative overflow-hidden flex justify-center items-center bg-white/30 border-white">
           <div className="absolute w-[90%] h-[90%] flex gap-2 rotate-2 opacity-80 p-2">
              <div className="flex-1 bg-blue-100 rounded-lg shadow border border-white"></div>
              <div className="flex-1 bg-yellow-100 rounded-lg shadow border border-white mt-4"></div>
              <div className="flex-1 bg-green-100 rounded-lg shadow border border-white -mt-2"></div>
           </div>
        </div>

        {/* Good Afternoon Box */}
        <article className="glass-card p-10 w-full flex flex-col items-center text-center mt-6">
          <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center text-4xl mb-4 shadow-sm border border-white">
            🐱
          </div>
          <h3 className="text-2xl font-semibold text-gray-700">Good Afternoon</h3>
          <p className="text-xl text-gray-700 mt-3">
            I'm <span className="text-[#35bfab] font-bold text-2xl">Ivy</span> , Nice to
          </p>
          <p className="text-xl text-gray-700 mt-1">meet you!</p>
        </article>

        {/* Social Links */}
        <div className="flex justify-center gap-3 mt-6">
          <a className="social-chip dark" href="#"><span>🐙</span> Github</a>
          <a className="social-chip" href="#"><span className="text-pink-400">📺</span> Bilibili</a>
          <a className="social-chip" href="#"><span className="text-red-500">📕</span> 小红书</a>
          <a className="w-10 h-10 rounded-xl bg-white/60 border border-white/80 shadow-sm flex items-center justify-center text-[#35bfab] hover:scale-105 transition-transform" href="#">
            ✉️
          </a>
        </div>

        {/* Bottom Section: Stable container mapping exactly to the design */}
        {/* Width expanded and pulled slightly left to naturally fit both items */}
        <div className="mt-8 flex justify-between items-start w-[520px] ml-18 relative z-30">
          
          {/* Random Rec Card - Firmly planted on the Left */}
          <article className="glass-card p-5 w-[240px] shadow-sm">
            <h4 className="mb-3 text-xs font-semibold text-gray-400 tracking-wider">随机推荐</h4>
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-xl shrink-0">📦</div>
              <div>
                <h5 className="text-sm font-semibold text-gray-800">LLM | SLM | vLLM</h5>
                <p className="text-[11px] text-[#7b888e] mt-1">Views: 59,257 Marks: 1,061</p>
              </div>
            </div>
          </article>

          {/* Music Player & Like - Firmly planted on the Right */}
          <div className="flex flex-col items-start gap-3 mt-2 pl-10">
            <article className="glass-card p-2 pr-4 w-[250px] rounded-full flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-[#35bfab] shrink-0">🎵</div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 mb-1">Close To You</p>
                <div className="h-1.5 w-full bg-white/60 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-1/3 rounded-full"></div>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#35bfab] shadow-sm ml-1 shrink-0">▶</button>
            </article>

            {/* Floating Heart Button beneath music player */}
            <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center shadow-sm relative ml-4">
              <span className="text-pink-400 text-xl">♥</span>
              <span className="absolute -top-2 -right-4 bg-white/80 backdrop-blur-md text-gray-500 text-[10px] px-1.5 py-0.5 rounded-full border border-white">15690</span>
            </div>
          </div>

        </div>
      </div>

      {/* ---------------- RIGHT COLUMN ---------------- */}
      <div className="w-[300px] flex flex-col gap-4 mt-[42px] z-10">
        
        <div className="flex justify-start gap-3 mb-2">
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#35bfab] text-white text-sm font-medium shadow-[0_4px_14px_rgba(53,191,171,0.3)] hover:bg-[#2da896] transition-colors">
            <span>✍️</span> 写文章
          </button>
          <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 bg-white/40 hover:bg-white/60 border border-white transition-colors">
            ⊞
          </button>
        </div>

        <RealClock />
        <RealCalendar />

      </div>
    </main>
  )
}

export default App;