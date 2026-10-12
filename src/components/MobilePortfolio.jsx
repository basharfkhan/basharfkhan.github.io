import { projects } from "../data/portfolio";
import { buildSkillIndex } from "../data/skillsIndex";
import AppendixEntry from "./AppendixEntry";
import { toRoman } from "./roman";
import CoverCatalog from "./covers/CoverCatalog";

function MobilePortfolio() {
  const featured = projects.filter((project) => project.featured);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="mobile-portfolio">

      <section className="mobile-hero mobile-hero-catalog">
        <CoverCatalog
          chapters={featured.map((p) => p.title.split(":")[0])}
          appendixCount={projects.length - featured.length}
          onOpen={() => scrollTo("about")}
        />
      </section>


      <section id="about">
        <p className="eyebrow">About</p>

        <h2>Turning data into decisions.</h2>

        <p className="drop-cap">
          Data Science graduate student at Rochester
          Institute of Technology building machine
          learning systems, data pipelines, APIs, and
          analytical products.
        </p>
      </section>


      <section id="education">
        <p className="eyebrow">Education</p>

        <h2>Rochester Institute of Technology</h2>
        <p>Master of Science in Data Science</p>

        <h2>
          Maulana Azad National Institute of Technology
        </h2>
        <p>Bachelor's in Electrical Engineering</p>
      </section>




      {featured.map((project, chapterIndex) => (
        <section
          className="mobile-project"
          id={`project-${project.number}`}
          key={project.number}
        >
          <span className="project-number">
            {toRoman(chapterIndex + 1)}
          </span>

          <p className="eyebrow">Chapter {toRoman(chapterIndex + 1)}</p>

          <h2>{project.title}</h2>

          <h3>{project.subtitle}</h3>

          <p className="drop-cap">{project.description}</p>

          {project.images?.map((image, imageIndex) => (
            <figure
              className="mobile-project-image"
              key={image.src}
            >

              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />

              <figcaption>
                <span className="fig-label">
                  Fig. {toRoman(chapterIndex + 1)}.{imageIndex + 1}
                </span>
                {image.caption}
              </figcaption>

            </figure>
          ))}

          <ul>
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="tech-list">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <div className="mobile-project-links">
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
                className="primary"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </section>
      ))}


      <section className="mobile-appendix" id="further-work">
        <p className="eyebrow">Appendix</p>

        <h2>Further Work</h2>

        <p className="appendix-intro">
          Smaller projects in modelling, data engineering and analysis.
        </p>

        {projects
          .filter((project) => !project.featured)
          .map((project) => (
            <AppendixEntry
              key={project.number}
              project={project}
            />
          ))}
      </section>




      <section className="mobile-index" id="skills">
        <p className="eyebrow">Index</p>

        <h2>Index of Skills</h2>

        <p className="index-key">
          Numerals refer to chapters
          {featured.map((project, i) => (
            ` · ${toRoman(i + 1)} ${project.title.split(":")[0]}`
          ))}
          {" · A appendix"}
        </p>

        <div className="index-columns">
          {buildSkillIndex(projects, toRoman).map((group) => (
            <div className="index-group" key={group.letter}>
              <span className="index-letter">{group.letter}</span>

              <ul>
                {group.entries.map((entry) => (
                  <li key={entry.name}>
                    <span className="index-term">{entry.name}</span>

                    {entry.refs.map((ref) => (
                      <button
                        key={ref.label}
                        className="index-ref"
                        onClick={() =>
                          scrollTo(
                            ref.target.type === "chapter"
                              ? `project-${featured[ref.target.index].number}`
                              : "further-work"
                          )
                        }
                      >
                        {ref.label}
                      </button>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>


      <section className="mobile-contact">
        <p className="eyebrow">Correspondence</p>

        <h2>Thanks for reading.</h2>

        <p className="correspondence-note">
          Open to AI/ML Engineer and Data Scientist roles. Write to the author:
        </p>

        <a href="mailto:Bashar28nov@gmail.com">
          Email
        </a>

        <a href="https://github.com/basharfkhan">
          GitHub
        </a>

        <a href="https://www.linkedin.com/in/basharfarooqkhan/">
          LinkedIn
        </a>

        <p className="colophon">
          <span>Colophon</span>
          Set in Cormorant Garamond and Inter, with Courier Prime on the
          catalog card. Designed and built by the author with React and
          Vite, and published on GitHub Pages.
        </p>
      </section>

    </main>
  );
}

export default MobilePortfolio;