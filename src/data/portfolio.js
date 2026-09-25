export const projects = [

  /* ======================================================
     PROJECT 01
     ALEXANDRIA BOOK RECOMMENDER
  ====================================================== */

  {
    number: "01",

    title:
      "Alexandria: Book Recommender",

    subtitle:
      "Full-Stack Recommender System That Learns As You Read",

    type:
      "Deployed Personal Project",

    description:
      "A deployed, end-to-end book recommendation system that personalizes instantly as readers rate books, combining collaborative filtering, text embeddings, and an LLM onboarding librarian.",

    problem:
      "New readers have no history, and retraining a model every time someone rates a book is impractical. The goal was a recommender that gives good picks from a few genres or favorite books, then adapts in real time as feedback arrives, like a streaming feed.",

    approach: [
      "Trained BPR matrix factorization in PyTorch on 6M Goodreads ratings and embedded 10k books with sentence-transformers, tracking experiments in MLflow.",
      "Built a hybrid ranker that folds in a user vector from each new rating in under 1 ms, shifting from content-based to collaborative signals as feedback grows.",
      "Added a LightGBM LambdaMART second stage that reorders the top 200 candidates using signal agreement, author and series continuity, lifting NDCG@20 by 30%.",
      "Served it through FastAPI with Postgres + pgvector, an LLM-powered onboarding chat, and a Next.js frontend, deployed with Docker and GitHub Actions CI.",
      "Tuned serving hyper-parameters on a validation split, uncovering a popularity-bias failure that collapsed catalog coverage to 2%.",
      "Enriched 8,000+ books with Open Library descriptions, and added MMR diversity, an author cap, and explanations for every recommendation."
    ],

    stats: [
      {
        value: "+71%",
        label: "NDCG@20 vs Matrix Factorization"
      },
      {
        value: "2% → 54%",
        label: "Catalog Coverage After Tuning"
      }
    ],

    highlights: [
      "Two-stage ranking reaches NDCG@20 of 0.312, 3.5× a popularity baseline, while updating from new ratings instantly.",
      "Beats the popularity baseline by 77% with only 5 known ratings, addressing cold start.",
      "Live on Vercel, Render, and Neon with CI covering unit, pipeline, and Postgres integration tests."
    ],

    technologies: [
      "PyTorch",
      "LightGBM",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Next.js",
      "TypeScript",
      "Docker",
      "MLflow",
      "Anthropic API"
    ],

    images: [
      {
        src: "/images/alexandria-results.png",
        alt: "Bar chart of NDCG@20 by model: two-stage 0.312, stage 1 hybrid 0.241, BPR 0.183, two-stage with 5 ratings 0.158, popularity 0.089",
        caption:
          "Ranking quality on held-out Goodreads ratings. A learned second-stage ranker adds 30% over the tuned hybrid."
      }
    ],

    github:
      "https://github.com/basharfkhan/alexandria",

    demo:
      "https://alexandria-ashy.vercel.app"
  },


  /* ======================================================
     PROJECT 02
     DATA SCIENCE SALARY ESTIMATOR
  ====================================================== */

  {
    number: "02",

    title: "Data Science Salary Estimator",

    subtitle:
      "End-to-End Machine Learning & API Deployment",

    type:
      "Personal Project",

    description:
      "An end-to-end machine learning system for estimating Data Science salaries from job descriptions, company attributes, location, and technical skill requirements.",

    problem:
      "Data Science salaries vary significantly across roles, companies, locations, experience levels, and required technologies. This project explores whether those job attributes can be transformed into useful features for salary prediction.",

    approach: [
      "Scraped Data Science job postings and salary information from Glassdoor using Python and Selenium.",
      "Cleaned salary, company, location, seniority, and job-description fields.",
      "Engineered features representing technologies and job characteristics.",
      "Compared multiple regression models including Linear Regression, Lasso, and Random Forest.",
      "Deployed the trained model through a Flask REST API for real-time inference."
    ],

    stats: [
      {
        value: "1,000+",
        label: "Job Postings"
      },
      {
        value: "~$11K",
        label: "Best MAE"
      }
    ],

    highlights: [
      "Random Forest achieved the strongest predictive performance among the evaluated models.",
      "Used hyperparameter tuning to improve model performance.",
      "Built a Flask REST API that accepts job attributes and returns salary predictions."
    ],

    technologies: [
      "Python",
      "Pandas",
      "Selenium",
      "Scikit-learn",
      "Flask",
      "REST API"
    ],

    images: [
      {
        src: "/images/wordcloud.png",
        alt: "Word cloud generated from Data Science job postings",
        caption:
          "Common terms appearing across scraped Data Science job postings."
      }
    ],

    github:
      "https://github.com/basharfkhan/DS_Salary_Project",

    demo: null
  },


  /* ======================================================
     PROJECT 03
     PATIENT READMISSION
  ====================================================== */

  {
    number: "03",

    title:
      "Patient Readmission Prediction",

    subtitle:
      "Clinical Machine Learning Classification",

    type:
      "Machine Learning Project",

    description:
      "A machine learning workflow for predicting hospital readmission using clinical and encounter-level patient data.",

    problem:
      "Hospital readmissions can represent significant healthcare costs and may indicate opportunities for improved patient follow-up. This project explores whether patient and encounter characteristics can help identify patients at higher risk of readmission.",

    approach: [
      "Explored and prepared patient records from the diabetes readmission dataset.",
      "Handled missing data and transformed categorical variables for machine learning.",
      "Compared several classification algorithms including Random Forest and XGBoost.",
      "Applied model tuning and evaluated predictive performance.",
      "Examined feature importance to understand variables associated with readmission risk."
    ],

    stats: [
      {
        value: "5",
        label: "Models Compared"
      },
      {
        value: "4",
        label: "Evaluation Metrics"
      }
    ],

    highlights: [
      "Compared multiple machine learning classifiers on the same clinical prediction problem.",
      "Random Forest and XGBoost produced strong overall results.",
      "Used feature-importance analysis to better understand influential clinical variables."
    ],

    technologies: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "XGBoost",
      "Jupyter"
    ],

    images: [
      {
        src: "/images/model-eval.png",
        alt: "Model performance comparison for hospital readmission prediction",
        caption:
          "Accuracy comparison across the machine learning models evaluated."
      },
      {
        src: "/images/feature-importance-xgb.png",
        alt: "Top feature importance values for XGBoost",
        caption:
          "XGBoost feature importance highlights influential patient and encounter variables."
      }
    ],

    github:
      "https://github.com/basharfkhan/Hospital_Readmission_Prediciton",

    demo: null
  },


  /* ======================================================
     PROJECT 04
     LAMBDA ARCHITECTURE
  ====================================================== */

  {
    number: "04",

    title:
      "Banking System with Lambda Architecture",

    subtitle:
      "Real-Time Credit Card Transaction Processing",

    type:
      "RIT Course Project",

    description:
      "A simulated banking transaction-processing system combining real-time stream processing, batch processing, and a serving layer using Lambda Architecture.",

    problem:
      "Financial transaction systems need to process incoming activity quickly while also maintaining reliable historical information for downstream queries and analysis. Lambda Architecture provides separate stream and batch processing paths that converge in a serving layer.",

    approach: [
      "Published transaction events through Kafka for real-time processing.",
      "Validated incoming transactions through the streaming path.",
      "Processed transaction data through a separate batch-processing layer.",
      "Combined processed results through a serving layer.",
      "Persisted transaction and account information using MySQL."
    ],

    stats: [
      {
        value: "3",
        label: "Core Layers"
      },
      {
        value: "Real-Time",
        label: "Streaming"
      }
    ],

    highlights: [
      "Combined batch and streaming workflows within one data architecture.",
      "Used Kafka for event-driven transaction processing.",
      "Used a serving layer to make processed transaction information available for downstream queries."
    ],

    technologies: [
      "Python",
      "Kafka",
      "MySQL",
      "Streaming",
      "Lambda Architecture"
    ],

    images: [
      {
        src: "/images/lambda-architecture.png",
        alt: "Lambda Architecture with batch, stream, and serving layers",
        caption:
          "Lambda Architecture design model with batch and stream processing converging in the serving layer."
      }
    ],

    github:
      "https://github.com/basharfkhan/Banking-System-with-Lambda-Architecture",

    demo: null
  },


  /* ======================================================
     PROJECT 05
     MEDALLION ARCHITECTURE
  ====================================================== */

  {
    number: "05",

    title:
      "Stock Market Data Processing",

    subtitle:
      "PySpark & Medallion Architecture",

    type:
      "RIT Course Project",

    description:
      "A PySpark data pipeline implementing Medallion Architecture for stock-market data, transforming multiple source datasets into structured and analytics-ready data products.",

    problem:
      "Stock-market analytics requires combining transaction, market, and company information from different sources and transforming that data into reliable datasets that can support downstream analytics and insights.",

    approach: [
      "Ingested transaction, market, and stock information into the Bronze layer.",
      "Used PySpark to clean, enrich, structure, and integrate source data.",
      "Produced cleaned and enriched hourly stock data in the Silver layer.",
      "Generated daily, monthly, and quarterly Gold-layer datasets.",
      "Prepared the Gold data products for downstream analytics and insight generation."
    ],

    stats: [
      {
        value: "3",
        label: "Medallion Layers"
      },
      {
        value: "3",
        label: "Gold Aggregations"
      }
    ],

    highlights: [
      "Implemented Bronze, Silver, and Gold stages using Medallion Architecture principles.",
      "Used the Silver layer for cleaned, enriched, and structured hourly stock data.",
      "Produced daily, monthly, and quarterly Gold datasets designed for downstream analytics."
    ],

    technologies: [
      "PySpark",
      "Python",
      "MySQL",
      "MongoDB",
      "Medallion Architecture"
    ],

    images: [
      {
        src: "/images/medallion-architecture.png",
        alt: "Medallion Architecture for stock market data processing",
        caption:
          "Bronze → Silver hourly data → Gold daily, monthly, and quarterly data → Analytics."
      }
    ],

    github:
      "https://github.com/basharfkhan/Medallion_Architecture_for_Stock_Market_Data",

    demo: null
  },


  /* ======================================================
     PROJECT 06
     WORLD LAYOFFS
  ====================================================== */

  {
    number: "06",

    title:
      "World Layoffs Analysis",

    subtitle:
      "SQL Data Cleaning & Exploratory Analysis",

    type:
      "Data Analysis Project",

    description:
      "An exploratory analysis of global layoffs focused on cleaning raw workforce-reduction data and identifying trends across companies, industries, and geographic regions.",

    problem:
      "Raw layoffs datasets contain duplicates, missing information, inconsistent formats, and multiple dimensions that must be cleaned before meaningful trends can be analyzed.",

    approach: [
      "Removed duplicate records from the raw dataset.",
      "Standardized inconsistent fields and data formats.",
      "Handled missing values using SQL.",
      "Performed exploratory analysis across companies, industries, and geographic regions.",
      "Created visualizations for communicating key patterns and trends."
    ],

    stats: [
      {
        value: "SQL",
        label: "Core Analysis"
      },
      {
        value: "3",
        label: "Trend Dimensions"
      }
    ],

    highlights: [
      "Analyzed layoffs across industries and geographic regions.",
      "Examined company-level workforce reduction patterns.",
      "Created a cleaned dataset suitable for downstream analysis and visualization."
    ],

    technologies: [
      "MySQL",
      "SQL",
      "Tableau",
      "EDA"
    ],

    images: [
      {
        src: "/images/world-layoffs.png",
        alt: "Tableau dashboard showing worldwide layoffs",
        caption:
          "Interactive Tableau dashboard exploring layoffs by geography, industry, company, and time."
      }
    ],

    github:
      "https://github.com/basharfkhan/EDA_of_World_Layoffs",

    demo: null
  }

];