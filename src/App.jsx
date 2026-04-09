import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import RealClock from './components/RealClock';
import RealCalendar from './components/RealCalendar';
import GreetingBox from './components/GreetingBox';
import StarshipGameBackground from './components/StarshipGameBackground.jsx';

function App() {
  const songs = [
    {
      id: 'next-to-you',
      artist: 'parasyte',
      fileName: 'next_to_you.flac',
      title: {EN: 'Next To You', CN: 'Next To You'}
    },
    {
      id: 'jaychou-i-do',
      artist: 'Jay Chou',
      fileName: '周杰伦 - I Do.flac',
      title: { EN: 'I Do', CN: 'I Do' },
    },
    {
      id: 'jaychou-xiang-nv-duo-qing',
      artist: 'Jay Chou',
      fileName: '周杰伦 - 湘女多情.flac',
      title: { EN: 'The girl from Hunan', CN: '湘女多情' },
    },
    {
      id: 'jaychou-aegean-sea',
      artist: 'Jay Chou',
      fileName: '周杰伦 - 爱琴海.flac',
      title: { EN: 'Aegean Sea', CN: '爱琴海' },
    },
  ];

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playbackMode, setPlaybackMode] = useState('order'); // order | single
  const [visibleStep, setVisibleStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [lang, setLang] = useState('EN'); 
  const currentSong = songs[currentSongIndex];
  const currentSongSrc = `/music/${encodeURI(currentSong.fileName)}`;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Re-run animation when 'lang' changes
  useEffect(() => {
    setVisibleStep(0); 
    
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
  }, [lang]); 

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

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.load();
    if (isPlaying) {
      audioRef.current
        .play()
        .catch(() => setIsPlaying(false));
    }
  }, [currentSongSrc, isPlaying]);

  const handleSongSelect = async (index) => {
    setCurrentSongIndex(index);
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handleNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    handleSongSelect(nextIndex);
  };

  const handlePrevSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    handleSongSelect(prevIndex);
  };

  const handleAudioEnded = async () => {
    if (!audioRef.current) return;

    if (playbackMode === 'single') {
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    const nextIndex = (currentSongIndex + 1) % songs.length;
    handleSongSelect(nextIndex);
  };

  return (
    <>
      {isDarkMode && <StarshipGameBackground />}

      <main className="md:hidden min-h-screen p-4 flex flex-col items-center gap-5">
        <div className={`glass-card hover-pop w-full max-w-[420px] h-[190px] p-3 bg-white/30 dark:bg-black/40 border-white dark:border-[#39ff14]/30 ${getRevealClass(2, 'up')}`}>
          <img
            className="h-full w-full rounded-xl object-cover dark:brightness-75 dark:contrast-125"
            src="/assets/album.png"
            alt="Photo collage"
          />
        </div>

        <GreetingBox lang={lang} />

        <div className={`flex justify-center gap-3 w-full max-w-[420px] ${getRevealClass(7, 'up')}`}>
          <a className="social-chip dark" href="#">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
            Github
          </a>
          <a className="social-chip" href="#">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gray-900 dark:text-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.918H5.053z"></path></svg>
            X
          </a>
          <a className="social-chip" href="#">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-red-500 dark:text-[#39ff14]"><path d="M19.5 22.5h-15A1.5 1.5 0 013 21V3a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0121 3v18a1.5 1.5 0 01-1.5 1.5zM4.5 21h15V3h-15v18z" /><path d="M16 11H8V9h8v2zM16 15H8v-2h8v2z"/></svg>
            {lang === 'EN' ? 'RED' : '小红书'}
          </a>
          <a className="w-10 h-10 rounded-xl bg-white/60 dark:bg-black/60 border border-white/80 dark:border-[#39ff14]/40 shadow-sm flex items-center justify-center text-[#35bfab] dark:text-[#39ff14] transition-all duration-300 hover:scale-110 hover:z-50" href="#">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
          </a>
        </div>

        <button className="w-12 h-12 rounded-full glass-card hover-pop flex items-center justify-center shadow-sm relative text-pink-400 dark:text-[#39ff14]">
          <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" /></svg>
          <span className="absolute -top-2 -right-4 bg-white/80 dark:bg-black/80 backdrop-blur-md text-gray-500 dark:text-[#39ff14] text-[10px] px-1.5 py-0.5 rounded-full border border-white dark:border-[#39ff14]/40">15690</span>
        </button>
      </main>

      <main className="hidden md:flex max-w-[1100px] mx-auto min-h-screen p-8 flex-nowrap justify-center items-center gap-6 relative overflow-x-hidden">
      
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
          <a className="social-chip dark" href="#">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
            Github
          </a>
          <a className="social-chip" href="#">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gray-900 dark:text-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.918H5.053z"></path></svg>
            X
          </a>
          <a className="social-chip" href="#">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4 text-red-500 dark:text-[#39ff14]"><path d="M19.5 22.5h-15A1.5 1.5 0 013 21V3a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0121 3v18a1.5 1.5 0 01-1.5 1.5zM4.5 21h15V3h-15v18z" /><path d="M16 11H8V9h8v2zM16 15H8v-2h8v2z"/></svg>
            {lang === 'EN' ? 'RED' : '小红书'}
          </a>
          <a className="w-10 h-10 rounded-xl bg-white/60 dark:bg-black/60 border border-white/80 dark:border-[#39ff14]/40 shadow-sm flex items-center justify-center text-[#35bfab] dark:text-[#39ff14] transition-all duration-300 hover:scale-110 hover:z-50" href="#">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
          </a>
        </div>

        <div className="mt-8 flex justify-between items-start w-[520px] ml-30 relative z-30">
          
          <article className={`glass-card hover-pop p-5 w-[240px] shadow-sm ${getRevealClass(6, 'left')}`}>
            <h4 className="mb-3 text-xs font-semibold text-gray-400 dark:text-[#39ff14]/80 tracking-wider">
              {lang === 'EN' ? 'Random Picks' : '随机推荐'}
            </h4>
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-[#39ff14]/20 flex items-center justify-center shrink-0 text-[#3b82f6] dark:text-[#39ff14]">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-gray-800 dark:text-white">LLM | SLM | vLLM</h5>
                <p className="text-[11px] text-[#7b888e] dark:text-gray-400 mt-1">Views: 59,257 Marks: 1,061</p>
              </div>
            </div>
          </article>

          <div className={`relative flex flex-col items-start mt-2 pl-10 pb-18 ${getRevealClass(5, 'right')}`}>
            <article 
              className="glass-card hover-pop p-2 pr-2 w-[295px] rounded-full flex items-center gap-3 cursor-pointer"
              onClick={handleToggleAudio}
            >
              <div className="w-10 h-10 rounded-full bg-white/50 dark:bg-[#39ff14]/20 flex items-center justify-center text-[#35bfab] dark:text-[#39ff14] shrink-0">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path fillRule="evenodd" d="M19.322 3.322c.314-.028.678.21.678.53v12.248a4.5 4.5 0 11-1.5-3.385V8.19l-9 2.01v7.899a4.5 4.5 0 11-1.5-3.384V5.215c0-.395.347-.723.738-.723h.054c.264 0 .524.088.736.248l9.043-2.01a1.5 1.5 0 01.249-.008z" clipRule="evenodd" /></svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-700 dark:text-gray-200 mb-1">
                  {currentSong.title[lang]}
                </p>
                <div className="h-1.5 w-full bg-white/60 dark:bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white dark:bg-[#39ff14] w-full rounded-full"></div>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevSong();
                }}
                className="w-7 h-7 rounded-full bg-white/70 dark:bg-black/40 border border-white/80 dark:border-[#39ff14]/40 flex items-center justify-center text-[10px] text-gray-600 dark:text-[#39ff14] shrink-0"
                aria-label="Previous song"
              >
                &laquo;
              </button>
              <button
                className="w-9 h-9 rounded-full bg-white dark:bg-[#39ff14]/20 flex items-center justify-center text-[#35bfab] dark:text-[#39ff14] shadow-sm ml-1 shrink-0"
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
                type="button"
              >
                {isPlaying ? (
                   <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" /></svg>
                ) : (
                   <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
                )}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextSong();
                }}
                className="w-7 h-7 rounded-full bg-white/70 dark:bg-black/40 border border-white/80 dark:border-[#39ff14]/40 flex items-center justify-center text-[10px] text-gray-600 dark:text-[#39ff14] shrink-0 ml-1"
                aria-label="Next song"
              >
                &raquo;
              </button>
            </article>
            <audio ref={audioRef} src={currentSongSrc} onEnded={handleAudioEnded} preload="metadata" />

            <button className="mt-4 ml-6 w-12 h-12 rounded-full glass-card hover-pop flex items-center justify-center shadow-sm relative text-pink-400 dark:text-[#39ff14]">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" /></svg>
              <span className="absolute -top-2 -right-4 bg-white/80 dark:bg-black/80 backdrop-blur-md text-gray-500 dark:text-[#39ff14] text-[10px] px-1.5 py-0.5 rounded-full border border-white dark:border-[#39ff14]/40">15690</span>
            </button>
          </div>

        </div>
      </div>

      {/* ---------------- RIGHT COLUMN ---------------- */}
      <div className="w-full lg:w-[350px] lg:min-w-[350px] flex flex-col gap-4 z-10 mb-8 lg:mb-20">
        
        <div className={`flex justify-start gap-3 mb-2 ${getRevealClass(8, 'right')}`}>
          <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#35bfab] dark:bg-[#39ff14] text-white dark:text-black text-sm font-medium shadow-[0_4px_14px_rgba(53,191,171,0.3)] dark:shadow-[0_4px_14px_rgba(57,255,20,0.4)] transition-all duration-300 hover:scale-110 hover:z-50 hover:bg-[#2da896] dark:hover:bg-[#32e612] cursor-pointer">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
            {lang === 'EN' ? 'Write Post' : '写文章'}
          </button>
          
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/60 dark:bg-black/60 border border-white/80 dark:border-[#39ff14]/40 shadow-sm text-gray-600 dark:text-[#39ff14] transition-all duration-300 hover:scale-110 hover:z-50 cursor-pointer"
            title="Toggle Theme"
          >
            {isDarkMode ? (
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>
            ) : (
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>
            )}
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
    </>
  )
}

export default App;