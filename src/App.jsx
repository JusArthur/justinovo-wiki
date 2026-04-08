import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import RealClock from './components/RealClock';
import RealCalendar from './components/RealCalendar';

// ==========================================
// 4. Main App (Tightly Packed & Staggered)
// ==========================================
function App() {
  return (
    // Keep a fixed three-column row; use horizontal scroll on narrow screens to preserve layout.
    <main className="max-w-[1100px] mx-auto min-h-screen p-8 flex flex-nowrap justify-center items-center gap-6 relative overflow-x-auto">
      
      {/* ---------------- LEFT COLUMN ---------------- */}
      <div className="w-[260px] min-w-[260px] flex flex-col gap-6 z-10">
        <Sidebar />
        
        <article className="glass-card p-5 w-[270px] transform -rotate-1 -ml-[8px]">
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
      <div className="w-[400px] min-w-[400px] flex flex-col items-center relative z-20">
        
        {/* Top Photo Collage */}
        <div className="glass-card w-90 h-[190px] p-3 bg-white/30 border-white">

            <img
              className="h-full w-full rounded-xl object-cover"
              src="/assets/album.png"
              alt="Photo collage"
            />

        </div>

        {/* Good Afternoon Box */}
        <article className="glass-card p-10 w-90 flex flex-col items-center text-center mt-6">
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
        <div className="mt-8 flex justify-between items-start w-[520px] ml-30 relative z-30">
          
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
                <p className="text-xs font-medium text-gray-600 mb-1">Next To You</p>
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
      <div className="w-[350px] min-w-[350px] flex flex-col gap-4 z-10 mb-20">
        
        <div className="flex justify-start gap-3 mb-2">
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#35bfab] text-white text-sm font-medium shadow-[0_4px_14px_rgba(53,191,171,0.3)] hover:bg-[#2da896] transition-colors">
            <span>✍️</span> 写文章
          </button>
        </div>

        <RealClock />
        <RealCalendar />

      </div>
    </main>
  )
}

export default App;