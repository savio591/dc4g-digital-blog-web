import { dateFormat } from "../../utils/dateFormat";

describe("Date formatter", () => {
  it("Format an ISO String", () => {
    const isoDate = "2021-11-16T00:00:00-03:00";
    const dateFormatted = dateFormat(isoDate);
    expect(dateFormatted).toBe("Nov 16, 2021");
  });

  it("Threating if date is null", () => {
    const isoDate = null;
    const dateFormatted = dateFormat(isoDate);
    expect(dateFormatted).toBe("");
  });

  it("Threating if date is undefined", () => {
    const isoDate = undefined;
    const dateFormatted = dateFormat(isoDate);
    expect(dateFormatted).toBe("");
  });
});
