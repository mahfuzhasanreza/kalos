import type { SVGProps } from "react";

export const CloudSunIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 60 60"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    {...props}
  >
    <circle cx="24" cy="22" r="11" />
    <path d="M24 5v5M7 22h5M24 39v5M41 22h5M36.5 9.5l-3.5 3.5M14 34l3.5-3.5M14 10l3.5 3.5M36.5 34.5 33 31" />
    <path
      d="M34 31c7 0 12.5 5.5 12.5 12.5S41 56 34 56H18.5C10.6 56 4 49.4 4 41.5S10.6 27 18.5 27a14 14 0 0 1 15.5 4Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowRightIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12M13 7l5 5-5 5" />
  </svg>
);

export const ChipIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="8" y="8" width="16" height="16" rx="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 4v4m0 16v4m12-12h-4M8 16H4m4-8-2-2m2 18-2 2m18-18-2 2m2 14-2-2M12 12h8v8h-8z" />
  </svg>
);

export const NavWeatherIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 19a6 6 0 0 1 0-12 6.5 6.5 0 0 1 12.71-2.21A5 5 0 0 1 19.5 19H7Z" />
  </svg>
);

export const NavLeafIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 22c8.4-1.2 14.3-7.1 16-16-9.1 2.3-14.8 8.2-16 16Zm0 0c.3-5.8 3.6-9.3 9.7-12.7" />
  </svg>
);

export const NavBellIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 18v-3.5a7 7 0 1 0-14 0V18l-2 2a.75.75 0 0 0 .53 1.28h17a.75.75 0 0 0 .53-1.28L21 18Zm-7 5a2.5 2.5 0 0 0 2.5-2.5h-5A2.5 2.5 0 0 0 14 23Z" />
  </svg>
);

export const NavSettingsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 18.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m6.2 11.1 1.4-1.4 2 .8a1 1 0 0 0 1.3-.6l.9-2.2h2l.9 2.2a1 1 0 0 0 1.3.6l2-.8 1.4 1.4-.8 2a1 1 0 0 0 .6 1.3l2.2.9v2l-2.2.9a1 1 0 0 0-.6 1.3l.8 2-1.4 1.4-2-.8a1 1 0 0 0-1.3.6l-.9 2.2h-2l-.9-2.2a1 1 0 0 0-1.3-.6l-2 .8-1.4-1.4.8-2a1 1 0 0 0-.6-1.3l-2.2-.9v-2l2.2-.9a1 1 0 0 0 .6-1.3Z"
    />
  </svg>
);
