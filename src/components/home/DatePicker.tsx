'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const FIXED_DATE_SSR = new Date('2024-01-01');

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState<Date>(() => FIXED_DATE_SSR);
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (!value) return FIXED_DATE_SSR;
    return new Date(value.getFullYear(), value.getMonth(), 1);
  });

  useEffect(() => {
    setToday(new Date());
  }, []);

  const effectiveMinDate = minDate ?? FIXED_DATE_SSR;

  const daysOfWeek = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days = [];
    // Jours du mois actuel - limité à 30 jours maximum
    const maxDays = Math.min(daysInMonth, 30);
    for (let i = 1; i <= maxDays; i++) {
      const dayDate = new Date(year, month, i);
      days.push({
        date: i,
        isCurrentMonth: true,
        isToday: dayDate.toDateString() === today.toDateString(),
        isSelected: dayDate.toDateString() === value.toDateString(),
        fullDate: dayDate,
      });
    }
    return days;
  };

  const handleDateSelect = (day: any) => {
    if (day.fullDate && day.isCurrentMonth) {
      const newDate = new Date(day.fullDate);
      if (newDate >= effectiveMinDate) {
        onChange(newDate);
        setIsOpen(false);
      }
    }
  };

  const handleTodayClick = () => {
    const now = new Date();
    if (now >= effectiveMinDate) {
      onChange(now);
      setIsOpen(false);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatDateDisplay = (date: Date) => {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Aujourd\'hui';
    }
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Demain';
    }
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 cursor-pointer text-left"
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Calendar className="w-4 h-4" />
        </div>
        {formatDateDisplay(value)}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full left-0 mb-2 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[320px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <button
                type="button"
                onClick={() => navigateMonth('prev')}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <h3 className="text-sm font-semibold text-gray-900">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                type="button"
                onClick={() => navigateMonth('next')}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Days of week */}
            <div className="hidden md:grid grid-cols-7 gap-1 mb-1.5">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-2 md:grid-cols-7 gap-1 mb-3">
              {days.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                    disabled={!day.isCurrentMonth || (day.fullDate && day.fullDate < effectiveMinDate)}
                  className={cn(
                    'aspect-square flex items-center justify-center text-xs md:text-sm rounded-lg transition-colors',
                    day.isSelected
                      ? 'bg-gray-900 text-white font-semibold'
                      : day.isCurrentMonth
                      ? 'text-gray-900 hover:bg-gray-100'
                      : 'text-gray-400',
                    !day.isCurrentMonth && 'opacity-50',
                    day.fullDate && day.fullDate < effectiveMinDate && 'opacity-30 cursor-not-allowed'
                  )}
                >
                  {day.date}
                </button>
              ))}
            </div>

            {/* Footer - Aujourd'hui */}
            <button
              type="button"
              onClick={handleTodayClick}
              className="w-full flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-900">Aujourd&apos;hui</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
