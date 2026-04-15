import { useState, useEffect } from "react";
import { projectsData } from "../data/projectsData";
import { ExternalLink } from "lucide-react";

// Custom GitHub Icon SVG component
const GithubIcon = ({ size = 14 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function ProjectsPage({ lang = "EN" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-[1200px] relative z-10">
        {/* Header Section */}
        <div
          className={`mb-16 text-center transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            {lang === "EN" ? "My Projects" : "我的项目"}
          </h1>
          <p className="text-gray-500 dark:text-[#39ff14]/70 text-lg">
            {lang === "EN"
              ? "A collection of my open-source work and experiments."
              : "我的一些开源工作和实验性项目。"}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className={`glass-card hover-pop p-6 flex flex-col gap-4 transition-all duration-[650ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                mounted
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-[0.9] translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Updated Image/Fancy Font Container */}
                <div className="h-16 w-16 rounded-xl bg-white/40 dark:bg-black/40 overflow-hidden border border-white/60 dark:border-[#39ff14]/20 shadow-sm flex items-center justify-center">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover dark:brightness-90"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center px-2 text-center">
                      <span
                        className="font-greeting-en text-[13px] leading-tight font-medium italic text-[#35bfab] dark:text-[#39ff14] select-none break-words"
                        style={{
                          fontSize: project.title.length > 14 ? "10px" : "13px",
                        }}
                      >
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <span className="text-gray-400 dark:text-[#39ff14]/50 text-sm font-mono">
                      {project.year}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-lg bg-white/50 dark:bg-[#39ff14]/10 text-xs text-gray-600 dark:text-[#39ff14] border border-white/20 dark:border-[#39ff14]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-3 mt-auto pt-2">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-black/40 border border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-[#35bfab] hover:text-white dark:hover:bg-[#39ff14] dark:hover:text-black transition-all"
                  >
                    {link.label === "GitHub" ||
                    (link.label === "Website" &&
                      link.url.includes("github.com")) ? (
                      <GithubIcon size={14} />
                    ) : (
                      <ExternalLink size={14} />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
