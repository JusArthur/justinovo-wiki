// src/components/BookCard.jsx
import React from 'react';

export default function BookCard({ 
  title, 
  author, 
  coverUrl, 
  review = ""   // New prop: your review text
}) {
  return (
    <div className="relative group w-48 h-72 [perspective:1200px] cursor-pointer mb-8">
      {/* Book Container */}
      <div className="w-full h-full relative transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] [transform-style:preserve-3d] origin-bottom 
                      [transform:rotateX(0deg)_translateY(0px)] 
                      group-hover:[transform:rotateX(75deg)_translateY(20px)] 
                      shadow-[0_10px_20px_rgba(0,0,0,0.3)] 
                      group-hover:shadow-[0_30px_30px_rgba(0,0,0,0.6)] 
                      bg-slate-800 rounded-r-md border-l-4 border-slate-900 z-10">
        
        {/* Front Cover */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:translateZ(1px)] overflow-hidden rounded-r-md bg-slate-800">
          {coverUrl ? (
            <img 
              src={coverUrl} 
              alt={title} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-white border border-slate-700 rounded-r-md">
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-sm text-slate-400">{author}</p>
            </div>
          )}
        </div>
        
        {/* Bottom edge (Pages) */}
        <div className="absolute top-full left-0 w-full h-8 bg-slate-100 origin-top [transform:rotateX(-90deg)] flex flex-col justify-evenly py-1 border border-slate-300">
          <div className="w-full h-[1px] bg-slate-300"></div>
          <div className="w-full h-[1px] bg-slate-300"></div>
          <div className="w-full h-[1px] bg-slate-300"></div>
        </div>
      </div>

      {/* Sticky Note - Appears on Hover */}
      {review && (
        <div className="absolute -top-6 -right-6 w-60 opacity-0 pointer-events-none 
                        group-hover:opacity-100 group-hover:pointer-events-auto 
                        transition-all duration-300 z-20">
          <div className="bg-[#fff8c4] dark:bg-[#3a2f1f] text-amber-950 dark:text-amber-100 
                          p-4 rounded-xl shadow-xl border border-amber-300 dark:border-amber-700 
                          text-sm leading-relaxed relative">
            
            {/* Sticky note fold effect */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-200 dark:bg-amber-800 
                            rotate-45 translate-x-1/2 -translate-y-1/2 shadow-sm"></div>
            
            <div className="font-medium text-amber-800 dark:text-amber-200 mb-1.5">My Review</div>
            <p className="text-amber-900 dark:text-amber-100">{review}</p>
            
            {/* Small tail pointing to the book */}
            <div className="absolute -bottom-2 left-8 w-4 h-4 bg-[#fff8c4] dark:bg-[#3a2f1f] 
                            border-r border-b border-amber-300 dark:border-amber-700 rotate-45"></div>
          </div>
        </div>
      )}

      {/* Optional title above the book */}
      <div className="absolute -top-12 left-0 right-0 text-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none z-0">
        <h3 className="font-bold text-white text-lg leading-tight">{title}</h3>
      </div>
    </div>
  );
}