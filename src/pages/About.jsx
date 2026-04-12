import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // kept only for the interactive like-button animation
import { Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";

export default function AboutPage({ lang = "EN" }) {
  const [likes, setLikes] = useState(2474);
  const [isLiked, setIsLiked] = useState(false);
  const [mounted, setMounted] = useState(false); // triggers the smooth CSS entrance

  // Trigger animation once the component is mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = () => {
    if (!isLiked) {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    } else {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-10 px-6 flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-[800px] relative z-10">

        {/* Header — smooth CSS slide (no scale, as it is text) */}
        <div
          className={`mb-12 text-center transition-all duration-[650ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]
            ${mounted 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-[20px]"
            }`}
        >
          <h1 className="mb-3 text-4xl md:text-5xl font-bold tracking-tight text-gray-800 dark:text-white">
            JUSTIN YAGAMI
          </h1>
          <p className="text-gray-500 dark:text-[#39ff14]/70 text-lg tracking-widest">
            もしもし
          </p>
        </div>

        {/* Content Card — smooth CSS scale-up from smaller to full size */}
        <div
          className={`glass-card p-8 md:p-12 mb-8 origin-center transition-all duration-[650ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]
            ${mounted 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-[0.85] translate-y-[30px]"
            }`}
        >
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6 text-[15px] md:text-base">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              {lang === "EN" ? "Hi! ✨ I'm Justin" : "你好！✨ 我是 Justin"}
            </h2>

            <ul className="list-disc list-inside space-y-3 marker:text-[#35bfab] dark:marker:text-[#39ff14]">
              <li>
                {lang === "EN"
                  ? "🌱 Born 2004 — a recreational coder & open source enthusiast, currently working in Winnipeg, Canada."
                  : "🌱 生于 2004 — 一名业余程序员和开源爱好者，目前居于加拿大温尼伯市。"}
              </li>
              <li>
                {lang === "EN"
                  ? "I like to spend time reading, working out and anything interesting."
                  : "我喜欢把时间花在阅读，健身以及一切有趣的事情上。"}
              </li>
              <li>
                {lang === "EN"
                  ? "I'm grateful to live in an open-source world. Open-Source never dies!"
                  : "我很感激能生活在一个开源的世界里。开源万岁!"}
              </li>
              <li>
                {lang === "EN"
                  ? "I'm happy to contribute for free to fun projects & ideas, feel free to email me."
                  : "我很乐意免费为有趣的项目和想法做贡献，随时发邮件给我。"}
              </li>
              <li>
                {lang === "EN"
                  ? "If you're interested in what I'm building, welcome to join me."
                  : "如果你对我正在构建的东西感兴趣，欢迎加入我。"}
              </li>
            </ul>

            <blockquote className="my-8 border-l-4 border-[#35bfab] dark:border-[#39ff14] bg-white/40 dark:bg-[#111111]/60 p-5 rounded-r-2xl italic text-gray-600 dark:text-gray-300 shadow-sm">
              <p className="mb-3">
                "The mission of learning is to gain an understanding of various
                designs."
              </p>
              <p>
                "Attempt to achieve any sustainable behavior through automated
                means."
              </p>
            </blockquote>

            <p className="font-medium text-gray-800 dark:text-[#e5e7eb] bg-[#35bfab]/10 dark:bg-[#39ff14]/10 p-5 rounded-2xl">
              {lang === "EN"
                ? "For any suggestions/ideas/questions about the website, feel free to open an issue in the repo or email me~"
                : "关于网站的任何建议/想法/问题，请随时在仓库中提 Issue 或给我发邮件~"}
            </p>
          </div>
        </div>

        {/* Action Footer — smooth CSS scale-up with slight stagger */}
        <div
          className={`flex items-center justify-center gap-8 mt-12 transition-all duration-[650ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]
            ${mounted 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-[0.85] translate-y-[20px]"
            }`}
          style={{ transitionDelay: "80ms" }}
        >
          {/* GitHub Button */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="w-14 h-14 rounded-full glass-card hover-pop flex items-center justify-center text-gray-700 dark:text-[#39ff14] transition-colors"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>

          {/* Like Button */}
          <button
            onClick={handleLike}
            className="relative w-14 h-14 rounded-full glass-card hover-pop flex items-center justify-center group"
            aria-label="Like this page"
          >
            {/* Animated Counter Badge (Framer Motion kept for interactive feedback) */}
            <motion.span
              key={likes}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute -top-3 -right-4 bg-[#35bfab] dark:bg-[#1a1a1a] text-white dark:text-[#39ff14] border border-transparent dark:border-[#39ff14]/40 text-xs px-2.5 py-1 rounded-full shadow-sm font-mono"
            >
              {likes}
            </motion.span>

            <motion.div
              animate={isLiked ? { scale: [1, 1.4, 1] } : { scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Heart
                size={26}
                className={`transition-colors duration-300 ${
                  isLiked
                    ? "fill-rose-500 text-rose-500 dark:fill-[#39ff14] dark:text-[#39ff14]"
                    : "text-gray-400 dark:text-gray-500 group-hover:text-rose-400 dark:group-hover:text-[#39ff14]"
                }`}
              />
            </motion.div>
          </button>
        </div>
      </div>
    </main>
  );
}