// The skills shown in the book's alphabetical Index.
//
// Each entry lists where the skill is used: a chapter (I, II, III)
// or "A" for the appendix projects. References are worked out from
// the project data, never typed by hand: a skill counts as used when
// it is in a project's `technologies`, or when one of its `match`
// terms appears in that project's own text.
//
// `match` defaults to the skill's name. Set `match: []` to only use
// the technologies lists (useful for very short names like "R").

export const skills = [
  // Languages
  { name: "Python" },
  { name: "SQL" },
  { name: "Java" },
  { name: "JavaScript" },
  { name: "TypeScript" },
  { name: "R", match: [] },

  // Machine learning
  { name: "PyTorch" },
  { name: "Transformers & attention", match: ["Transformer", "attention"] },
  { name: "LSTMs", match: ["LSTM"] },
  { name: "Multimodal prediction", match: ["multimodal"] },
  { name: "Probability calibration", match: ["calibrat"] },
  { name: "scikit-learn" },
  { name: "XGBoost" },
  { name: "LightGBM" },
  { name: "sentence-transformers" },
  { name: "MLflow" },
  { name: "A/B testing", match: ["A/B Testing", "randomized"] },

  // LLMs & agents
  { name: "Claude API", match: ["Claude"] },
  { name: "Tool-using agents", match: ["Tool Use", "tool-using", "tool use"] },
  { name: "RAG" },
  { name: "LlamaIndex" },
  { name: "Mistral-7B", match: ["Mistral"] },
  { name: "Gradio" },
  { name: "BM25, dense & hybrid retrieval", match: ["BM25", "hybrid retrieval", "dense retrieval"] },
  { name: "LLM evaluation", match: ["LLM Evaluation", "LLM-as-judge", "judge"] },
  { name: "Held-out test design", match: ["held-out"] },
  { name: "Prompt design", match: ["prompt"] },
  { name: "Tesseract OCR", match: ["Tesseract"] },
  { name: "EasyOCR" },
  { name: "PyMuPDF" },

  // Data engineering
  { name: "PySpark" },
  { name: "Airflow" },
  { name: "Kafka" },
  { name: "BigQuery" },
  { name: "Parquet" },
  { name: "Medallion architecture", match: ["Medallion"] },
  { name: "Lambda architecture", match: ["Lambda Architecture"] },
  { name: "Streaming", match: [] },

  // Serving & infrastructure
  { name: "FastAPI" },
  { name: "Flask" },
  { name: "REST APIs", match: ["REST API"] },
  { name: "Docker" },
  { name: "GitHub Actions CI", match: ["GitHub Actions"] },
  { name: "pytest", match: ["pytest"] },
  { name: "Next.js" },
  { name: "React" },
  { name: "AWS" },

  // Databases
  { name: "PostgreSQL", match: ["PostgreSQL", "Postgres"] },
  { name: "pgvector" },
  { name: "MySQL" },
  { name: "MongoDB" },
  { name: "Neo4j" },
  { name: "Cassandra" },
  { name: "Redis" },

  // Analysis & visualisation
  { name: "pandas" },
  { name: "NumPy" },
  { name: "Matplotlib" },
  { name: "Tableau" },
  { name: "Power BI" },
  { name: "Exploratory data analysis", match: ["EDA", "exploratory"] },
  { name: "Web scraping", match: ["Selenium", "scrap"] },
];


const escape = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");

// Short all-caps terms (SQL, RAG, AWS, EDA) must match case exactly,
// so "rag" inside a sentence cannot count as RAG.
function termPattern(term) {
  const caseSensitive = term.length <= 4 && term === term.toUpperCase();

  return new RegExp(
    `(^|[^A-Za-z0-9])${escape(term)}`,
    caseSensitive ? "" : "i"
  );
}

// Whole-word match for terms that would otherwise hit longer words
// (SQL inside PostgreSQL, Java inside JavaScript).
function wholeWord(term) {
  const caseSensitive = term.length <= 4 && term === term.toUpperCase();

  return new RegExp(
    `(^|[^A-Za-z0-9])${escape(term)}([^A-Za-z0-9]|$)`,
    caseSensitive ? "" : "i"
  );
}

// Lets a work-experience entry be checked like a project
function asProject(job) {
  return {
    title: job.program,
    subtitle: job.project,
    description: job.summary,
    problem: job.problem,
    approach: job.built,
    highlights: job.highlights,
    technologies: job.technologies,
  };
}

function projectText(project) {
  return [
    project.title,
    project.subtitle,
    project.description,
    project.problem,
    ...(project.approach || []),
    ...(project.highlights || []),
  ].join(" ");
}

function usesSkill(project, skill) {
  const techs = project.technologies.map((t) => t.toLowerCase());
  const terms = skill.match ?? [skill.name];

  if (techs.includes(skill.name.toLowerCase())) return true;

  if (terms.some((term) => techs.some((t) => wholeWord(term).test(t)))) {
    return true;
  }

  const text = projectText(project);

  return terms.some((term) =>
    // Prefix match only for stems like "calibrat" or "scrap"
    (term.length > 4 && term === term.toLowerCase() ? termPattern(term) : wholeWord(term)).test(text)
  );
}

// Returns [{ letter, entries: [{ name, refs: [{ label, target }] }] }],
// alphabetical. `target` is { type: "chapter", index }, { type: "appendix" }
// or { type: "experience", index }.
export function buildSkillIndex(projects, toRoman, experience = []) {
  const featured = projects.filter((p) => p.featured);
  const appendix = projects.filter((p) => !p.featured);

  const entries = skills.map((skill) => {
    const refs = featured
      .map((project, index) =>
        usesSkill(project, skill)
          ? { label: toRoman(index + 1), target: { type: "chapter", index } }
          : null
      )
      .filter(Boolean);

    if (appendix.some((project) => usesSkill(project, skill))) {
      refs.push({ label: "A", target: { type: "appendix" } });
    }

    experience.forEach((job, index) => {
      if (usesSkill(asProject(job), skill)) {
        refs.push({ label: "E", target: { type: "experience", index } });
      }
    });

    return { name: skill.name, refs };
  });

  entries.sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );

  const groups = [];

  for (const entry of entries) {
    const letter = entry.name[0].toUpperCase();
    const last = groups[groups.length - 1];

    if (last && last.letter === letter) {
      last.entries.push(entry);
    } else {
      groups.push({ letter, entries: [entry] });
    }
  }

  return groups;
}
