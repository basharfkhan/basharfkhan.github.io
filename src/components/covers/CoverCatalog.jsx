// The front cover: a library catalog card, written in plain labelled
// lines so it reads clearly even to someone who has never used one.
function CoverCatalog({ chapters, appendixCount, onOpen }) {
  const rows = [
    {
      label: "Title",
      value: "Selected Work in Machine Learning & Data",
    },
    {
      label: "Education",
      value: "M.S. Data Science, Rochester Institute of Technology (expected Dec 2026)",
    },
    {
      label: "Contents",
      value: `${chapters.length} featured projects (${chapters.join(", ")}), plus ${appendixCount} more in the appendix`,
    },
    {
      label: "Subjects",
      value: "Machine learning · LLM systems · Data engineering",
    },
    {
      label: "Status",
      value: "Available: open to AI/ML Engineer and Data Scientist roles",
    },
  ];

  return (
    <div className="catalog-cover">

      <div className="catalog-head">
        <span className="catalog-kicker">
          From the library of
        </span>

        <h1>
          Bashar
          <br />
          Farooq Khan
        </h1>

        <p className="catalog-role">
          AI/ML Engineer &amp; Data Scientist
        </p>
      </div>


      <div className="catalog-card">

        <div className="catalog-card-top">
          <span>Author</span>
          <span>Khan, Bashar Farooq</span>
        </div>

        <dl className="catalog-rows">
          {rows.map((row) => (
            <div
              className="catalog-row"
              key={row.label}
            >
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>

        <span
          className="catalog-stamp"
          aria-hidden="true"
        >
          Available
        </span>

        <span className="catalog-hole" aria-hidden="true" />

      </div>


      <div className="catalog-actions">
        {onOpen && (
          <button
            className="catalog-open"
            onClick={onOpen}
          >
            Open the book →
          </button>
        )}

        <a
          href="https://github.com/basharfkhan"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>

        <a
          href="https://www.linkedin.com/in/basharfarooqkhan/"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>

    </div>
  );
}

export default CoverCatalog;
