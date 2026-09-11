/** Danish number formatting: 6.7 -> "6,7". */
export function kommatal(n: number, decimals = 1): string {
  return n.toLocaleString("da-DK", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const MONTHS = [
  "januar", "februar", "marts", "april", "maj", "juni",
  "juli", "august", "september", "oktober", "november", "december",
];

/** ISO date (YYYY-MM-DD) -> "22. juni 2026". Anything else is returned unchanged. */
export function formatDanishDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const month = MONTHS[Number(m[2]) - 1];
  if (!month) return iso;
  return `${Number(m[3])}. ${month} ${m[1]}`;
}
