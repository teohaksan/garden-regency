/**
 * SectionDivider — Visual break between sections.
 * Renders a centered ornamental line with a small leaf icon.
 * Breaks up "flat green" feel between sections.
 */
export default function SectionDivider({ icon = 'leaf', label = '' }) {
  return (
    <div
      className="relative flex items-center justify-center py-2"
      aria-hidden="true"
    >
      <div
        className="absolute left-0 right-0 h-[1px]"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-border) 20%, var(--color-border) 80%, transparent)',
        }}
      ></div>
      <div
        className="relative flex items-center gap-3 px-5 py-1.5 rounded-full"
        style={{
          backgroundColor: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{ color: 'var(--color-accent)' }}
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1 6.67-1.2 13.07-8.2 17.04Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6" />
        </svg>
        {label && (
          <span
            className="text-[10px] tracking-[0.4em] uppercase font-[family-name:var(--font-body)]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
