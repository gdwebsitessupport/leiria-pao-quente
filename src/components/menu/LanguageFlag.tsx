type LanguageFlagProps = {
  locale: "pt" | "en";
  className?: string;
};

export function LanguageFlag({ locale, className = "" }: LanguageFlagProps) {
  const sharedClassName = `h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] ${className}`.trim();

  if (locale === "pt") {
    return (
      <svg
        aria-hidden="true"
        className={sharedClassName}
        viewBox="0 0 20 14"
        role="presentation"
      >
        <rect width="20" height="14" fill="#da291c" />
        <rect width="8" height="14" fill="#046a38" />
        <circle cx="8" cy="7" r="3.15" fill="#ffcd00" />
        <circle cx="8" cy="7" r="2.2" fill="#fff" />
        <path d="M6.25 5.4h3.5v1.55c0 1.25-.78 2.1-1.75 2.55-.97-.45-1.75-1.3-1.75-2.55V5.4Z" fill="#da291c" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={sharedClassName}
      viewBox="0 0 20 14"
      role="presentation"
    >
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0 20 14M20 0 0 14" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0 20 14M20 0 0 14" stroke="#c8102e" strokeWidth="1.8" />
      <path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="5.2" />
      <path d="M10 0v14M0 7h20" stroke="#c8102e" strokeWidth="3.1" />
    </svg>
  );
}
