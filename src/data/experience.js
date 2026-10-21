// Work experience. Each entry gets a two-page spread in the book
// (overview on the left, results on the right) and a section on phones.
// Add `demo` when a video or live link is ready and a button appears.

export const experience = [
  {
    id: "pfizer-extern",

    type: "Externship",

    // Short name for the Contents page and the cover card
    shortName: "Pfizer Externship",

    program: "Pfizer AI-Powered Document Insights & Data Extraction",

    organization: "Extern, in partnership with Pfizer",

    dates: "Aug – Nov 2026",

    project: "Pharma Supplier Document Assistant",

    sigil: "page",

    summary:
      "A retrieval-augmented assistant for pharmaceutical supplier documents, digital or scanned. Ask a question in plain English and get an answer that cites the source file and page, with a confidence level. Everything runs locally, so documents never leave the machine.",

    problem:
      "Supplier documentation such as quality certificates, BSE/TSE declarations and specifications is often scanned and hard to search. The goal was answers over these files with citations a reviewer can trace back to the page.",

    built: [
      "Read digital pages with PyMuPDF and scanned pages with deskewing and EasyOCR, rebuilding table rows from OCR box positions and correcting OCR errors inside document IDs.",
      "Tagged every page with Mistral-7B under a JSON schema, then split bundles into individual documents by type, ID and page range.",
      "Routed each question to the right document type before searching a LlamaIndex vector index, with an exact-ID lookup and a weak-match fallback.",
      "Answered from numbered sources with a citation after every fact, plus a High/Medium/Low confidence check, in a local Gradio app.",
    ],

    technologies: [
      "Mistral-7B",
      "LlamaIndex",
      "BGE embeddings",
      "EasyOCR",
      "PyMuPDF",
      "llama.cpp",
      "Gradio",
      "RAG",
    ],

    stats: [
      {
        value: "94.4%",
        label: "Recall@4 with routing (83.3% without)",
      },
      {
        value: "99.5%",
        label: "OCR word recall on scanned pages",
      },
    ],

    highlights: [
      "Routing questions by document type lifted Recall@4 from 83.3% to 94.4% and MRR from 0.72 to 0.89.",
      "All 20 test pages were assigned the correct document type.",
      "7 of 10 answers were fully correct under strict grading. All three misses cited the right page: one misread a table row and two were incomplete.",
      "Runs on a laptop CPU with no paid API, at about 33 seconds per answer.",
    ],

    evaluationNote:
      "Evaluated on 10 questions with known answers across a digital and a scanned bundle (20 pages), including one out-of-scope question.",

    github: "https://github.com/basharfkhan/pharma-document-rag-assistant",

    demo: null,
  },
];
