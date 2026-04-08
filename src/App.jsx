function App() {
  return (
    <main className="max-w-[1240px] mx-auto min-h-screen p-8 flex flex-wrap justify-center gap-6 items-start">
      
      {/* ================= LEFT COLUMN ================= */}
      <div className="w-[260px] flex flex-col gap-6">
        
        {/* Profile & Menu Card */}
        <aside className="glass-card p-6">
          <section className="mb-6 flex items-center gap-3">
            <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center text-xl">🐱</div>
            <div>
              <h2 className="font-semibold text-lg text-gray-800 leading-none flex items-center gap-2">
                lvy-neko
                <span className="text-[10px] text-[#35bfab] bg-[#35bfab]/10 px-1.5 py-0.5 rounded-full font-medium">开发中</span>
              </h2>
            </div>
          </section>

          <div className="text-xs font-semibold text-gray-400 mb-3 tracking-wider">GENERAL</div>
          
          <nav className="grid gap-1.5">
            <a className="menu-item active" href="#">
              <span className="text-[#35bfab] text-lg">📄</span> 近期文章
            </a>
            <a className="menu-item" href="#">
              <span className="text-gray-400 text-lg">⊞</span> 我的项目
            </a>
            <a className="menu-item" href="#">
              <span className="text-gray-400 text-lg">☺</span> 关于网站
            </a>
            <a className="menu-item" href="#">
              <span className="text-gray-400 text-lg">☆</span> 推荐分享
            </a>
            <a className="menu-item" href="#">
              <span className="text-gray-400 text-lg">🌐</span> 优秀博客
            </a>
          </nav>
        </aside>

        {/* Latest Article Card */}
        <article className="glass-card p-5">
          <h4 className="mb-3 text-xs font-semibold text-gray-400 tracking-wider">最新文章</h4>
          <div className="flex gap-3 items-center">
            <img className="h-12 w-12 rounded-xl object-cover bg-gray-200" src="/assets/article-thumb.png" alt="" />
            <div>
              <h5 className="text-sm font-semibold text-gray-800">Harness 用于...</h5>
              <p className="text-[11px] text-[#7b888e] mt-0.5">如何设计自动化的评估函数</p>
              <time className="text-[10px] text-gray-400 mt-1 block">2026/4/1</time>
            </div>
          </div>
        </article>
      </div>


      {/* ================= CENTER COLUMN ================= */}
      <div className="w-[420px] flex flex-col gap-6">
        
        {/* Photo Collage Area */}
        <div className="glass-card h-[160px] relative overflow-hidden flex justify-center items-center bg-white/30 border-white">
           {/* Placeholder for the collage illustrations */}
           <div className="absolute w-[80%] h-[80%] bg-[url('/assets/collage-placeholder.png')] bg-contain bg-center bg-no-repeat opacity-80">
              <div className="w-full h-full flex justify-center items-center text-4xl">📸</div>
           </div>
        </div>

        {/* Greeting Card */}
        <article className="glass-card p-8 flex flex-col items-center text-center relative">
          <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center text-4xl mb-4 shadow-sm border border-white">
            🐱
          </div>
          <h3 className="text-[22px] font-semibold text-gray-700 font-['Varela_Round']">Good Afternoon</h3>
          <p className="text-xl text-gray-700 mt-2 font-['Varela_Round']">
            I'm <span className="text-[#35bfab] font-bold text-2xl">Ivy</span> , Nice to
          </p>
          <p className="text-xl text-gray-700 mt-1 font-['Varela_Round']">meet you!</p>
        </article>

        {/* Social Links */}
        <div className="flex justify-center gap-3">
          <a className="social-chip dark" href="#">
            <span>🐙</span> Github
          </a>
          <a className="social-chip" href="#">
            <span className="text-pink-400">📺</span> Bilibili
          </a>
          <a className="social-chip" href="#">
            <span className="text-red-500">📕</span> 小红书
          </a>
          <a className="w-10 h-10 rounded-xl bg-white/60 border border-white/80 shadow-sm flex items-center justify-center text-[#35bfab] hover:scale-105 transition-transform" href="#">
            ✉️
          </a>
        </div>

        {/* Random Rec Card (Positioned bottom left of center) */}
        <article className="glass-card p-5 w-[85%]">
          <h4 className="mb-3 text-xs font-semibold text-gray-400 tracking-wider">随机推荐</h4>
          <div className="flex gap-3 items-center">
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-xl">📦</div>
            <div>
              <h5 className="text-sm font-semibold text-gray-800">LLM | SLM | vLLM</h5>
              <p className="text-[11px] text-[#7b888e] mt-1">Views: 59,257 Marks: 1,061</p>
            </div>
          </div>
        </article>
      </div>


      {/* ================= RIGHT COLUMN ================= */}
      <div className="w-[300px] flex flex-col gap-6">
        
        {/* Top Action Buttons */}
        <div className="flex justify-end gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#35bfab] text-white text-sm font-medium shadow-[0_4px_14px_rgba(53,191,171,0.3)] hover:bg-[#2da896] transition-colors">
            <span>✍️</span> 写文章
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/40 transition-colors">
            <span className="text-xl">⋮⋮</span>
          </button>
        </div>

        {/* Digital Clock */}
        <div className="glass-card py-6 flex justify-center items-center">
          {/* Note: Use a digital font here if you have one imported, standard mono used as fallback */}
          <span className="text-5xl font-mono text-gray-600 tracking-widest font-semibold opacity-80" style={{ letterSpacing: '0.15em' }}>
            12:40
          </span>
        </div>

        {/* Calendar */}
        <article className="glass-card p-6">
          <p className="mb-4 text-xs font-semibold text-gray-400">2026/4/8 周三</p>
          <div className="grid grid-cols-7 gap-y-2 text-center mb-2">
            {['一', '二', '三', '四', '五', '六', '日'].map(day => (
              <span key={day} className={`text-xs font-medium ${day === '三' ? 'text-[#35bfab]' : 'text-gray-400'}`}>{day}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-2 justify-items-center">
            <span className="cal-day opacity-0"></span><span className="cal-day opacity-0"></span>
            <span className="cal-day">1</span><span className="cal-day">2</span><span className="cal-day">3</span><span className="cal-day">4</span><span className="cal-day">5</span>
            <span className="cal-day">6</span><span className="cal-day">7</span><span className="cal-day active">8</span><span className="cal-day">9</span><span className="cal-day">10</span><span className="cal-day">11</span><span className="cal-day">12</span>
            <span className="cal-day">13</span><span className="cal-day">14</span><span className="cal-day">15</span><span className="cal-day">16</span><span className="cal-day">17</span><span className="cal-day">18</span><span className="cal-day">19</span>
            <span className="cal-day">20</span><span className="cal-day">21</span><span className="cal-day">22</span><span className="cal-day">23</span><span className="cal-day">24</span><span className="cal-day">25</span><span className="cal-day">26</span>
            <span className="cal-day">27</span><span className="cal-day">28</span><span className="cal-day">29</span><span className="cal-day">30</span>
          </div>
        </article>

        {/* Music Player & Floating Notifications */}
        <div className="relative">
          <article className="glass-card p-2 pr-4 rounded-full flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-[#35bfab]">🎵</div>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-600 mb-1">Close To You</p>
              <div className="h-1.5 w-full bg-white/60 rounded-full overflow-hidden">
                <div className="h-full bg-white w-1/3 rounded-full"></div>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#35bfab] shadow-sm ml-2">
              ▶
            </button>
          </article>

          {/* Floating Heart / Notification */}
          <div className="absolute -bottom-8 left-4 w-10 h-10 rounded-full glass-card flex items-center justify-center shadow-lg">
            <span className="text-pink-400">♥</span>
            <span className="absolute -top-1 -right-4 bg-white/60 backdrop-blur-md text-gray-500 text-[9px] px-1.5 py-0.5 rounded-full border border-white">15690</span>
          </div>
        </div>

      </div>
    </main>
  )
}

export default App