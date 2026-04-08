import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import RealClock from './components/RealClock';
import RealCalendar from './components/RealCalendar';
import GreetingBox from './components/GreetingBox';

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleStep, setVisibleStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [lang, setLang] = useState('EN'); 

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // ----- UPDATE: Re-run animation when 'lang' changes -----
  useEffect(() => {
    setVisibleStep(0); // Reset the steps to hide everything
    
    let step = 0;
    const finalStep = 8;
    const stepTimer = setInterval(() => {
      step += 1;
      setVisibleStep(step);
      if (step >= finalStep) {
        clearInterval(stepTimer);
      }
    }, 110);
    
    return () => clearInterval(stepTimer);
  }, [lang]); // <-- Added 'lang' to dependency array

  const getRevealClass = (step, direction = 'up') => {
    const hiddenOffset =
      direction === 'left'
        ? '-translate-x-6'
        : direction === 'right'
          ? 'translate-x-6'
          : 'translate-y-6';

    return `transition-all duration-250 ease-out ${visibleStep >= step ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${hiddenOffset}`}`;
  };

  const handleToggleAudio = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <main className="max-w-[1100px] mx-auto min-h-screen p-8 flex flex-nowrap justify-center items-center gap-6 relative overflow-x-auto">
      
      {/* ---------------- LEFT COLUMN ---------------- */}
      <div className="w-[260px] min-w-[260px] flex flex-col gap-6 z-10">
        <div className={getRevealClass(1, 'left')}>
          <Sidebar lang={lang} />
        </div>
        
        <article className={`glass-card hover-pop p-5 w-[270px] transform -rotate-1 -ml-[8px] ${getRevealClass(8, 'left')}`}>
          <h4 className="mb-3 text-xs font-semibold text-gray-400 dark:text-[#39ff14]/80 tracking-wider">
            {lang === 'EN' ? 'Latest Posts' : '最新文章'}
          </h4>
          <div className="flex gap-3 items-center">
            <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-800 overflow-hidden shrink-0">
              <img className="w-full h-full object-cover opacity-90 dark:opacity-70" src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=100&q=80" alt="" />
            </div>
            <div>
              <h5 className="text-sm font-semibold text-gray-800 dark:text-white leading-tight">Harness 用于...</h5>
              <p className="text-[11px] text-[#7b888e] dark:text-gray-400 mt-1">
                {lang === 'EN' ? 'How to design automated evaluation' : '如何设计自动化的评估函数'}
              </p>
              <time className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 block">2026/4/1</time>
            </div>
          </div>
        </article>
      </div>

      {/* ---------------- CENTER COLUMN ---------------- */}
      <div className="w-[400px] min-w-[400px] flex flex-col items-center relative z-20 mt-10">
        
        <div className={`glass-card hover-pop w-90 h-[190px] p-3 bg-white/30 dark:bg-black/40 border-white dark:border-[#39ff14]/30 mb-10 ${getRevealClass(2, 'up')}`}>
            <img
              className="h-full w-full rounded-xl object-cover dark:brightness-75 dark:contrast-125"
              src="/assets/album.png"
              alt="Photo collage"
            />
        </div>

        <GreetingBox lang={lang} />

        <div className={`flex justify-center gap-3 mt-6 ${getRevealClass(7, 'up')}`}>
          <a className="social-chip dark" href="#"><span>🐙</span> Github</a>
          <a className="social-chip" href="#"><span className="text-pink-400 dark:text-[#39ff14]">📺</span> Bilibili</a>
          <a className="social-chip" href="#"><span className="text-red-500 dark:text-[#39ff14]">📕</span> {lang === 'EN' ? 'RED' : '小红书'}</a>
          <a className="w-10 h-10 rounded-xl bg-white/60 dark:bg-black/60 border border-white/80 dark:border-[#39ff14]/40 shadow-sm flex items-center justify-center text-[#35bfab] dark:text-[#39ff14] transition-all duration-300 hover:scale-110 hover:z-50" href="#">
            ✉️
          </a>
        </div>

        <div className="mt-8 flex justify-between items-start w-[520px] ml-30 relative z-30">
          
          <article className={`glass-card hover-pop p-5 w-[240px] shadow-sm ${getRevealClass(6, 'left')}`}>
            <h4 className="mb-3 text-xs font-semibold text-gray-400 dark:text-[#39ff14]/80 tracking-wider">
              {lang === 'EN' ? 'Random Picks' : '随机推荐'}
            </h4>
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-[#39ff14]/20 flex items-center justify-center text-xl shrink-0 dark:brightness-150">📦</div>
              <div>
                <h5 className="text-sm font-semibold text-gray-800 dark:text-white">LLM | SLM | vLLM</h5>
                <p className="text-[11px] text-[#7b888e] dark:text-gray-400 mt-1">Views: 59,257 Marks: 1,061</p>
              </div>
            </div>
          </article>

          <div className={`relative flex flex-col items-start mt-2 pl-10 pb-18 ${getRevealClass(5, 'right')}`}>
            <article 
              className="glass-card hover-pop p-2 pr-4 w-[275px] rounded-full flex items-center gap-3"
              onClick={handleToggleAudio}
            >
              <div className="w-10 h-10 rounded-full bg-white/50 dark:bg-[#39ff14]/20 flex items-center justify-center text-[#35bfab] dark:text-[#39ff14] shrink-0">🎵</div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">Next To You</p>
                <div className="h-1.5 w-full bg-white/60 dark:bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white dark:bg-[#39ff14] w-1/3 rounded-full"></div>
                </div>
              </div>
              <button
                className="w-9 h-9 rounded-full bg-white dark:bg-[#39ff14]/20 flex items-center justify-center text-[#35bfab] dark:text-[#39ff14] shadow-sm ml-1 shrink-0"
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
                type="button"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
            </article>
            <audio ref={audioRef} src="/music/next_to_you.flac" onEnded={() => setIsPlaying(false)} preload="metadata" />

            <button className="mt-4 ml-6 w-12 h-12 rounded-full glass-card hover-pop flex items-center justify-center shadow-sm relative">
              <span className="text-pink-400 dark:text-[#39ff14] text-xl">♥</span>
              <span className="absolute -top-2 -right-4 bg-white/80 dark:bg-black/80 backdrop-blur-md text-gray-500 dark:text-[#39ff14] text-[10px] px-1.5 py-0.5 rounded-full border border-white dark:border-[#39ff14]/40">15690</span>
            </button>
          </div>

        </div>
      </div>

      {/* ---------------- RIGHT COLUMN ---------------- */}
      <div className="w-[350px] min-w-[350px] flex flex-col gap-4 z-10 mb-20">
        
        <div className={`flex justify-start gap-3 mb-2 ${getRevealClass(8, 'right')}`}>
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#35bfab] dark:bg-[#39ff14] text-white dark:text-black text-sm font-medium shadow-[0_4px_14px_rgba(53,191,171,0.3)] dark:shadow-[0_4px_14px_rgba(57,255,20,0.4)] transition-all duration-300 hover:scale-110 hover:z-50 hover:bg-[#2da896] dark:hover:bg-[#32e612] cursor-pointer">
            <span>✍️</span> {lang === 'EN' ? 'Write Post' : '写文章'}
          </button>
          
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/60 dark:bg-black/60 border border-white/80 dark:border-[#39ff14]/40 shadow-sm text-xl transition-all duration-300 hover:scale-110 hover:z-50 cursor-pointer"
            title="Toggle Theme"
          >
            {isDarkMode ? '💻' : '🌸'}
          </button>

          <button 
            onClick={() => setLang(lang === 'EN' ? 'CN' : 'EN')}
            className="flex items-center justify-center px-4 h-10 rounded-full bg-white/60 dark:bg-black/60 border border-white/80 dark:border-[#39ff14]/40 shadow-sm text-sm transition-all duration-300 hover:scale-110 hover:z-50 cursor-pointer select-none"
            title="Toggle Language"
          >
            <span className={`transition-colors duration-300 ${lang === 'EN' ? 'text-gray-900 dark:text-[#39ff14] font-bold' : 'text-gray-400 dark:text-gray-600 font-medium'}`}>EN</span>
            <span className="mx-1.5 text-gray-300 dark:text-gray-600/50">/</span>
            <span className={`transition-colors duration-300 ${lang === 'CN' ? 'text-gray-900 dark:text-[#39ff14] font-bold' : 'text-gray-400 dark:text-gray-600 font-medium'}`}>CN</span>
          </button>
        </div>

        <div className={getRevealClass(3, 'right')}>
          <RealClock />
        </div>
        <div className={getRevealClass(4, 'right')}>
          <RealCalendar />
        </div>

      </div>
    </main>
  )
}

export default App;