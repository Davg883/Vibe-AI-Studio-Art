
import React from 'react';

export const LoadingSpinner: React.FC<{className?: string}> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`animate-spin ${className}`}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const MagicWandIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 4V2"/>
        <path d="M15 10V8"/>
        <path d="M10 4V2"/>
        <path d="M10 10V8"/>
        <path d="M5 22v-5l-1-1v-5l1-1V5l1-1V2"/>
        <path d="M19 22v-5l1-1v-5l-1-1V5l-1-1V2"/>
        <path d="m15 2-3 3-3-3"/>
        <path d="m15 22-3-3-3 3"/>
        <path d="m10 8-3 3 3 3"/>
        <path d="m15 8 3 3-3 3"/>
    </svg>
);
