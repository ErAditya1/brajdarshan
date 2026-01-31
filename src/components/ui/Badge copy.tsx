import React from 'react';
import { cn } from './Button';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'border-transparent bg-saffron-500 text-white hover:bg-saffron-600',
    secondary: 'border-transparent bg-peacock-100 text-peacock-600 hover:bg-peacock-200',
    outline: 'text-charcoal-900 border-gray-200 hover:bg-gray-50',
    success: 'border-transparent bg-green-100 text-green-700',
    warning: 'border-transparent bg-amber-100 text-amber-700',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
