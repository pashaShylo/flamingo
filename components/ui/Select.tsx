"use client";

import { forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly SelectOption[];
  className?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className = '', ...rest }, ref) => {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            className="w-full pl-3 pr-10 py-2 border border-gray-300 text-gray-600 rounded-lg cursor-pointer appearance-none bg-white"
            {...rest}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
