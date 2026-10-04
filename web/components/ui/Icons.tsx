/** YouTube Shorts mark (simplified). */
export function ShortsIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="YouTube Shorts" role="img">
      <path
        fill="#FF0033"
        d="M17.8 9.6 12.6 12.5l5.2 2.9a3.6 3.6 0 0 1-3.5 6.3l-8-4.4a3.6 3.6 0 0 1 0-6.3l1.5-.8-1.5-.9a3.6 3.6 0 0 1 3.5-6.3l8 4.4a3.6 3.6 0 0 1 0 6.3Z"
      />
      <path fill="#fff" d="m10 9.2 5 2.8-5 2.8V9.2Z" />
    </svg>
  );
}

export function VerifiedIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Verified" role="img">
      <path fill="var(--color-accent)" d="m12 2 2.4 1.8 3 .2.9 2.9 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-.9 2.9-3 .2L12 22l-2.4-1.8-3-.2-.9-2.9-2.4-1.8.9-2.9-.9-2.9 2.4-1.8.9-2.9 3-.2L12 2Z" />
      <path fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m8.5 12.2 2.3 2.3 4.7-4.9" />
    </svg>
  );
}

export function CheckCircle({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="var(--color-money)" />
      <path fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="m7.5 12.3 3 3 6-6.3" />
    </svg>
  );
}
