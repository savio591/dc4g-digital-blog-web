import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function dateFormat(dateISO: string | undefined | null): string {
  try {
    const dateFormattedLowerCase = format(
      parseISO(dateISO || "0"),
      "MMM dd, yyyy",
      {
        locale: ptBR,
      }
    );

    const firstCharacter = dateFormattedLowerCase.substring(0, 1);
    const restStrings = dateFormattedLowerCase.substring(1);
    return firstCharacter.toUpperCase() + restStrings;
  } catch {
    return "";
  }

  // return new Intl.DateTimeFormat("pt-BR", {
  //   month: "short",
  //   day: "numeric",
  //   year: "numeric",
  // }).format(new Date(dateISO || "0"));
}
