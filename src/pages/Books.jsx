// src/pages/Books.jsx
import BookCard from "../components/BookCard";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { booksData } from "../data/booksData";

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
        {/* Back to Home Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-[#35bfab] dark:hover:text-[#39ff14] transition-colors mb-8 group"
        >
          <ArrowLeft
            size={20}
            className="transition-transform group-hover:-translate-x-1"
          />
          {lang === "EN" ? "Back to Home" : "返回首页"}
        </Link>

        {/* Header Section */}
        <div className="flex items-end gap-6 justify-between flex-wrap-reverse lg:flex-nowrap mb-16">
          {/* Want to Read Tabs */}
          <ul className="mt-5 gap-x-6 gap-y-3 flex cursor-pointer flex-wrap">
            <li>
              <h3 className="text-base my-4 text-gray-900 dark:text-gray-100">
                <span className="underline-offset-8 underline decoration-blue-500 decoration-2">
                  Want to Read
                </span>
                <sup className="pl-[2px] text-[10px]">0</sup>
              </h3>
            </li>
          </ul>

          {/* Reading List Box with Custom Gradient Background */}
          <div 
            className="w-full mt-2 lg:mt-0 max-w-md text-gray-50 rounded-3xl p-6 bg-[linear-gradient(to_right_bottom,#334255_20%,#1d2530_150%)]"
          >
            <div className="whitespace-nowrap text-orange-400 text-4xl mb-2 font-bold">
              Reading List
            </div>
            I have read 150+ books over the last five years.{" "}
            <br />
            Here are books I highly recommend!
          </div>
        </div>

        {/* Books by Year */}
        {sortedYears.map((year) => (
          <div key={year} className="mb-16 w-full">
            <h2 className="text-2xl font-mono font-semibold text-gray-800 dark:text-slate-300 mb-8 border-b border-gray-300 dark:border-slate-800 pb-2">
              {year}
            </h2>
            <div className="flex flex-wrap gap-12 justify-start">
              {groupedBooks[year].map((book) => (
                <BookCard key={book.id} 
                              {...book}
                          review = {book.review} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}