import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import BookPage from "./BookPage";
import { projects } from "../data/portfolio";

function Book() {
  const book = useRef();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(
    6 + projects.length * 2
  );

  // Important page locations
  const pageIndex = {
    home: 0,
    about: 1,
    projects: 3,
    education: 3 + projects.length * 2,
    leadership: 4 + projects.length * 2,
    contact: 5 + projects.length * 2,
  };

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
      return "ABOUT · SKILLS";
    }

    if (page >= pageIndex.projects && page < pageIndex.education) {
      const projectPageOffset = page - pageIndex.projects;
      const projectNumber = Math.floor(projectPageOffset / 2) + 1;

      return `PROJECT ${String(projectNumber).padStart(2, "0")}`;
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

            <div className="cover-content">

                <span className="cover-small">
                Portfolio
                </span>

                <div className="cover-main">
                    <h1>
                    Bashar
                    <br />
                    Farooq Khan
                    </h1>
                
                    <div className="cover-line" />

                    <h2>
                    Data Scientist
                    </h2>

                    <p>
                    Machine Learning • Data Engineering • Analytics
                    </p>

                </div>

                <span className="open-book">
                Click or drag to open →
                </span>

            </div>

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

             <p>
                I'm a Data Science graduate student at Rochester
                Institute of Technology interested in Machine Learning and AI.
                I enjoy building systems that turn raw data into 
                useful predictions, pipelines, and analytical products.
             </p>

             <p>
                My interests span machine learning, data engineering,
                databases, AI engineering, and data visualization.
                I particularly enjoy projects where I can work across the
                full lifecycle, from collecting and cleaning data to
                modeling, deployment, and communicating results.
             </p>

             <p>
                I'm currently looking for opportunities where I can apply
                these skills to real-world data problems while continuing
                to grow as a Data Scientist and Machine Learning Engineer.
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
                <strong>Proficient:</strong>{" "}
                Python · SQL · Java
            </p>

            <p>
                <strong>Familiar:</strong>{" "}
                JavaScript · R
            </p>

            <h3>
                Databases
            </h3>

            <p>
                MySQL · MongoDB · Neo4j · Cassandra · Redis
            </p>

            <h3>
                Tools
            </h3>

            <p>
                Git · Docker · Kafka · Flask · Tableau ·
                Power BI · AWS
            </p>

            </BookPage>


            {/* ========================
                PROJECTS
            ======================== */}
            {projects.flatMap((project) => [

              /* ======================================================
                LEFT PAGE — PROJECT OVERVIEW
              ====================================================== */

              <BookPage
                key={`${project.number}-intro`}
                className="project-intro-page"
              >

                <span className="page-number">
                  {project.number}
                </span>

                <p className="eyebrow">
                  {project.type}
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

                  <p>
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
                  Project {project.number} · Case Study
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