import { useState, useEffect } from "react";
import { recommendationsData } from "../data/recommedationsData";

// You can move this to a dedicated src/data/recommendationsData.js later

const categories = [
  "全部",
  "My Column",
  "OS",
  "LLM",
  "Tools/Methods",
  "DB",
  "IoT/Embedded",
  "Backend",
  "Frontend",
  "Domain",
  "Programming Language",
  "Learning",
  "Track",
];

export default function RecommendationsPage({ lang = "EN" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("全部");
  const [mounted, setMounted] = useState(false); // triggers the CSS transition once

  // Trigger smooth entrance animation after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 10); // tiny delay ensures DOM is fully ready
    return () => clearTimeout(timer);
  }, []);

  const filteredData = recommendationsData.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "全部" ||
      item.tags.includes(activeCategory) ||
      item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen pt-24 pb-10 px-6 flex flex-col items-center">
      <div className="w-full max-w-7xl relative z-10">
        {/* Search & Filter — completely static, no animation as requested */}
        <div className="mb-12 space-y-6">
          <input
            type="text"
            placeholder={lang === "EN" ? "Search resources..." : "搜索资源..."}
            className="focus:ring-[#35bfab] dark:focus:ring-[#39ff14] mx-auto block w-full max-w-md rounded-xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-[#111111]/60 px-4 py-3 text-gray-800 dark:text-gray-200 focus:ring-2 focus:outline-none shadow-sm backdrop-blur-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors border shadow-sm ${
                  activeCategory === cat
                    ? "bg-[#35bfab] text-white border-[#35bfab] dark:bg-[#39ff14] dark:text-black dark:border-[#39ff14] font-medium"
                    : "bg-white/60 text-gray-700 border-gray-200 hover:bg-gray-100 dark:bg-black/40 dark:text-gray-300 dark:border-gray-800 dark:hover:bg-gray-800 backdrop-blur-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid — plain div, no Framer Motion */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((item, index) => (
            <div
              key={item.id}
              className={`glass-card hover-pop relative block overflow-hidden p-5 
                  transition-all duration-[650ms] 
                  ease-[cubic-bezier(0.25,0.1,0.25,1)]   /* extremely smooth, continuous ease-out */
                  ${
                    mounted
                      ? "scale-100 opacity-100 translate-y-0"
                      : "scale-[0.65] opacity-0 translate-y-[55px]"
                  }`}
              style={{
                transitionDelay: `${index * 40}ms`, // gentle staggered reveal (optional but polished)
              }}
            >
              {/* Your existing card content remains 100% unchanged */}
              <div className="mb-4 flex items-center gap-4">
                <div className="group relative shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-90"
                    />
                  ) : (
                    <div className="text-center px-6">
                      <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/70 mt-2">
                        Open Source Resource
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="group-hover:text-[#35bfab] dark:group-hover:text-[#39ff14] text-lg font-bold transition-colors text-gray-800 dark:text-white truncate">
                    {item.title}
                  </h3>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-[#35bfab] dark:text-gray-400 dark:hover:text-[#39ff14] mt-1 block max-w-full truncate text-xs hover:underline"
                  >
                    {item.url}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className={
                      i < item.stars
                        ? "fill-yellow-400"
                        : "fill-gray-300 dark:fill-gray-600"
                    }
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#35bfab]/10 text-[#35bfab] dark:bg-[#39ff14]/10 dark:text-[#39ff14] rounded-full px-2.5 py-0.5 text-xs font-medium border border-[#35bfab]/20 dark:border-[#39ff14]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-gray-600 dark:text-gray-400 line-clamp-3">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
