function AppendixEntry({ project }) {
  return (
    <article className="appendix-entry">

      <span className="appendix-number">
        {project.number}
      </span>

      <div className="appendix-body">

        <h3>
          {project.title}
        </h3>

        <p className="appendix-subtitle">
          {project.subtitle}
        </p>

        <p className="appendix-tech">
          {project.technologies.slice(0, 4).join(" · ")}
        </p>

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
        >
          Source ↗
        </a>

      </div>

    </article>
  );
}

export default AppendixEntry;
