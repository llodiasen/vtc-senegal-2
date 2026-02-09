'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface TimePickerProps {
  value: string; // Format HH:mm
  onChange: (time: string) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Générer les heures en incréments de 10 minutes
  const generateTimeOptions = () => {
    const options: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 10) {
        const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        options.push(timeString);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleTimeSelect = (time: string) => {
    onChange(time);
    setIsOpen(false);
  };

  const handleAsapClick = () => {
    // "Au plus tôt" = heure actuelle arrondie au prochain multiple de 10 minutes
    const now = new Date();
    const minutes = now.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 10) * 10;
    const hours = roundedMinutes >= 60 ? now.getHours() + 1 : now.getHours();
    const finalMinutes = roundedMinutes >= 60 ? 0 : roundedMinutes;
    const timeString = `${String(hours % 24).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`;
    onChange(timeString);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 cursor-pointer text-left"
      >
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Clock className="w-4 h-4" />
        </div>
        {value}
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 z-50 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden min-w-[200px] max-h-[300px] overflow-y-auto">
          {/* Au plus tôt */}
          <button
            type="button"
            onClick={handleAsapClick}
            className="w-full px-4 py-3 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-200"
          >
            Au plus tôt
          </button>

          {/* Séparateur */}
          <div className="border-b border-gray-200" />

          {/* Liste des heures */}
          <div className="max-h-[250px] overflow-y-auto">
            {timeOptions.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => handleTimeSelect(time)}
                className={cn(
                  'w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-50 transition-colors',
                  value === time && 'bg-primary-50 text-primary-600 font-medium'
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
