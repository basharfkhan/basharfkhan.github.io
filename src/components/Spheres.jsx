/*
  Page indicator. One sphere per page: infused for pages behind you, dun ahead.

  It lives in the controls below the book rather than on a page, for two
  reasons. The project results pages are scroll containers, so anything inside
  them scrolls out of view. And the controls sit outside the element that
  scales, so these stay full size when the book shrinks on a laptop.
*/

// Past this many pages the row gets cramped in the controls bar, so it
// collapses to a plain count instead.
const MAX_SPHERES = 30;

export default function Spheres({ total, current }) {
  if (!total) return null;

  if (total > MAX_SPHERES) {
    return (
      <div className="spheres spheres-overflow">
        <span className="sph lit now" />
        <span className="spheres-count">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    );
  }

  return (
    <div className="spheres">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={
            i < current ? "sph lit" : i === current ? "sph lit now" : "sph dun"
          }
        />
      ))}
    </div>
  );
}
