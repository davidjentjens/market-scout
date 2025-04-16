// src/app/components/calendar/MonthSelector.tsx
import React from 'react';
import { Month } from '../../lib/types';

interface MonthSelectorProps {
  currentMonth: Month;
  onMonthChange: (month: Month) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  currentMonth,
  onMonthChange,
}) => {
  const months: Month[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get season for each month
  const getSeasonClass = (month: Month): string => {
    switch (month) {
      case 'December':
      case 'January':
      case 'February':
        return 'bg-blue-50 text-blue-800 hover:bg-blue-100';
      case 'March':
      case 'April':
      case 'May':
        return 'bg-primary-50 text-primary-800 hover:bg-primary-100';
      case 'June':
      case 'July':
      case 'August':
        return 'bg-yellow-50 text-yellow-800 hover:bg-yellow-100';
      case 'September':
      case 'October':
      case 'November':
        return 'bg-earth-50 text-earth-800 hover:bg-earth-100';
      default:
        return 'bg-primary-50 text-primary-800 hover:bg-primary-100';
    }
  };

  const getSelectedClass = (month: Month): string => {
    if (month === currentMonth) {
      switch (month) {
        case 'December':
        case 'January':
        case 'February':
          return 'bg-blue-600 text-white hover:bg-blue-700';
        case 'March':
        case 'April':
        case 'May':
          return 'bg-primary-600 text-white hover:bg-primary-700';
        case 'June':
        case 'July':
        case 'August':
          return 'bg-yellow-600 text-white hover:bg-yellow-700';
        case 'September':
        case 'October':
        case 'November':
          return 'bg-earth-600 text-white hover:bg-earth-700';
        default:
          return 'bg-primary-600 text-white hover:bg-primary-700';
      }
    }
    return getSeasonClass(month);
  };

  return (
    <div className="bg-earth-100 p-4">
      <h2 className="font-display text-2xl font-bold mb-4 text-center">Seasonal Calendar</h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-2">
        {months.map((month) => (
          <button
            key={month}
            className={`py-2 px-1 cursor-pointer text-sm rounded-md transition-colors font-medium ${getSelectedClass(month)}`}
            onClick={() => onMonthChange(month)}
            data-selected={month === currentMonth}
          >
            {month.substring(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthSelector;