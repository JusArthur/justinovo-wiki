function App() {
  return (
    <main className="mx-auto my-6 grid min-h-[900px] w-[min(1360px,calc(100vw-48px))] grid-cols-[280px_1fr_350px] gap-6 max-[1200px]:grid-cols-2 max-[1200px]:grid-areas-['center_center''left_right'] max-[760px]:my-3 max-[760px]:w-[calc(100vw-24px)] max-[760px]:grid-cols-1 max-[760px]:grid-areas-['center''right''left'] max-[760px]:gap-3.5">
      <aside className="card p-6 max-[1200px]:[grid-area:left]">
        <section className="mb-5 flex items-center gap-3">
          <img className="h-[39px] w-10 rounded-full" src="/assets/profile-avatar.png" alt="avatar" />
          <div>
            <h2 className="font-averia text-2xl font-normal leading-none">
              lvy-neko <span className="font-inter text-xs font-medium leading-[1.3] text-[#35bfab]">(开发中)</span>
            </h2>
            <p className="mt-1.5 text-sm text-[#7b888e]">General</p>
          </div>
        </section>

        <nav className="grid gap-2">
          <a className="menu-item bg-[linear-gradient(90deg,#fff_60%,rgba(255,255,255,0.4)_100%)]" href="#"><img src="/assets/icon-recent.svg" alt="" />近期文章</a>
          <a className="menu-item" href="#"><img src="/assets/icon-project.svg" alt="" />我的项目</a>
          <a className="menu-item" href="#"><img src="/assets/icon-about.svg" alt="" />关于网站</a>
          <a className="menu-item" href="#"><img src="/assets/icon-share.svg" alt="" />推荐分享</a>
          <a className="menu-item" href="#"><img src="/assets/icon-blog.svg" alt="" />优秀博客</a>
        </nav>
      </aside>

      <section className="grid grid-rows-[288px_70px_160px] gap-[18px] max-[1200px]:[grid-area:center] max-[760px]:grid-rows-[260px_60px_auto]">
        <article className="card relative overflow-hidden">
          <img className="absolute inset-2.5 h-[calc(100%-20px)] w-[calc(100%-20px)] rounded-[32px] object-cover" src="/assets/hero-bg.png" alt="" />
          <img className="absolute left-[calc(50%-60px)] top-6 h-[120px] w-[120px] rounded-full shadow-[0_16px_32px_#e2d9ce]" src="/assets/avatar-center.png" alt="" />
          <h3 className="absolute left-1/2 top-[154px] -translate-x-1/2 font-averia text-2xl">Good Evening</h3>
          <p className="absolute left-1/2 top-[194px] -translate-x-1/2 font-averia text-2xl">
            I&apos;m <span className="bg-[linear-gradient(90deg,rgba(0,0,0,0.2)_0%,rgba(170,170,170,0.07)_33%,#35bfab_40%,#1fc9e7_100%)] bg-clip-text text-[32px] text-transparent">lvy</span>, Nice to
          </p>
          <p className="absolute left-1/2 top-[228px] -translate-x-1/2 font-averia text-2xl">meet you!</p>
        </article>

        <div className="grid grid-cols-[129px_99px_106px_46px] gap-3 max-[760px]:grid-cols-2 max-[760px]:auto-rows-[46px]">
          <a className="chip dark-chip" href="#">Github</a>
          <a className="chip" href="#"><img src="/assets/icon-bili.svg" alt="" />Bilibili</a>
          <a className="chip" href="#"><img src="/assets/icon-redbook.svg" alt="" />小红书</a>
          <a className="chip p-0" href="#" aria-label="play"><img src="/assets/icon-play.svg" alt="" /></a>
        </div>

        <article className="card rounded-[40px] px-6 py-5">
          <h4 className="mb-2 text-sm text-[#7b888e]">最新文章</h4>
          <div className="flex gap-3">
            <img className="h-12 w-12 rounded-xl object-cover" src="/assets/article-thumb.png" alt="" />
            <div>
              <h5 className="mb-1.5 text-sm font-medium">Harness 用于autoresearch</h5>
              <p className="text-xs leading-[1.35] text-[#7b888e]">如何设计自动化的评估函数</p>
              <time className="text-xs leading-[1.35] text-[#7b888e]">2026/4/1</time>
            </div>
          </div>
        </article>
      </section>

      <aside className="grid grid-rows-[42px_286px_160px_66px] gap-[18px] max-[1200px]:[grid-area:right] max-[760px]:grid-rows-[42px_auto_auto_auto]">
        <button className="card flex items-center justify-center gap-2 rounded-xl border border-transparent bg-[#35bfab] font-medium"><img src="/assets/icon-write.svg" alt="" />写文章</button>

        <article className="card rounded-[40px] px-6 py-5">
          <p className="mb-2.5 text-sm text-[#7b888e]">2026/4/7 周二</p>
          <div className="mb-2 grid grid-cols-7 gap-2 text-center">
            <span className="text-sm font-medium text-[#7b888e]">一</span><span className="text-sm font-medium text-[#35bfab]">二</span><span className="text-sm font-medium text-[#7b888e]">三</span><span className="text-sm font-medium text-[#7b888e]">四</span><span className="text-sm font-medium text-[#7b888e]">五</span><span className="text-sm font-medium text-[#7b888e]">六</span><span className="text-sm font-medium text-[#7b888e]">日</span>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center">
            <span className="day">1</span><span className="day">2</span><span className="day">3</span><span className="day">4</span><span className="day">5</span><span className="day">6</span>
            <span className="day bg-[linear-gradient(90deg,#35bfab_0%,#1fc9e7_100%)] text-white border border-white">7</span><span className="day">8</span><span className="day">9</span><span className="day">10</span><span className="day">11</span><span className="day">12</span>
            <span className="day">13</span><span className="day">14</span><span className="day">15</span><span className="day">16</span><span className="day">17</span><span className="day">18</span><span className="day">19</span>
            <span className="day">20</span><span className="day">21</span><span className="day">22</span><span className="day">23</span><span className="day">24</span><span className="day">25</span><span className="day">26</span>
            <span className="day">27</span><span className="day">28</span><span className="day">29</span><span className="day">30</span>
          </div>
        </article>

        <article className="card rounded-[40px] px-6 py-5">
          <h4 className="mb-3 text-sm text-[#7b888e]">随机推荐</h4>
          <div className="flex gap-3">
            <img className="h-12 w-12 rounded-xl object-cover" src="/assets/random-thumb.png" alt="" />
            <div>
              <h5 className="mb-1.5 text-sm font-medium">Python Lib &amp; Source Code</h5>
              <p className="text-xs leading-[1.35] text-[#7b888e]">Python 写出高质量工程代码。Views: 30,830 Marks: 624</p>
            </div>
          </div>
        </article>

        <article className="card flex items-center gap-3 rounded-[40px] px-5 py-3.5">
          <img src="/assets/icon-audio.svg" alt="" />
          <div>
            <p className="mb-1 text-sm text-[#7b888e]">Close To You</p>
            <div className="h-2 w-[147px] rounded-full bg-[rgba(255,255,255,0.4)]"></div>
          </div>
          <button className="ml-auto grid h-10 w-10 place-items-center rounded-full border-0 bg-white" aria-label="send"><img src="/assets/icon-send.svg" alt="" /></button>
        </article>
      </aside>
    </main>
  )
}

export default App
