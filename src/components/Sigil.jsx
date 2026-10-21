/*
  Chapter sigils. Each one is bilaterally symmetric, which is the single
  convention that makes the set read as a set rather than as clip art.

  Stroke width is set per size rather than scaled with the viewBox: a hairline
  that looks right at 34px closes into a blob at 15px, and the book scales down
  to 0.75 on a laptop on top of that.
*/

const GLYPHS = {
  // an open book, two leaves falling from a centre spine
  book: (
    <>
      <path d="M0 -5 C-6 -11, -13 -11, -18 -6 L-18 7 C-13 2, -6 2, 0 8" />
      <path d="M0 -5 C6 -11, 13 -11, 18 -6 L18 7 C13 2, 6 2, 0 8" />
      <path d="M0 -5 L0 8" />
    </>
  ),

  // two tracks converging on a point: the conflict itself
  converge: (
    <>
      <path d="M-19 13 Q-9 2 0 -6" />
      <path d="M19 13 Q9 2 0 -6" />
      <path d="M-15 17 L-11 9" />
      <path d="M15 17 L11 9" />
    </>
  ),

  // a source with retrieved lines drawn into it
  lens: (
    <>
      <path d="M0 -14 Q11 0 0 14 Q-11 0 0 -14 Z" />
      <path d="M0 -5 L0 5" />
      <path d="M-20 -9 L-11 -4" />
      <path d="M20 -9 L11 -4" />
      <path d="M-20 9 L-11 4" />
      <path d="M20 9 L11 4" />
    </>
  ),

  // a document, for the externship
  page: (
    <>
      <path d="M-11 -11 L-11 14 L11 14 L11 -11 Z" />
      <path d="M-5 -4 L5 -4" />
      <path d="M-5 2 L5 2" />
      <path d="M-5 8 L5 8" />
    </>
  ),
};

// The gem above the glyph is the mark the set shares.
const GEM = <path d="M0 -17 L4.5 -12 L0 -7 L-4.5 -12 Z" />;

export default function Sigil({ name, size = 34, gem = true, className = "" }) {
  const glyph = GLYPHS[name];
  if (!glyph) return null;

  // Thicken as it shrinks, so it stays legible rather than fading out.
  const stroke = size >= 30 ? 1.9 : size >= 20 ? 2.6 : 3.4;

  return (
    <svg
      className={`sigil ${className}`}
      width={size}
      height={size}
      viewBox="-26 -26 52 52"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {glyph}
      {gem && size >= 20 ? GEM : null}
    </svg>
  );
}
