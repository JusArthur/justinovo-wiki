import { useState, useEffect } from 'react';

const RealCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDate = today.getDate();
  
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const padDays = firstDay === 0 ? 6 : firstDay - 1; 
  
    const days = Array(padDays).fill(null).concat(Array.from({length: daysInMonth}, (_, i) => i + 1));
  
    return (
      // Added hover-pop here
      <article className="glass-card hover-pop p-6 w-full mt-2">
        <p className="mb-4 text-xs font-semibold text-gray-400 dark:text-gray-500">
          {currentYear}/{currentMonth + 1}/{currentDate}
        </p>
        <div className="grid grid-cols-7 gap-y-2 text-center mb-2">
          {['一', '二', '三', '四', '五', '六', '日'].map((day, i) => (
            <span key={day} className={`text-xs font-medium ${(today.getDay() === (i+1)%7) ? 'text-[#35bfab] dark:text-[#39ff14]' : 'text-gray-400 dark:text-gray-600'}`}>
              {day}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-2 justify-items-center">
          {days.map((day, i) => (
            <span key={i} className={`cal-day ${day === currentDate ? 'active' : ''} ${!day ? 'opacity-0' : ''}`}>
              {day}
            </span>
          ))}
        </div>
      </article>
    );
  };

export default RealCalendar;