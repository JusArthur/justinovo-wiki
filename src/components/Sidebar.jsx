import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ lang }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = [
    {
      label: lang === "EN" ? "Recent Posts" : "近期文章",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 28 28"
          className="h-7 w-7"
        >
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            d="M8.4 4.328H22.09c.657 0 1.084.163 1.355.4.267.231.479.616.543 1.258l.001.009.001.01c.122.975.036 2.068-.09 3.356h-2.56v12.262c0 .587-.13 1.026-.333 1.351-.184.294-.451.53-.816.707-.19.018-.377.058-.504.083-.22.044-.332.064-.397.064H6.066c-.696 0-1.237-.22-1.598-.569-.358-.344-.607-.876-.607-1.636v-.806H6.04V6.689c0-1.428 1.04-2.361 2.361-2.361Z"
          />
          <path
            fill="currentColor"
            d="M9.022 10.733h9.022c.778 0 1.09-.31 1.09-.622 0-.467-.467-.778-1.09-.778H9.022c-.466 0-.778.309-.778.778 0 .311.312.622.778.622"
          />
          <mask id="scroll-outline_svg__a" fill="#fff">
            <path d="M9.178 13.222c-.467 0-.778.156-.778.623 0 .526.1.655.622.777h4.511c.467 0 .778-.31.778-.777 0-.312-.311-.623-.778-.623z" />
          </mask>
          <path
            fill="currentColor"
            d="m9.022 14.622-.342 1.46.169.04h.173zm-.622-.777h1.5a.8.8 0 0 1-.079.326 1 1 0 0 1-.335.408c-.242.173-.427.143-.308.143v-3c-.349 0-.922.048-1.436.416-.615.44-.842 1.103-.842 1.707zm.778-.623v1.5h4.355v-3H9.178zm4.355 0v1.5a.65.65 0 0 1-.412-.166.93.93 0 0 1-.31-.711h3c0-1.349-1.208-2.123-2.278-2.123zm.778.623h-1.5a.73.73 0 0 1 .226-.497.73.73 0 0 1 .496-.226v3c.574 0 1.17-.198 1.625-.653s.653-1.05.653-1.624zm-.778.777v-1.5h-4.51v3h4.51zm-4.51 0 .34-1.46c-.098-.024-.09-.028-.04-.005.067.03.223.114.365.293.144.18.192.353.207.428.011.057.005.067.005-.034h-3c0 .249-.007.912.442 1.476.446.56 1.091.705 1.338.763z"
            mask="url(#scroll-outline_svg__a)"
          />
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            d="M6.2 20.82h11.5l1 3.28"
          />
          <path
            fill="currentColor"
            d="M20.59 9.499a.75.75 0 1 0 1.5.002l-.75-.001zm.75-3.554-.75.001zm0 3.555h.75v-.094l.001-1.156V5.944l-.75.001-.75.001a979 979 0 0 1 0 3.458v.095zm0-3.555.75-.001c0-.126.027-.345.124-.536a.7.7 0 0 1 .48-.384L22.5 4.3l-.194-.724a2.2 2.2 0 0 0-1.43 1.155 2.76 2.76 0 0 0-.286 1.215z"
          />
        </svg>
      ),
    },
    {
      label: lang === "EN" ? "My Projects" : "我的项目",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 28 28"
          className="h-7 w-7"
        >
          <path
            fill="currentColor"
            d="M10.171 5.156q.597 0 1.025.407.426.407.425.999v5.67q.001.588-.425 1.01-.426.42-1.025.42H4.425q-.596 0-1.012-.42A1.4 1.4 0 0 1 3 12.232v-5.67q0-.589.413-.999a1.39 1.39 0 0 1 1.012-.407zm0 11.338q.597 0 1.025.407.426.407.425 1v5.693q.001.588-.425.999A1.43 1.43 0 0 1 10.17 25H4.425q-.596 0-1.012-.407a1.34 1.34 0 0 1-.413-1V17.9q0-.589.413-.999a1.38 1.38 0 0 1 1.012-.407zm11.514 0q.597 0 1.012.407.414.407.413 1v5.693q0 .588-.413.999a1.39 1.39 0 0 1-1.012.407h-5.743q-.598 0-1.025-.407a1.32 1.32 0 0 1-.425-1V17.9q-.001-.589.425-.999a1.43 1.43 0 0 1 1.024-.407zm2.855-8.846q.461.454.46 1.065.001.611-.46 1.045l-4.276 4.219q-.459.454-1.066.453-.61 0-1.067-.453l-4.276-4.22a1.41 1.41 0 0 1-.437-1.044q0-.613.437-1.065l4.274-4.216A1.5 1.5 0 0 1 19.195 3q.61 0 1.067.432z"
          />
        </svg>
      ),
    },
    {
      label: lang === "EN" ? "About Site" : "关于网站",
      href: "/about",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 28 28"
          className="h-7 w-7"
        >
          <circle
            cx="14"
            cy="14"
            r="10"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
            d="M10 18c2.5 2.5 5.5 2.5 8 0"
          />
        </svg>
      ),
    },
    {
      label: lang === "EN" ? "Recommendations" : "推荐分享",
      href: "/recommendations",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 28 28"
          className="h-7 w-7"
        >
          <path
            fill="currentColor"
            d="M7.59 25.25c-.287 0-.57-.09-.814-.266a1.38 1.38 0 0 1-.57-1.237l.51-6.34-4.139-4.83a1.38 1.38 0 0 1-.266-1.335 1.38 1.38 0 0 1 1-.923l6.188-1.475 3.314-5.429A1.38 1.38 0 0 1 14 2.75c.488 0 .932.249 1.187.666l3.314 5.43 6.188 1.474a1.38 1.38 0 0 1 1 .923c.151.465.052.964-.267 1.335l-4.139 4.83.51 6.34c.039.487-.174.95-.57 1.237-.394.287-.899.347-1.351.158L14 22.698l-5.873 2.444a1.4 1.4 0 0 1-.536.109M14 21.037q.273 0 .533.107l5.591 2.327-.484-6.036a1.4 1.4 0 0 1 .33-1.015l3.94-4.599-5.89-1.404a1.4 1.4 0 0 1-.865-.628L14 4.62l-3.155 5.168a1.4 1.4 0 0 1-.866.628L4.09 11.82l3.941 4.598c.239.279.36.649.33 1.016l-.485 6.036 5.59-2.326q.261-.108.535-.108M18.398 8.82h.002z"
          />
        </svg>
      ),
    },
    {
      label: lang === "EN" ? "Books" : "书架",
      href: "/books",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-7 w-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25"
          />
        </svg>
      ),
    },
  ];

  return (
    <aside className="glass-card hover-pop p-6 w-[280px] rounded-3xl">
      <section className="mb-6 flex items-center gap-3">
        <img
          src="/assets/avatar.jpg"
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full object-cover bg-gray-200 dark:bg-gray-800 dark:brightness-90 dark:contrast-125"
          style={{ boxShadow: "rgb(226, 217, 206) 0px 12px 20px -5px" }}
        />
        <div>
          <h2 className="font-medium font-averia text-2xl text-gray-800 dark:text-white leading-none flex items-center gap-2">
            Justin-Yagami
          </h2>
          <span className="text-brand mt-1 inline-block text-xs font-medium text-[#35bfab] dark:text-[#39ff14]">
            {lang === "EN" ? "(In Dev)" : "(开发中)"}
          </span>
        </div>
      </section>

      <div className="text-secondary mt-6 mb-2 text-sm uppercase text-gray-400 dark:text-gray-500">
        General
      </div>

      <nav
        className="relative flex flex-col space-y-2"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div
          className={`absolute left-0 w-full rounded-full border border-gray-200 dark:border-[#39ff14]/30 bg-gradient-to-br from-gray-100 to-white dark:from-[#1a1a1a] dark:to-[#0a0a0a] pointer-events-none transition-all duration-300 ease-out shadow-sm ${
            hoveredIndex !== null ? "opacity-100" : "opacity-0"
          }`}
          style={{
            height: "52px",
            transform: `translateY(${
              hoveredIndex !== null ? hoveredIndex * (52 + 8) : 0
            }px)`,
          }}
        />
        {/* 2. CHANGE <a> to <Link> and use `to={item.href}` instead of `href="#"` */}
        {navItems.map((item, i) => (
          <Link
            key={i}
            to={item.href || "#"}
            className="group relative z-10 flex items-center gap-3 px-5 py-3 h-[52px] rounded-full text-[15px] text-gray-500 transition-colors"
            onMouseEnter={() => setHoveredIndex(i)}
          >
            {/* ICON COLOR LOGIC */}
            <div
              className={`flex h-7 w-7 items-center justify-center transition-colors duration-300 ${
                hoveredIndex === i
                  ? "text-[#35bfab] dark:text-[#39ff14]"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            >
              {item.icon}
            </div>

            {/* TEXT COLOR LOGIC */}
            <span
              className={`font-medium transition-colors duration-300 ${
                hoveredIndex === i
                  ? "text-gray-900 dark:text-[#e5e7eb]"
                  : "dark:text-gray-400"
              }`}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
