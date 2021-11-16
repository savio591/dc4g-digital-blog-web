export function dateFormat(dateISO: string | undefined | null): string {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateISO || "0"));
}
