/*
  One block of a chapter's results pages. Which blocks land on which page is
  decided in portfolio.js, not here: pages are a fixed height, so the split has
  to be composed deliberately rather than measured at runtime, where the book's
  own scaling and late-loading images would keep moving the breaks.

  A block is either a name, or { name, from, to } to take a slice of the
  figures. Figure numbering always uses the index within the whole chapter, so
  splitting a run of figures across pages does not renumber them.
*/

function Figures({ project, chapterIndex, toRoman, from = 0, to }) {
  const all = project.images || [];
  const slice = all.slice(from, to ?? all.length);
  if (!slice.length) return null;

  // Keyed off the chapter's total, not this page's slice: a chapter with a run
  // of figures keeps the compact grid even on a page that happens to carry
  // only one, so splitting the run does not blow one figure up to full width.
  const compact = all.length > 1;
  // Five figures will not fit two to a row on a fixed-height page, so a long
  // run goes three up instead of spilling over.
  const dense = slice.length >= 5;

  return (
    <div
      className={`project-images ${compact ? "multiple-images" : ""} ${
        dense ? "dense-images" : ""
      }`}
    >
      {slice.map((image, i) => (
        <figure className="project-image-wrapper" key={image.src}>
          <img src={image.src} alt={image.alt} className="project-image" draggable="false" />
          <figcaption>
            <span className="fig-label">
              Fig. {toRoman(chapterIndex + 1)}.{from + i + 1}
            </span>
            {image.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function ResultBlock({ block, project, chapterIndex, toRoman }) {
  const name = typeof block === "string" ? block : block.name;

  switch (name) {
    case "epigraph":
      if (!project.epigraph) return null;
      return (
        <p className="epigraph">
          {project.epigraph.text}
          {project.epigraph.source && (
            <span className="epigraph-source">{project.epigraph.source}</span>
          )}
        </p>
      );

    // The build steps the opening page does not have room for. Without this
    // they were in the data but rendered nowhere.
    case "approachRest": {
      const rest = (project.approach || []).slice(3);
      if (!rest.length) return null;
      return (
        <div className="project-section">
          <span className="project-section-label">Continued</span>
          <ul className="project-approach">
            {rest.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }

    case "images":
      return (
        <Figures
          project={project}
          chapterIndex={chapterIndex}
          toRoman={toRoman}
          from={block.from}
          to={block.to}
        />
      );

    case "stats":
      return (
        <div className="project-stat-grid">
          {project.stats.map((stat) => (
            <div className="project-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      );

    case "highlights":
      return (
        <div className="project-results">
          <span className="project-section-label">Key Takeaways</span>
          <ul className="project-highlights">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      );

    case "links":
      return (
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noreferrer">
            View GitHub ↗
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">
              Live Demo ↗
            </a>
          )}
        </div>
      );

    default:
      return null;
  }
}
