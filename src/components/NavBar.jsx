import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ lang = "EN" }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = [
    {
      href: "/blog",
      label: lang === "EN" ? "Blog" : "博客",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 28 28"
          className="h-6 w-6"
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
      href: "/projects",
      label: lang === "EN" ? "Projects" : "项目",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 28 28"
          className="h-6 w-6"
        >
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            d="M4.426 17.494h5.745c.144 0 .238.039.335.131a.33.33 0 0 1 .115.275v5.694c0 .12-.03.191-.115.274a.43.43 0 0 1-.335.132H4.426a.4.4 0 0 1-.314-.122C4.035 23.802 4 23.73 4 23.594V17.9a.36.36 0 0 1 .118-.29c.078-.077.156-.116.308-.116Zm11.515 0h5.744c.107 0 .18.021.248.067l.065.055a.35.35 0 0 1 .112.284v5.694a.36.36 0 0 1-.115.287.39.39 0 0 1-.31.119H15.94a.44.44 0 0 1-.335-.132.33.33 0 0 1-.115-.274V17.9c0-.12.03-.192.115-.275a.43.43 0 0 1 .335-.13ZM19.195 4c.107 0 .197.023.287.084l.092.074 4.264 4.201v.001c.128.127.162.23.162.353 0 .124-.033.212-.145.316l-.008.008-.01.009-4.276 4.219c-.133.131-.239.166-.364.166-.127 0-.234-.037-.361-.163l-.003-.003-4.275-4.22a.42.42 0 0 1-.14-.332c0-.107.023-.194.082-.28l.072-.087 4.247-4.19A.5.5 0 0 1 19.195 4ZM4.425 6.155h5.746c.144 0 .238.04.335.132.083.08.115.148.115.275v5.67a.37.37 0 0 1-.128.298.4.4 0 0 1-.322.132H4.426a.37.37 0 0 1-.3-.119h.002A.4.4 0 0 1 4 12.231v-5.67l.007-.087a.35.35 0 0 1 .108-.2.4.4 0 0 1 .31-.119Z"
          />
        </svg>
      ),
    },
    {
      href: "/about",
      label: lang === "EN" ? "About" : "关于",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 28 28"
          className="h-6 w-6"
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
      href: "/recommendations",
      label: lang === "EN" ? "Recommendations" : "推荐",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 28 28"
          className="h-6 w-6"
        >
          <path
            fill="currentColor"
            d="M7.59 25.25c-.287 0-.57-.09-.814-.266a1.38 1.38 0 0 1-.57-1.237l.51-6.34-4.139-4.83a1.38 1.38 0 0 1-.266-1.335 1.38 1.38 0 0 1 1-.923l6.188-1.475 3.314-5.429A1.38 1.38 0 0 1 14 2.75c.488 0 .932.249 1.187.666l3.314 5.43 6.188 1.474a1.38 1.38 0 0 1 1 .923c.151.465.052.964-.267 1.335l-4.138 4.83.509 6.34c.04.487-.174.95-.57 1.237-.394.287-.899.347-1.351.158L14 22.698l-5.873 2.444a1.4 1.4 0 0 1-.536.109"
          />
        </svg>
      ),
    },
    {
        href: "/books",
        label: lang === "EN" ? "Books" : "书架",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
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
    <div className="fixed top-6 left-6 z-50 glass-card px-4 py-2 flex flex-nowrap items-center gap-4 w-max shadow-md border-white/60 dark:border-[#39ff14]/30">
      {/* 1. ADD state={{ fromNav: true }} HERE */}
      <Link
        to="/"
        state={{ fromNav: true }}
        className="shrink-0 flex items-center transition-transform hover:scale-105"
        title={lang === "EN" ? "Home" : "首页"}
      >
        <img
          src="/assets/avatar.jpg"
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full object-cover dark:brightness-90 dark:contrast-125"
          style={{ boxShadow: "rgb(226, 217, 206) 0px 8px 16px -5px" }}
        />
      </Link>

      <nav
        // FIX 3: Added shrink-0 and flex-nowrap to prevent the icons from squishing
        className="relative flex flex-nowrap items-center gap-2 shrink-0"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div
          className={`absolute left-0 h-11 w-11 rounded-full bg-white/60 dark:bg-[#39ff14]/20 border border-transparent dark:border-[#39ff14]/40 shadow-sm pointer-events-none transition-all duration-300 ease-out ${
            hoveredIndex !== null ? "opacity-100" : "opacity-0"
          }`}
          style={{
            // FIX 4: Replaced pixel math with REM math (2.75rem width + 0.5rem gap = 3.25rem).
            // This prevents the pill from drifting off-center if the user's browser has a non-standard font size.
            transform: `translateX(calc(${
              hoveredIndex !== null ? hoveredIndex : 0
            } * 3.25rem))`,
          }}
        />

        {navItems.map((item, i) => (
          <Link
            key={i}
            to={item.href}
            title={item.label}
            className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
            onMouseEnter={() => setHoveredIndex(i)}
          >
            <div
              className={`transition-colors duration-300 ${
                hoveredIndex === i
                  ? "text-[#35bfab] dark:text-[#39ff14]"
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {item.icon}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default NavBar;
