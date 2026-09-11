/**
 * Approved v2 logo artwork (raster masters, served as AVIF > WebP > PNG).
 * The wordmark must never be rebuilt as live text; see the brand handoff.
 */
type LogoProps = {
  kind?: "wordmark" | "mark";
  variant?: "dark" | "light";
  className?: string;
  decorative?: boolean;
};

const FILES = {
  wordmark: { dark: "logo-wordmark-dark-1600", light: "logo-wordmark-light-1600", width: 1600, height: 283 },
  mark: { dark: "logo-mark-dark-512", light: "logo-mark-light-512", width: 512, height: 512 },
} as const;

export function Logo({ kind = "wordmark", variant = "dark", className = "", decorative = false }: LogoProps) {
  const file = FILES[kind];
  const base = `/brand/${file[variant]}`;
  return (
    <picture className="contents">
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img
        src={`${base}.png`}
        width={file.width}
        height={file.height}
        alt={decorative ? "" : "Din LCA Hjælper"}
        aria-hidden={decorative || undefined}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
