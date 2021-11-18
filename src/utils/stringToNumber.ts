export function stringToNumber(numberAsString: string | string[] | undefined): number {
  try {
    const parsedString = Number(numberAsString);

    if (isNaN(parsedString)) {
      throw new Error("String is not a number... Err.. You understand this.");
    }

    return parsedString;
  } catch {
    return 0;
  }
}
