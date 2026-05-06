import { useState, useEffect } from "react";
import { projectsData } from "../data/projectsData";
import { ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 14 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Reusable cover component with automatic fallback
function ProjectCover({ project }) {
  const [imgError, setImgError] = useState(false);

  // If no image path at all → show fancy title immediately
  if (!project.image) {
    return <FancyTitleCover title={project.title} />;
  }

  return (
    <div className="relative w-full h-56 overflow-hidden rounded-t-2xl border-b border-white/10 bg-zinc-950">
      {!imgError ? (
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          onError={() => setImgError(true)}
        />
      ) : (
        <FancyTitleCover title={project.title} />
      )}
    </div>
  );
}

function FancyTitleCover({ title }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px)] bg-[length:24px_24px]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[length:24px_24px]"></div>

      <div className="relative z-10 px-8 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-white/30"></div>
          <span className="font-mono text-[10px] uppercase tracking-[3px] text-white/50">OPEN SOURCE</span>
          <div className="h-px w-8 bg-white/30"></div>
        </div>

        <h3
          className="font-serif text-white text-balance leading-none tracking-[-0.025em]"
          style={{
            fontSize: title.length > 18 ? "1.35rem" : title.length > 14 ? "1.55rem" : "1.85rem",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
          }}
        >
          {title}
        </h3>

        <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      </div>
    </div>
  );
}

export default function ProjectsPage({ lang = "EN" }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold tracking-tighter">
            {lang === "EN" ? "My Projects" : "我的项目"}
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-white/70">
            {lang === "EN"
              ? "A collection of my open-source work and experiments."
              : "我的一些开源工作和实验性项目。"}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={project.id || index}
              className={`group bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Cover with automatic fallback */}
              <ProjectCover project={project} />

              {/* Content */}
              <div className="p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-semibold tracking-tight pr-4">
                    {project.title}
                  </h3>
                  <span className="text-sm text-white/50 font-mono shrink-0">
                    {project.year}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 text-xs bg-white/10 rounded-full text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-[15px] text-white/80 leading-relaxed">
                  {project.desc}
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  {project.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors"
                    >
                      {link.label === "GitHub" || link.url.includes("github.com") ? (
                        <GithubIcon size={15} />
                      ) : (
                        <ExternalLink size={15} />
                      )}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}