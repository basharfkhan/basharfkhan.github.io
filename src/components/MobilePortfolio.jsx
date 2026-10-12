import { projects } from "../data/portfolio";
import AppendixEntry from "./AppendixEntry";
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
        <p>Python · SQL · Java · JavaScript · TypeScript · R</p>

        <h3>Machine Learning</h3>
        <p>
          PyTorch · Transformers &amp; attention · LSTMs · Multimodal
          prediction · Probability calibration · scikit-learn · XGBoost ·
          LightGBM · sentence-transformers · MLflow
        </p>

        <h3>LLMs &amp; Agents</h3>
        <p>
          Claude API · Tool-using agents · RAG · BM25, dense &amp; hybrid
          retrieval · LLM-as-judge evaluation · Held-out test design ·
          Prompt design · Tesseract OCR
        </p>

        <h3>Data Engineering</h3>
        <p>
          PySpark · Airflow · Kafka · BigQuery · Parquet ·
          Medallion &amp; Lambda architectures
        </p>

        <h3>Serving &amp; Infrastructure</h3>
        <p>
          FastAPI · Flask · Docker · GitHub Actions CI · pytest · Next.js ·
          React · AWS
        </p>

        <h3>Databases</h3>
        <p>PostgreSQL + pgvector · MySQL · MongoDB · Neo4j · Cassandra · Redis</p>

        <h3>Analysis &amp; Visualisation</h3>
        <p>pandas · NumPy · Matplotlib · Tableau · Power BI</p>
      </section>


      {projects.filter((project) => project.featured).map((project) => (
        <section
          className="mobile-project"
          id={`project-${project.number}`}
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