import { isSameColor } from "./lightHelpers";

describe("isSameColor", () => {
  test("returns true for the same color", () => {
    const Color1 = { r: 20, g: 255, b: 0 };
    const Color2 = { r: 20, g: 255, b: 0 };

    expect(isSameColor(Color1, Color2)).toBe(true);
  });
  test("returns false for a different red", () => {
    const Color1 = { r: 20, g: 255, b: 0 };
    const Color2 = { r: 200, g: 255, b: 0 };

    expect(isSameColor(Color1, Color2)).toBe(false);
  });
  test("returns false for a different green", () => {
    const Color1 = { r: 20, g: 255, b: 0 };
    const Color2 = { r: 20, g: 9, b: 0 };

    expect(isSameColor(Color1, Color2)).toBe(false);
  });
  test("returns false for a different blue", () => {
    const Color1 = { r: 20, g: 255, b: 0 };
    const Color2 = { r: 20, g: 255, b: 127 };

    expect(isSameColor(Color1, Color2)).toBe(false);
  });
});
