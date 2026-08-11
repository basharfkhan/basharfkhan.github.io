import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import BookPage from "./BookPage";
import { projects } from "../data/portfolio";

function Book() {
  const book = useRef();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(14);

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
                Institute of Technology interested in building
                machine learning systems, data pipelines, and
                analytical products that solve practical problems.
            </p>

            <p>
                My work spans machine learning, data engineering,
                APIs, databases, and visualization.
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

            <BookPage
                key={`${project.number}-intro`}
            >

                <span className="page-number">
                {project.number}
                </span>

                <p className="eyebrow">
                Selected Project
                </p>

                <h2>
                {project.title}
                </h2>

                <h3>
                {project.subtitle}
                </h3>

                <p>
                {project.description}
                </p>

                <div className="tech-list">

                {project.technologies.map((tech) => (
                    <span key={tech}>
                    {tech}
                    </span>
                ))}

                </div>

            </BookPage>,


            <BookPage
                key={`${project.number}-details`}
            >

                <p className="eyebrow">
                Project {project.number}
                </p>

                <h2>
                Inside the project
                </h2>

                <ul className="project-highlights">

                {project.highlights.map((highlight) => (
                    <li key={highlight}>
                    {highlight}
                    </li>
                ))}

                </ul>

                <div className="project-links">

                <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub ↗
                </a>

                <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                >
                    View Project ↗
                </a>

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
            <BookPage>

            <p className="eyebrow">
                Leadership
            </p>

            <h2>
                Tiger Tales Toastmasters
            </h2>

            <p>
                Served as President, Vice President of Education,
                and Vice President of Membership.
            </p>

            <p>
                Led membership, mentorship, and engagement
                initiatives across the club.
            </p>

            <p>
                Served as Contest Master for Club and Area
                Tall Tales Speech Contests involving four
                Toastmasters clubs.
            </p>

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