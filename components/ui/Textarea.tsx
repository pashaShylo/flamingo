"use client";

import { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...rest }, ref) => {
    return (
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <textarea
          ref={ref}
          className={`w-full px-3 py-2 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-lg resize-none`}
          rows={4}
          {...rest}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
