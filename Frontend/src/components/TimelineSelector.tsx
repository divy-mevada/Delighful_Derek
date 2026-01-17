import React from 'react';
import type { TimelineOption } from '../types';

interface TimelineSelectorProps {
  options: TimelineOption[];
  selected: string;
  onChange: (value: string) => void;
}

export const TimelineSelector: React.FC<TimelineSelectorProps> = ({
  options,
  selected,
  onChange
}) => {
  return (
    <div className="flex space-x-2">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${selected === option.value
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};