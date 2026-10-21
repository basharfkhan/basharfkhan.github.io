import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import BookPage from "./BookPage";
import AppendixEntry from "./AppendixEntry";
import { toRoman } from "./roman";
import CoverCatalog from "./covers/CoverCatalog";
import { useBookScale } from "./useBookScale";
import Sigil from "./Sigil";
import Spheres from "./Spheres";

// "Alexandria: Book Recommender" -> name + descriptor. Titles without a colon
// keep the whole string as the name.
function splitTitle(title) {
  const at = title.indexOf(":");
  return at === -1
    ? { name: title, descriptor: null }
    : { name: title.slice(0, at).trim(), descriptor: title.slice(at + 1).trim() };
}
import { projects } from "../data/portfolio";
import { buildSkillIndex } from "../data/skillsIndex";
import { experience } from "../data/experience";

function Book() {
  const book = useRef();
  const stageRef = useRef(null);
  const navRef = useRef(null);
  const controlsRef = useRef(null);

  const { scale, fitHeight } = useBookScale(stageRef, navRef, controlsRef);

  const [currentPage, setCurrentPage] = useState(0);
  // Replaced by the real count on init; this only has to be right for the
  // first paint, before the flipbook reports its page count.
  const [totalPages, setTotalPages] = useState(
    10 +
      projects.filter((p) => p.featured).length * 2 +
      experience.length * 2
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
  // 0 cover · 1 ex libris · 2 contents · 3 about · 4 education
  // 5+ work experience (2 pages each) · chapters (2 pages each)
  // · appendix (2 pages) · skills index · leadership · back cover
  const firstChapter = 5 + experience.length * 2;
  const afterChapters = firstChapter + chapters.length * 2;
  const pageIndex = {
    home: 0,
    contents: 2,
    about: 3,
    education: 4,
    experience: 5,
    projects: firstChapter,
    appendix: afterChapters,
    index: afterChapters + 2,
    leadership: afterChapters + 3,
    contact: afterChapters + 4,
  };

  const skillIndex = buildSkillIndex(projects, toRoman, experience);

  const refPage = (target) => {
    if (target.type === "chapter") {
      return pageIndex.projects + target.index * 2;
    }

    if (target.type === "experience") {
      return pageIndex.experience + target.index * 2;
    }

    return pageIndex.appendix;
  };

  const contents = [
    {
      group: "Front Matter",
      entries: [
        { label: "About", page: pageIndex.about },
        { label: "Education", page: pageIndex.education },
        ...experience.map((job, i) => ({
          label: `Experience: ${job.shortName}`,
          page: pageIndex.experience + i * 2,
        })),
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
        { label: "Interludes: Further Work", page: pageIndex.appendix },
        { label: "Index of Skills", page: pageIndex.index },
        { label: "Leadership", page: pageIndex.leadership },
        { label: "Contact", page: pageIndex.contact },
      ],
    },
  ];

  const pageLabel = (page) => String(page + 1).padStart(2, "0");


  const goToPage = (page) => {
    const pageFlip = book.current?.pageFlip();
    if (!pageFlip) return;

    /*
      flip() animates a page turn, and from the closed cover there is no page
      to turn: it silently does nothing, so every nav button and the cover's
      own "Open the book" were dead until the reader had opened the book with
      the Next arrow. turnToPage jumps without animation and works from any
      state, so the cover uses that and everything else keeps the animation.
    */
    if (pageFlip.getCurrentPageIndex() === 0) {
      pageFlip.turnToPage(page);
    } else {
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

    if (page <= pageIndex.education) {
      return "ABOUT · EDUCATION";
    }

    if (page < pageIndex.projects) {
      return "WORK EXPERIENCE";
    }

    if (page >= pageIndex.appendix && page < pageIndex.index) {
      return "INTERLUDES";
    }

    if (page >= pageIndex.projects && page < pageIndex.appendix) {
      const projectPageOffset = page - pageIndex.projects;
      const projectNumber = Math.floor(projectPageOffset / 2) + 1;

      return `CHAPTER ${toRoman(projectNumber)}`;
    }

    if (page === pageIndex.index) {
      return "INDEX";
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
      <nav className="book-nav" ref={navRef}>

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
            onClick={() => goToPage(pageIndex.experience)}
          >
            Experience
          </button>

          <button
            onClick={() => goToPage(pageIndex.projects)}
          >
            Projects
          </button>

          <button
            onClick={() => goToPage(pageIndex.index)}
          >
            Skills
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
        className="book-fit"
        style={fitHeight ? { height: `${fitHeight}px` } : undefined}
      >
      <div
        className="book-fit-inner"
        style={{ transform: `scale(${scale})` }}
      >
      <div
        ref={stageRef}
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
                Recommenders, trajectory prediction, and
                retrieval systems in production.
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
                  <span>Deep Learning</span>
                  <span>Transformers</span>
                  <span>NLP</span>
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
                WORK EXPERIENCE (two pages per role)
            ======================== */}
            {experience.flatMap((job) => [

              <BookPage
                key={`${job.id}-overview`}
                className="project-intro-page experience-page"
              >

                <p className="eyebrow">
                  Work Experience
                </p>

                <div className="chapter-sigil">
                  <Sigil name={job.sigil} size={34} />
                  <span className="rule" />
                </div>

                <p className="chapter-label">
                  {job.type} · {job.dates}
                </p>

                <h2>
                  {job.program}
                </h2>

                <h3 className="project-subtitle">
                  {job.organization}
                </h3>

                <div className="project-section">

                  <span className="project-section-label">
                    The Problem
                  </span>

                  <p className="drop-cap">
                    {job.problem}
                  </p>

                </div>

                <div className="project-section">

                  <span className="project-section-label">
                    What I Built: {job.project}
                  </span>

                  <ul className="project-approach">
                    {job.built.map((item) => (
                      <li key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>

                </div>

              </BookPage>,

              <BookPage
                key={`${job.id}-results`}
                className="project-detail-page"
              >

                <p className="eyebrow">
                  {job.type} · Results
                </p>

                <h2>
                  Evaluation
                </h2>

                <p className="experience-note">
                  {job.evaluationNote}
                </p>

                <div className="project-stat-grid">
                  {job.stats.map((stat) => (
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

                <div className="project-results">

                  <span className="project-section-label">
                    Key Takeaways
                  </span>

                  <ul className="project-highlights">
                    {job.highlights.map((highlight) => (
                      <li key={highlight}>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                </div>

                <div className="tech-list">
                  {job.technologies.map((tech) => (
                    <span key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">

                  <a
                    href={job.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View GitHub ↗
                  </a>

                  {job.demo && (
                    <a
                      href={job.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Watch the Demo ↗
                    </a>
                  )}

                </div>

              </BookPage>,

            ])}


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

                <div className="chapter-sigil">
                  <Sigil name={project.sigil} size={34} />
                  <span className="rule" />
                </div>

                <p className="chapter-label">
                  Part One &middot; Chapter {toRoman(chapterIndex + 1)}
                </p>

                {/* Split at the colon the titles already use: the name carries
                    the chapter, the descriptor says what it is. */}
                <h2>
                  {splitTitle(project.title).name}
                </h2>

                {splitTitle(project.title).descriptor && (
                  <p className="project-descriptor">
                    {splitTitle(project.title).descriptor}
                  </p>
                )}

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

                {project.epigraph && (
                  <p className="epigraph">
                    {project.epigraph.text}
                    <span className="epigraph-source">
                      {project.epigraph.source}
                    </span>
                  </p>
                )}


                {/* Project Images */}

                {project.images && project.images.length > 0 && (
                  <div
                    className={`project-images ${
                      project.images.length > 1 ? "multiple-images" : ""
                    }`}
                  >
                    {project.images.map((image, imageIndex) => (
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

                        <figcaption>
                          <span className="fig-label">
                            Fig. {toRoman(chapterIndex + 1)}.{imageIndex + 1}
                          </span>
                          {image.caption}
                        </figcaption>
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
                INTERLUDES (two pages)
            ======================== */}
            {appendixPages.map((items, pageNo) => (

              <BookPage
                key={`appendix-${pageNo}`}
                className="appendix-page"
              >

                <p className="eyebrow">
                  {pageNo === 0 ? "Interludes" : "Interludes · Continued"}
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
                INDEX OF SKILLS
                Alphabetical, with the chapters that use each skill.
            ======================== */}
            <BookPage className="index-page">

              <p className="eyebrow">
                Index
              </p>

              <h2>
                Index of Skills
              </h2>

              <p className="index-key">
                Numerals refer to chapters
                {chapters.map((project, i) => (
                  ` · ${toRoman(i + 1)} ${project.title.split(":")[0]}`
                ))}
                {" · A appendix · E externship"}
              </p>

              <div className="index-columns">

                {skillIndex.map((group) => (

                  <div
                    className="index-group"
                    key={group.letter}
                  >

                    <span className="index-letter">
                      {group.letter}
                    </span>

                    <ul>

                      {group.entries.map((entry) => (

                        <li key={entry.name}>

                          <span className="index-term">
                            {entry.name}
                          </span>

                          <span className="index-refs">
                            {entry.refs.map((ref) => (
                              <button
                                key={ref.label}
                                className="index-ref"
                                onClick={() => goToPage(refPage(ref.target))}
                              >
                                {ref.label}
                              </button>
                            ))}
                          </span>

                        </li>

                      ))}

                    </ul>

                  </div>

                ))}

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

              <div className="correspondence">

                <p className="eyebrow">
                  Correspondence
                </p>

                <h2>
                  Thanks for reading.
                </h2>

                <p className="correspondence-note">
                  Open to AI/ML Engineer and Data Scientist roles.
                  Write to the author:
                </p>

                <div className="contact-links">

                  <a href="mailto:Bashar28nov@gmail.com">
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

              <p className="colophon">
                <span>Colophon</span>
                Set in Cormorant Garamond and Inter, with Courier Prime
                on the catalog card. Designed and built by the author
                with React and Vite, and published on GitHub Pages.
              </p>

            </BookPage>

        </HTMLFlipBook>
      </div>
      </div>
      </div>


      {/* ========================
          BOTTOM PAGE CONTROLS
      ======================== */}
      <div className="book-controls" ref={controlsRef}>

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

          <Spheres total={totalPages} current={currentPage} />

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