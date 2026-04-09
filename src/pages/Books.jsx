// src/pages/Books.jsx
import BookCard from '../components/BookCard';
import { Link } from 'react-router-dom'; // Changed from next/link
import { ArrowLeft } from 'lucide-react';
import { booksData } from '../data/booksData'; 

export default function BooksPage({ lang = "EN" }) {
  const groupedBooks = booksData.reduce((acc, book) => {
    if (!acc[book.yearRead]) acc[book.yearRead] = [];
    acc[book.yearRead].push(book);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedBooks).sort((a, b) => b - a);

  return (
    <main className="min-h-screen pt-24 pb-10 px-10 flex flex-col items-center">
      <div className="w-full max-w-6xl relative z-10">
        
        {/* 2. UPDATED text color to support light mode (text-gray-600) */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-[#35bfab] dark:hover:text-[#39ff14] transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          {lang === "EN" ? "Back to Home" : "返回首页"}
        </Link>

        {/* 3. UPDATED Title color to support light mode */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-16 text-left">
          {lang === "EN" ? "Library" : "书架"}
        </h1>
        
        {sortedYears.map((year) => (
          <div key={year} className="mb-16 w-full">
            {/* 4. UPDATED Year text and border colors to support light mode */}
            <h2 className="text-2xl font-mono font-semibold text-gray-800 dark:text-slate-300 mb-8 border-b border-gray-300 dark:border-slate-800 pb-2">
              {year}
            </h2>
            <div className="flex flex-wrap gap-12 justify-start">
              {groupedBooks[year].map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}