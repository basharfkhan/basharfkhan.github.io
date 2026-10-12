const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

// Chapter numbers in Roman numerals: toRoman(1) -> "I".
export function toRoman(n) {
  return NUMERALS[n - 1] || String(n);
}
