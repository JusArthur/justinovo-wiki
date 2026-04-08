// ==========================================
// 1. Sidebar Component (1000ms Animated Pill)
// ==========================================

import { useState } from 'react';

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
      <aside className="glass-card p-6 w-[240px]">
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

  export default Sidebar;