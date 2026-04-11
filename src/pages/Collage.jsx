import { Link } from "react-router-dom";
import Collage from "../components/Collage";

export default function CollagePage({ lang = "EN" }) {
  return (
    <main className="min-h-screen pt-24 pb-10 px-10 flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-6xl relative z-10">
        
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-[#35bfab] transition-colors mb-8 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-1">
            <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
          </svg>
          {lang === "EN" ? "Back to Home" : "返回首页"}
        </Link>

        {/* Call the component */}
        <Collage />

      </div>
    </main>
  );
}