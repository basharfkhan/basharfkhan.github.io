import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import BookPage from "./BookPage";
import AppendixEntry from "./AppendixEntry";
import { toRoman } from "./roman";
import CoverCatalog from "./covers/CoverCatalog";
import { projects } from "../data/portfolio";

function Book() {
  const book = useRef();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(
    10 + projects.filter((p) => p.featured).length * 2
  );

  // Flagship projects get a full two-page chapter;
  // everything else is listed compactly in the appendix.
  const chapters = projects.filter((p) => p.featured);
  const appendix = projects.filter((p) => !p.featured);
  const appendixSplit = Math.ceil(appendix.length / 2);
  const appendixPages = [
    appendix.slice(0, appendixSplit),
    appendix.slice(appendixSplit),
  ];

  // Important page locations
  // 0 cover · 1 ex libris · 2 contents · 3 about · 4 skills
  // 5+ chapters (2 pages each) · appendix (2 pages) · education
  // · leadership · back cover
  const afterChapters = 5 + chapters.length * 2;
  const pageIndex = {
    home: 0,
    contents: 2,
    about: 3,
    skills: 4,
    projects: 5,
    appendix: afterChapters,
    education: afterChapters + 2,
    leadership: afterChapters + 3,
    contact: afterChapters + 4,
  };

  const contents = [
    {
      group: "Front Matter",
      entries: [
        { label: "About", page: pageIndex.about },
        { label: "Skills", page: pageIndex.skills },
      ],
    },
    {
      group: "Selected Work",
      entries: chapters.map((project, i) => ({
        numeral: toRoman(i + 1),
        label: project.title.split(":")[0],
        page: pageIndex.projects + i * 2,
      })),
    },
    {
      group: "Back Matter",
      entries: [
        { label: "Appendix: Further Work", page: pageIndex.appendix },
        { label: "Education", page: pageIndex.education },
        { label: "Leadership", page: pageIndex.leadership },
        { label: "Contact", page: pageIndex.contact },
      ],
    },
  ];

  const pageLabel = (page) => String(page + 1).padStart(2, "0");


  const goToPage = (page) => {
    const pageFlip = book.current?.pageFlip();

    if (pageFlip) {
      pageFlip.flip(page, "bottom");
    }
  };

  const handleFlip = (e) => {
    setCurrentPage(Number(e.data));
  };

  const handleInit = (e) => {
    const pageFlip = e.object;

    if (pageFlip) {
      setTotalPages(pageFlip.getPageCount());
    }
  };

  const getSectionLabel = (page) => {
    if (page === 0) return "COVER";

    if (page <= 2) {
      return "CONTENTS";
    }

    if (page <= pageIndex.skills) {
      return "ABOUT · SKILLS";
    }

    if (page >= pageIndex.appendix && page < pageIndex.education) {
      return "APPENDIX";
    }

    if (page >= pageIndex.projects && page < pageIndex.appendix) {
      const projectPageOffset = page - pageIndex.projects;
      const projectNumber = Math.floor(projectPageOffset / 2) + 1;

      return `CHAPTER ${toRoman(projectNumber)}`;
    }

    if (page === pageIndex.education) {
      return "EDUCATION";
    }

    if (page === pageIndex.leadership) {
      return "LEADERSHIP";
    }

    return "CONTACT";
  };

  return (
    <div className="desktop-book">

      {/* ========================
          NAVIGATION
      ======================== */}
      <nav className="book-nav">

        <button
          className="nav-brand"
          onClick={() => goToPage(pageIndex.home)}
        >
          BASHAR KHAN
        </button>

        <div className="nav-links">

          <button
            onClick={() => goToPage(pageIndex.contents)}
          >
            Contents
          </button>

          <button
            onClick={() => goToPage(pageIndex.about)}
          >
            About
          </button>

          <button
            onClick={() => goToPage(pageIndex.projects)}
          >
            Projects
          </button>

          <button
            onClick={() => goToPage(pageIndex.education)}
          >
            Education
          </button>

          <button
            onClick={() => goToPage(pageIndex.leadership)}
          >
            Leadership
          </button>

          <button
            onClick={() => goToPage(pageIndex.contact)}
          >
            Contact
          </button>

        </div>

      </nav>


      {/* ========================
          BOOK
      ======================== */}
      <div
        className={`book-stage ${
            currentPage === 0
            ? "front-cover-view"
            : currentPage >= totalPages - 1
                ? "back-cover-view"
                : ""
        }`}
      >
        <HTMLFlipBook
            ref={book}

            width={550}
            height={700}

            minWidth={450}
            maxWidth={600}

            minHeight={580}
            maxHeight={760}

            size="stretch"

            showCover={true}

            maxShadowOpacity={0.35}

            mobileScrollSupport={true}

            className="portfolio-book"

            onFlip={handleFlip}
            onInit={handleInit}
        >

            {/* ========================
                FRONT COVER
            ======================== */}
            <BookPage className="cover">

              <CoverCatalog
                chapters={chapters.map((p) => p.title.split(":")[0])}
                appendixCount={appendix.length}
                onOpen={() => goToPage(pageIndex.contents)}
              />

            </BookPage>


            {/* ========================
                EX LIBRIS (inside cover)
            ======================== */}
            <BookPage className="endpaper">

              <div className="ex-libris">

                <span className="ex-libris-label">
                  Ex Libris
                </span>

                <div className="ex-libris-rule" />

                <h2>
                  Bashar Farooq Khan
                </h2>

                <p>
                  Selected work in machine learning, LLM systems
                  and data engineering.
                </p>

                <span className="ex-libris-meta">
                  basharkhan.dev
                </span>

              </div>

            </BookPage>


            {/* ========================
                CONTENTS
            ======================== */}
            <BookPage className="contents-page">

              <p className="eyebrow">
                Contents
              </p>

              <h2>
                In This Volume
              </h2>

              {contents.map((section) => (

                <div
                  className="contents-section"
                  key={section.group}
                >

                  <span className="contents-group">
                    {section.group}
                  </span>

                  <ul className="contents-list">

                    {section.entries.map((entry) => (

                      <li key={entry.label}>

                        <button
                          className="contents-entry"
                          onClick={() => goToPage(entry.page)}
                        >

                          <span className="contents-numeral">
                            {entry.numeral || ""}
                          </span>

                          <span className="contents-label">
                            {entry.label}
                          </span>

                          <span
                            className="contents-dots"
                            aria-hidden="true"
                          />

                          <span className="contents-page-number">
                            {pageLabel(entry.page)}
                          </span>

                        </button>

                      </li>

                    ))}

                  </ul>

                </div>

              ))}

            </BookPage>


            {/* ========================
                ABOUT
            ======================== */}
            <BookPage>

             <span className="page-number">
                01
             </span>

             <p className="eyebrow">
                About
             </p>

             <h2>
                Turning data into decisions.
             </h2>

             <p className="drop-cap">
                I'm a Data Science graduate student at Rochester
                Institute of Technology, interested in machine learning
                and AI. I enjoy building systems that turn raw data into
                useful predictions and analytical products.
             </p>

             <p>
                I like working across the full lifecycle: collecting and
                cleaning the data, modelling, deployment, and being
                careful about what the results actually support.
             </p>

             <p>
                I'm looking for AI/ML Engineer and Data Scientist
                roles.
             </p>

            </BookPage>


            {/* ========================
                SKILLS
            ======================== */}
            <BookPage>

            <span className="page-number">
                02
            </span>

            <p className="eyebrow">
                Technical Toolkit
            </p>

            <h2>
                Skills
            </h2>

            <h3>
                Languages
            </h3>

            <p>
                Python · SQL · Java · JavaScript · TypeScript · R
            </p>

            <h3>
                Machine Learning
            </h3>

            <p>
                PyTorch · Transformers · LSTMs · Multimodal
                prediction · Calibration · scikit-learn ·
                XGBoost · LightGBM · MLflow
            </p>

            <h3>
                LLMs &amp; Agents
            </h3>

            <p>
                Claude API · Tool-using agents · RAG ·
                BM25 &amp; hybrid retrieval · LLM evaluation
            </p>

            <h3>
                Data &amp; Infrastructure
            </h3>

            <p>
                PySpark · Airflow · Kafka · BigQuery ·
                FastAPI · Docker · GitHub Actions · AWS
            </p>

            <h3>
                Databases
            </h3>

            <p>
                PostgreSQL + pgvector · MySQL · MongoDB · Redis
            </p>

            </BookPage>


            {/* ========================
                PROJECTS
            ======================== */}
            {chapters.flatMap((project, chapterIndex) => [

              /* ======================================================
                LEFT PAGE — PROJECT OVERVIEW
              ====================================================== */

              <BookPage
                key={`${project.number}-intro`}
                className="project-intro-page"
              >

                <span className="page-number">
                  {toRoman(chapterIndex + 1)}
                </span>

                <p className="eyebrow">
                  {project.type}
                </p>

                <p className="chapter-label">
                  Chapter {toRoman(chapterIndex + 1)}
                </p>

                <h2>
                  {project.title}
                </h2>

                <h3 className="project-subtitle">
                  {project.subtitle}
                </h3>


                <div className="project-section">

                  <span className="project-section-label">
                    The Problem
                  </span>

                  <p className="drop-cap">
                    {project.problem}
                  </p>

                </div>


                <div className="project-section">

                  <span className="project-section-label">
                    What I Did
                  </span>

                  <ul className="project-approach">

                    {project.approach.slice(0, 3).map((item) => (

                      <li key={item}>
                        {item}
                      </li>

                    ))}

                  </ul>

                </div>


                <div className="tech-list">

                  {project.technologies.map((tech) => (

                    <span key={tech}>
                      {tech}
                    </span>

                  ))}

                </div>

              </BookPage>,


              /* ======================================================
                RIGHT PAGE — CASE STUDY
              ====================================================== */

              <BookPage
                key={`${project.number}-details`}
                className="project-detail-page"
              >

                <p className="eyebrow">
                  Chapter {toRoman(chapterIndex + 1)} · Case Study
                </p>

                <h2>
                  Architecture & Results
                </h2>


                {/* Project Images */}

                {project.images && project.images.length > 0 && (
                  <div
                    className={`project-images ${
                      project.images.length > 1 ? "multiple-images" : ""
                    }`}
                  >
                    {project.images.map((image) => (
                      <figure
                        className="project-image-wrapper"
                        key={image.src}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="project-image"
                          draggable="false"
                        />

                        {image.caption && (
                          <figcaption>
                            {image.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                )}


                {/* Project statistics */}

                <div className="project-stat-grid">

                  {project.stats.map((stat) => (

                    <div
                      className="project-stat"
                      key={stat.label}
                    >

                      <strong>
                        {stat.value}
                      </strong>

                      <span>
                        {stat.label}
                      </span>

                    </div>

                  ))}

                </div>


                {/* Key results */}

                <div className="project-results">

                  <span className="project-section-label">
                    Key Takeaways
                  </span>

                  <ul className="project-highlights">

                    {project.highlights.map((highlight) => (

                      <li key={highlight}>
                        {highlight}
                      </li>

                    ))}

                  </ul>

                </div>


                {/* Links */}

                <div className="project-links">

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View GitHub ↗
                  </a>


                  {project.demo && (

                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo ↗
                    </a>

                  )}

                </div>

              </BookPage>, 

            ])}


            {/* ========================
                APPENDIX (two pages)
            ======================== */}
            {appendixPages.map((items, pageNo) => (

              <BookPage
                key={`appendix-${pageNo}`}
                className="appendix-page"
              >

                <p className="eyebrow">
                  {pageNo === 0 ? "Appendix" : "Appendix · Continued"}
                </p>

                {pageNo === 0 && (
                  <>
                    <h2>
                      Further Work
                    </h2>

                    <p className="appendix-intro">
                      Smaller projects in modelling, data engineering
                      and analysis.
                    </p>
                  </>
                )}

                {items.map((project) => (

                  <AppendixEntry
                    key={project.number}
                    project={project}
                  />

                ))}

              </BookPage>

            ))}


            {/* ========================
                EDUCATION
            ======================== */}
            <BookPage>

            <p className="eyebrow">
                Education
            </p>

            <h2>
                Education
            </h2>

            <div className="education-entry">

                <h3>
                Rochester Institute of Technology
                </h3>

                <p>
                Master of Science in Data Science
                </p>

                <span>
                Expected December 2026
                </span> 

                <div className="education-focus">
                  <span>Machine Learning</span>
                  <span>Data Engineering</span>
                  <span>Statistics</span>
                  <span>Databases</span>
                  <span>Big Data</span>
                  <span>Data Visualization</span>
                </div>
            </div>


            <div className="education-entry">

                <h3>
                Maulana Azad National Institute of Technology
                </h3>

                <p>
                Bachelor's in Electrical Engineering
                </p>

                <span>
                May 2023
                </span>

            </div>

            </BookPage>


            {/* ========================
                LEADERSHIP
            ======================== */}
            <BookPage className="leadership-page">

              <p className="eyebrow">
                Leadership & Community
              </p>

              <h2>
                Tiger Tales Toastmasters
              </h2>

              <p className="leadership-period">
                January 2025 — June 2026
              </p>


              <div className="leadership-roles">

                <div className="leadership-role">
                  <span>President</span>
                  <small>Strategy, Direction & Long-term Growth</small>
                </div>

                <div className="leadership-role">
                  <span>Vice President of Education</span>
                  <small>Meeting Planning & Member Development</small>
                </div>

                <div className="leadership-role">
                  <span>Vice President of Membership</span>
                  <small>Membership Recruitment, Onboarding & Retention</small>
                </div>

              </div>


              <div className="leadership-section">

                <span className="project-section-label">
                  Leadership
                </span>

                <ul className="leadership-highlights">

                  <li>
                    Helped shape the club's long-term direction by coordinating
                    with fellow officers on priorities, member engagement, and
                    initiatives supporting sustainable club growth.
                  </li>

                  <li>
                    Planned and coordinated weekly meeting agendas, ensuring
                    speaking opportunities and meeting roles were assigned while
                    helping members stay on track with their educational progress.
                  </li>

                  <li>
                    Supported members through feedback, mentorship, and
                    opportunities to develop their public speaking, communication,
                    and leadership skills.
                  </li>

                  <li>
                    Led membership recruitment and onboarding efforts, serving
                    as a primary point of contact for prospective and new members
                    and answering questions about the club and Toastmasters program.
                  </li>

                  <li>
                    Served as Contest Master for Tall Tales Speech Contests at
                    both Club and Area levels, coordinating participants, judges,
                    logistics, and event flow across four Toastmasters clubs.
                  </li>

                </ul>

              </div>

            </BookPage>


            {/* ========================
                BACK COVER / CONTACT
            ======================== */}
            <BookPage className="back-cover">

            <div>

                <p className="eyebrow">
                Let's connect
                </p>

                <h2>
                Thanks for reading.
                </h2>

                <div className="contact-links">

                <a
                    href="mailto:Bashar28nov@gmail.com"
                >
                    Email
                </a>

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

            </BookPage>

        </HTMLFlipBook>
      </div>


      {/* ========================
          BOTTOM PAGE CONTROLS
      ======================== */}
      <div className="book-controls">

        <button
          className="page-button"
          onClick={() =>
            book.current?.pageFlip().flipPrev()
          }
          disabled={currentPage === 0}
        >
          ← Previous
        </button>


        <div className="page-indicator">

          <span className="section-indicator">
            {getSectionLabel(currentPage)}
          </span>

          <span className="page-count">
            {String(currentPage + 1).padStart(2, "0")}
            {" / "}
            {String(totalPages).padStart(2, "0")}
          </span>

        </div>


        <button
          className="page-button"
          onClick={() =>
            book.current?.pageFlip().flipNext()
          }
          disabled={currentPage >= totalPages - 1}
        >
          Next →
        </button>

      </div>

    </div>
  );
}

export default Book;