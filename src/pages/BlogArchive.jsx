import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogData";

export default function BlogArchive() {
  // Group posts by year from ISO date strings (e.g., "2026-04-01")
  const groupedPosts = blogPosts.reduce((acc, post) => {
    const year = post.date.split("-")[0];
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(groupedPosts).sort((a, b) => b.localeCompare(a));

  return (
    <main className="flex flex-col items-center justify-center gap-6 px-6 pt-32 pb-12">
      {years.map((year) => (
        <div key={year} className="card relative w-full max-w-[840px] space-y-6 bg-white/50 dark:bg-black/20 p-6 rounded-xl border border-white/20">
          
          {/* Year Header */}
          <div className="mb-3 flex items-center justify-between gap-3 text-base">
            <div className="flex items-center gap-3">
              <div className="font-medium text-gray-800 dark:text-white font-mono">{year}</div>
              <div className="h-2 w-2 rounded-full bg-[#D9D9D9]"></div>
              <div className="text-secondary text-sm">
                {groupedPosts[year].length} posts
              </div>
            </div>
          </div>

          <div className="relative">
            {groupedPosts[year].map((post) => {
              const mmdd = post.date.slice(5); // Extract MM-DD

              return (
                <Link 
                  key={post.slug} 
                  to={`/blog/${post.slug}`} 
                  className="group flex min-h-10 items-center gap-3 py-3 transition-all cursor-pointer relative"
                >
                  {/* Date Column */}
                  <span className="text-secondary w-[44px] shrink-0 text-sm font-mono font-medium">
                    {mmdd}
                  </span>

                  {/* The Animated Timeline Dot & Vertical Line */}
                  <div className="relative flex h-2 w-2 items-center justify-center">
                    {/* The Dot: Expands from 5px to 16px (h-4) on hover */}
                    <div className="bg-gray-400 dark:bg-gray-600 group-hover:bg-brand h-[5px] w-[5px] rounded-full transition-all duration-300 group-hover:h-4"></div>
                    
                    {/* The Dashed Connector SVG: Visible above the dot */}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      fill="none" 
                      className="absolute bottom-4"
                    >
                      <path 
                        stroke="#AFAFAF" 
                        strokeOpacity="0.5" 
                        strokeLinecap="round" 
                        d="M8 .5v3M8 6.5v3M8 12.5v3" 
                      />
                    </svg>
                  </div>

                  {/* Title: Translates and changes color */}
                  <div className="flex-1 truncate text-sm font-medium transition-all duration-300 group-hover:text-brand group-hover:translate-x-2 text-gray-700 dark:text-gray-300">
                    {post.title}
                  </div>

                  {/* Tag (Hidden on small screens) */}
                  <div className="flex flex-wrap items-center gap-2 max-sm:hidden">
                    <span className="text-secondary text-xs opacity-60 font-mono">
                      {post.tags[0]}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}