import { projects } from "../data/portfolio";

function MobilePortfolio() {
  return (
    <main className="mobile-portfolio">

      <section className="mobile-hero">
        <p>PORTFOLIO</p>

        <h1>
          Bashar
          <br />
          Farooq Khan
        </h1>

        <h2>Data Scientist</h2>

        <span>
          Machine Learning · Data Engineering · Analytics
        </span>
      </section>


      <section>
        <p className="eyebrow">About</p>

        <h2>Turning data into decisions.</h2>

        <p>
          Data Science graduate student at Rochester
          Institute of Technology building machine
          learning systems, data pipelines, APIs, and
          analytical products.
        </p>
      </section>


      <section>
        <p className="eyebrow">Technical Toolkit</p>

        <h2>Skills</h2>

        <h3>Languages</h3>
        <p>Python · SQL · Java · JavaScript · R</p>

        <h3>Databases</h3>
        <p>MySQL · MongoDB · Neo4j · Cassandra · Redis</p>

        <h3>Tools</h3>
        <p>Git · Docker · Kafka · Flask · Tableau · Power BI · AWS</p>
      </section>


      {projects.map((project) => (
        <section
          className="mobile-project"
          key={project.number}
        >
          <span className="project-number">
            {project.number}
          </span>

          <p className="eyebrow">Project</p>

          <h2>{project.title}</h2>

          <h3>{project.subtitle}</h3>

          <p>{project.description}</p>

          {project.images?.map((image) => (
            <figure
              className="mobile-project-image"
              key={image.src}
            >

              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
              />

              {image.caption && (
                <figcaption>
                  {image.caption}
                </figcaption>
              )}

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


      <section>
        <p className="eyebrow">Education</p>

        <h2>Rochester Institute of Technology</h2>
        <p>Master of Science in Data Science</p>

        <h2>
          Maulana Azad National Institute of Technology
        </h2>
        <p>Bachelor's in Electrical Engineering</p>
      </section>


      <section className="mobile-contact">
        <p className="eyebrow">Contact</p>

        <h2>Let's build something.</h2>

        <a href="mailto:Bashar28nov@gmail.com">
          Email
        </a>

        <a href="https://github.com/basharfkhan">
          GitHub
        </a>

        <a href="https://www.linkedin.com/in/basharfarooqkhan/">
          LinkedIn
        </a>
      </section>

    </main>
  );
}

export default MobilePortfolio;