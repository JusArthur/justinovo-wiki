import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import RealClock from './components/RealClock';
import RealCalendar from './components/RealCalendar';
import GreetingBox from './components/GreetingBox';

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleStep, setVisibleStep] = useState(0);
  const [likePosition, setLikePosition] = useState({ x: 16, y: 14 });
  const [dragState, setDragState] = useState(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (!dragState) return;

    const handleMouseMove = (event) => {
      setLikePosition({
        x: Math.max(0, dragState.startX + (event.clientX - dragState.pointerX)),
        y: Math.max(0, dragState.startY + (event.clientY - dragState.pointerY)),
      });
    };

    const handleMouseUp = () => {
      setDragState(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragState]);

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
          <Sidebar />
        </div>
        
        <article className={`glass-card p-5 w-[270px] transform -rotate-1 -ml-[8px] ${getRevealClass(8, 'left')}`}>
          <h4 className="mb-3 text-xs font-semibold text-green-600 tracking-wider">最新文章</h4>
          <div className="flex gap-3 items-center">
            <div className="h-12 w-12 rounded-xl bg-gray-800 overflow-hidden shrink-0">
              <img className="w-full h-full object-cover opacity-80" src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=100&q=80" alt="" />
            </div>
            <div>
              <h5 className="text-sm font-semibold text-gray-100 leading-tight">Harness 用于...</h5>
              <p className="text-[11px] text-gray-400 mt-1">如何设计自动化的评估函数</p>
              <time className="text-[10px] text-gray-500 mt-1 block">2026/4/1</time>
            </div>
          </div>
        </article>
      </div>

      {/* ---------------- CENTER COLUMN ---------------- */}
      <div className="w-[400px] min-w-[400px] flex flex-col items-center relative z-20">
        
        <div className={`glass-card w-90 h-[190px] p-3 bg-black/30 border-green-500/20 mb-10 ${getRevealClass(2, 'up')}`}>
            <img
              className="h-full w-full rounded-xl object-cover opacity-80 mix-blend-luminosity"
              src="/assets/album.png"
              alt="Photo collage"
            />
        </div>

        <GreetingBox />

{/* Social Links */}
<div className={`flex justify-center gap-3 mt-6 ${getRevealClass(7, 'up')}`}>
          <a className="social-chip dark" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            Github
          </a>
          <a className="social-chip" href="#"><span className="text-pink-400">📺</span> Bilibili</a>
          <a className="social-chip" href="#"><span className="text-red-500">📕</span> 小红书</a>
          <a className="w-10 h-10 rounded-xl bg-black/60 border border-green-500/30 shadow-sm flex items-center justify-center text-green-500 hover:scale-110 transition-transform duration-300" href="#">
            ✉️
          </a>
        </div>

        <div className="mt-8 flex justify-between items-start w-[520px] ml-30 relative z-30">
          
          <article className={`glass-card p-5 w-[240px] shadow-sm ${getRevealClass(6, 'left')}`}>
            <h4 className="mb-3 text-xs font-semibold text-green-600 tracking-wider">随机推荐</h4>
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 rounded-lg bg-green-900/40 flex items-center justify-center text-xl shrink-0 border border-green-500/30">📦</div>
              <div>
                <h5 className="text-sm font-semibold text-gray-100">LLM | SLM | vLLM</h5>
                <p className="text-[11px] text-gray-400 mt-1">Views: 59,257 Marks: 1,061</p>
              </div>
            </div>
          </article>

          <div className={`relative flex flex-col items-start mt-2 pl-10 pb-18 ${getRevealClass(5, 'right')}`}>
            <article className="glass-card p-2 pr-4 w-[275px] rounded-full flex items-center gap-3 border-green-500/30">
              <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-green-500 shrink-0 border border-green-500/20">🎵</div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-300 mb-1">Next To You</p>
                <div className="h-1.5 w-full bg-green-900/50 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-1/3 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                </div>
              </div>
              <button
                className="w-9 h-9 rounded-full bg-black/80 flex items-center justify-center text-green-500 shadow-sm ml-1 shrink-0 border border-green-500/30 hover:bg-green-500/20"
                onClick={handleToggleAudio}
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
                type="button"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
            </article>
            <audio
              ref={audioRef}
              src="/music/next_to_you.flac"
              onEnded={() => setIsPlaying(false)}
              preload="metadata"
            />

            <div
              className="absolute left-0 top-full w-12 h-12 rounded-full glass-card flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.2)] cursor-grab active:cursor-grabbing select-none border-green-500/50 bg-black/80"
              style={{ transform: `translate(${likePosition.x}px, ${likePosition.y}px)` }}
              onMouseDown={(event) =>
                setDragState({
                  pointerX: event.clientX,
                  pointerY: event.clientY,
                  startX: likePosition.x,
                  startY: likePosition.y,
                })
              }
            >
              <span className="text-green-500 text-xl pointer-events-none drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]">♥</span>
              <span className="absolute -top-2 -right-4 bg-black/80 backdrop-blur-md text-green-400 text-[10px] px-1.5 py-0.5 rounded-full border border-green-500/50 pointer-events-none">15690</span>
            </div>
          </div>

        </div>
      </div>

      {/* ---------------- RIGHT COLUMN ---------------- */}
      <div className="w-[350px] min-w-[350px] flex flex-col gap-4 z-10 mb-20">
        
        <div className={`flex justify-start gap-3 mb-2 ${getRevealClass(8, 'right')}`}>
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-green-600 text-black text-sm font-bold shadow-[0_4px_14px_rgba(34,197,94,0.3)] hover:bg-green-500 transition-colors">
            <span>✍️</span> 写文章
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