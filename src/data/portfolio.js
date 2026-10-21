export const projects = [

  /* ======================================================
     PROJECT 01
     ALEXANDRIA BOOK RECOMMENDER
  ====================================================== */

  {
    number: "01",

    featured: true,

    title:
      "Alexandria: Book Recommender",

    subtitle:
      "Full-Stack Recommender System That Learns As You Read",

    sigil: "book",

    // Opens the results page. DRAFT: rewrite in your own words.
    epigraph: {
      text:
        "A thirty percent gain on a held-out set is a claim about the metric. Whether it is also a claim about the reader is a separate question, and it needs a separate experiment.",
      source: "From the project log, Experiment 001",
    },

    type:
      "Deployed Personal Project",

    description:
      "A deployed, end-to-end book recommendation system that personalizes instantly as readers rate books, combining collaborative filtering, text embeddings, and an LLM onboarding librarian.",

    problem:
      "New readers have no history, and retraining after every rating is impractical. The goal was a recommender that works from a few favorite books, then adapts in real time as feedback arrives.",

    approach: [
      "Trained BPR matrix factorization in PyTorch on 6M Goodreads ratings and embedded a 12,220-book catalog with sentence-transformers.",
      "Built a hybrid ranker that folds in a user vector from each new rating in under 1 ms, shifting from content to collaborative signals as feedback grows.",
      "Added a LightGBM LambdaMART second stage that reorders the top 200 candidates, lifting NDCG@20 by 29% offline.",
      "Served it through FastAPI with Postgres + pgvector, a Claude-powered onboarding chat, and a Next.js frontend, deployed with Docker and GitHub Actions CI.",
      "Tuned serving hyper-parameters on a validation split, uncovering a popularity-bias failure that collapsed catalog coverage to 2%.",
      "Enriched 9,500+ books with Open Library descriptions, and added MMR diversity, an author cap, and explanations for every recommendation.",
      "Extended a ratings set that stops in 2017 with 2,220 newer titles, projecting each one into the collaborative space from its nearest rated neighbours so books with no ratings at all, like Project Hail Mary, are still recommendable.",
      "Automated weekly retraining behind a promotion gate that compares four metrics against both the live model and a pinned reference, so a run of individually tolerable 2% losses cannot compound into a 17% one unnoticed.",
      "Added drift monitoring that needs no production traffic: ten synthetic readers defined by books they loved are re-scored every retrain, and the overlap, popularity percentile and genre mix of what they are shown is compared against the live model, catching a model that holds its accuracy while changing what everyone sees.",
      "Pre-registered and ran a randomized experiment on the shipped ranker, committing the hypothesis, primary metric, guardrails, power analysis and stopping rule before collecting any data, then tested it across 600 replayed readers split into disjoint arms."
    ],

    stats: [
      {
        value: "+70%",
        label: "NDCG@20 vs Matrix Factorization (Offline)"
      },
      {
        value: "+7.3%",
        label: "Online Lift, 95% CI [-2.6%, +17.2%]"
      }
    ],

    highlights: [
      "Two-stage ranking reaches NDCG@20 of 0.309, 3.5× a popularity baseline, while updating from new ratings instantly.",
      "Beats the popularity baseline by 80% with only 5 known ratings, addressing cold start.",
      "Drift monitoring reproduces the failure it was built for: a candidate with byte-identical NDCG@20 trips three warnings because its probe readers keep only 10% of their recommendations and its lists moved 15% more popular.",
      "A randomized test of my own shipped feature failed to reproduce its offline gain: the online confidence interval excludes an effect the size NDCG@20 implied, and the reranker measurably increased bestseller concentration. The conclusion was that NDCG@20 is not a trustworthy proxy for reader benefit in this system.",
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
      "A/B Testing",
      "Claude API"
    ],

    images: [
      {
        src: "/images/alexandria-results.png",
        alt: "Bar chart of NDCG@20 by model: two-stage 0.309, stage 1 hybrid 0.225, BPR 0.182, two-stage with 5 ratings 0.160, popularity 0.089",
        caption:
          "Ranking quality on held-out Goodreads ratings. The learned second stage adds 29% over the tuned hybrid offline, a gain a later randomized online test could not reproduce."
      }
    ],

    github:
      "https://github.com/basharfkhan/alexandria",

    demo:
      "https://alexandria-ashy.vercel.app"
  },


  /* ======================================================
     PROJECT 02
     PCAS AIRCRAFT CONFLICT WARNING
  ====================================================== */

  {
    number: "02",

    featured: true,

    title:
      "PCAS: Predictive Collision Awareness",

    subtitle:
      "Multi-Agent Transformer for Conflict Warning",

    sigil: "converge",

    // DRAFT: rewrite in your own words.
    epigraph: {
      text:
        "Fourteen times the parameters bought less than one percent. Letting the model see the other aircraft bought twenty-one. The limit was never capacity.",
      source: "From the ablation chain",
    },

    type:
      "Deep Learning Project",

    description:
      "A learned conflict warning system for airports without a control tower, where most midair collisions happen and where certified collision avoidance is least useful. It predicts where every aircraft is going, then states a calibrated probability that two of them are about to lose separation.",

    problem:
      "TCAS II is carried mainly by airliners, not the trainers flying the pattern at non-towered fields, and it inhibits advisories below roughly 1,000 ft AGL, where those aircraft fly. It also assumes straight-line closure, so it cannot see a conflict that has not developed.",

    approach: [
      "Built an ADS-B pipeline over 660 recording sessions: runway-relative coordinates, gap-aware segmentation, and day-based splits, since the published benchmark's random split leaks days across both.",
      "Added physics and TCAS-style closure-rate baselines, then labelled every real loss of separation at 1 Hz.",
      "Trained a single-aircraft LSTM, then a multi-agent Transformer with social attention.",
      "Hid the neighbours from the same Transformer and it scored like the LSTM (2542 m vs 2539 m), which puts the gain down to context rather than architecture.",
      "Added six trajectory hypotheses per aircraft with probabilities, turning a yes/no alert into a conflict probability over hypothesis pairs, then calibrated it with isotonic regression fitted on held-out sessions.",
      "Compared every method at matched false alarm rates by sweeping each one's own sensitivity knob, after an earlier comparison at mismatched rates produced a false negative.",
      "Split the held-out error by flight phase and by how many aircraft were nearby, so the explanation could be checked against the cases where it should not hold.",
      "Collected 79 hours of live network data and measured whether close convergences are more frequent with no controller online, comparing within the same airport, traffic level and hour, and re-running the whole comparison on shuffled staffing labels as a placebo."
    ],

    stats: [
      {
        value: "2.2×",
        label: "Conflicts Caught 90s Ahead vs Kalman, Same False Alarm Rate"
      },
      {
        value: "0.021 → 0.0005",
        label: "Calibration Error After Isotonic Calibration"
      }
    ],

    highlights: [
      "More context helped where more capacity did not: 14× more parameters bought 0.8%, while letting the model see other aircraft bought 21%.",
      "The social gain is -0.8% when an aircraft has no neighbours to attend to, and 41% to 53% as soon as it has one or more.",
      "Detects 0.42 of conflicts arriving 30-60 s out at ~9 false alarms per hour, against 0.25 for a Kalman filter at the same budget, with median lead time 14 s against 3 s.",
      "Beats a Kalman filter by 61% to 76% in pattern turns, final approach and the circuit, and loses to it by 3% to 19% in transit, climb and descent, so a real system should choose by phase.",
      "Conflicts the model misses arrive at a median 68 s ahead, against 15 s for the ones it catches, and two failure modes that produce absurd trajectories are written up rather than filtered out.",
      "At the same airport, traffic level and hour, aircraft come within a mile of each other about 3× as often with no tower online, on 79 hours of live network data. The gap narrows as the separation gate widens, which is what a controller's influence should look like.",
      "198 tests and CI over a pipeline that survives six distinct defects in the distributed data, including archives that one common tool silently extracts as padding."
    ],

    technologies: [
      "PyTorch",
      "Transformers",
      "NumPy",
      "pandas",
      "Matplotlib",
      "pytest",
      "GitHub Actions",
      "ADS-B",
      "VATSIM API"
    ],

    images: [
      {
        src: "/images/pcas-replay.gif",
        alt: "Replay of recorded aircraft with predicted future paths and a conflict warning",
        caption:
          "Recorded traffic replayed with the model running: six possible futures per aircraft, weighted by probability, and a calibrated conflict warning when two are predicted to lose separation."
      },
      {
        src: "/images/pcas-detection.png",
        alt: "Conflicts detected 60 to 90 seconds ahead against false alarms, for four methods",
        caption:
          "Read at matched false alarm rates. Past about 30 seconds the social Transformer is the only method that keeps detecting; inside 30 seconds the physics baselines still win."
      },
      {
        src: "/images/pcas-phase.png",
        alt: "Median prediction error by flight phase for three methods",
        caption:
          "The model beats a Kalman filter by 61% to 76% where aircraft manoeuvre, and loses to it by 3% to 19% where they fly straight."
      },
      {
        src: "/images/pcas-controller.png",
        alt: "Close-pair rates with and without a tower online, across five separation gates",
        caption:
          "Within the same field, traffic level and hour, close convergences are about three times more frequent with no tower online. The gap narrows as the separation gate widens."
      },
      {
        src: "/images/pcas-reliability.png",
        alt: "Reliability curve of the stated conflict probability, before and after calibration",
        caption:
          "The stated probability was overconfident by 2-4x until it was calibrated on held-out sessions."
      }
    ],

    github:
      "https://github.com/basharfkhan/pcas",

    demo: null
  },

  /* ======================================================
     PROJECT 03
     LORE SPACEFLIGHT PRE-MORTEM AGENT
  ====================================================== */

  {
    number: "03",

    featured: true,

    title:
      "LORE: Lessons and Outcomes Retrieval Engine",

    subtitle:
      "Spaceflight Pre-Mortem Agent Over NASA's Lessons Learned",

    sigil: "lens",

    // DRAFT: rewrite in your own words.
    epigraph: {
      text:
        "Every failure in the corpus was written down by someone who had already paid for it. The work is making sure the next person finds it in time.",
      source: "On the lessons learned corpus",
    },

    type:
      "Deployed AI Engineering Project",

    description:
      "A deployed agent that takes a description of a spacecraft system or operation and returns the past failures most like it, with what the investigators recommended and a link to every source. It searches 2,117 NASA lessons and 17 mishap investigation reports, from Apollo 1 to Glory.",

    problem:
      "NASA records what went wrong on past missions, but engineers have to find those lessons while designing. The one that matters is usually about different hardware that failed the same way, which keyword search does not connect.",

    approach: [
      "Built a searchable archive of 2,117 NASA lessons and 17 mishap reports, running OCR only on the pages that needed it.",
      "Had Claude generate failure hypotheses and search once per hypothesis, because dense retrieval matched topic, not failure mechanism.",
      "Tested it on 13 obscure incidents the model cannot recall, because it recognised all five famous test cases.",
      "Recovered rotated pages in the scanned reports by detecting their orientation, including the touchdown-sensor logic behind the Mars Polar Lander board's probable cause.",
      "Replaced reciprocal rank fusion with round-robin interleaving after fusion buried the specific precedent under generic documents.",
      "Replaced a vague 0 to 2 relevance scale, on which three graders gave three different answers, with two yes or no questions per incident, graded the disputed documents myself, and validated an LLM judge against those answers.",
      "Built the product as a tool-using agent with search and read tools, and audit every link in an answer against the documents the agent retrieved in that conversation.",
      "Ran the same question through Haiku, Sonnet and Opus, and chose Sonnet after Haiku added advice that was not in the sources.",
      "Deployed it as one FastAPI service with streaming progress, a daily spend cap kept in Postgres, and pre-computed examples that cost nothing to view."
    ],

    stats: [
      {
        value: "5 of 7",
        label: "Held-Out Incidents With the Right Precedent in the Top 30, vs 2 of 7 for Keyword, Dense or Hybrid Search"
      },
      {
        value: "0.78",
        label: "LLM Judge Agreement With My Grading (Weighted Kappa), Up From 0.57"
      }
    ],

    highlights: [
      "On incidents the model cannot recall, hypothesis-driven search found the lesson describing the same failure for 5 of 7, and for 3 of the 4 hard ones where plain keyword search found none. Seven is a small sample, and the write-up says so.",
      "The contamination check changed the evaluation: an anonymised paragraph was enough for the model to name Mars Observer, Cassini and the Mars rovers, which ruled out 43 of 56 candidate incidents.",
      "Found two lessons in NASA's database dated before the mishaps they describe, which would have leaked answers into the test, and added a check that scans for more.",
      "For 6 of the 13 held-out incidents the archive holds no precedent at all, so no search method could have warned about them.",
      "A typical live answer makes 4 to 8 searches, reads 5 to 9 documents and costs about 8 cents. The whole evaluation cost about $26 in API calls."
    ],

    technologies: [
      "Claude API",
      "Tool Use",
      "RAG",
      "LLM Evaluation",
      "BM25",
      "FastAPI",
      "PostgreSQL",
      "Tesseract OCR"
    ],

    images: [
      {
        src: "/images/lore-heldout.png",
        alt: "Bar chart of held-out incidents with a direct precedent in the top 30: keyword 2 of 7, dense 2 of 7, hybrid 2 of 7, hypotheses plus keyword 5 of 7, hypotheses plus hybrid 5 of 7",
        caption:
          "Incidents where the lesson describing the same failure appears in the top 30 results. Searching by generated failure hypotheses finds it for 5 of 7, against 2 of 7 for the other methods."
      }
    ],

    github:
      "https://github.com/basharfkhan/lore",

    demo:
      "https://lore-yy66.onrender.com"
  },


  /* ======================================================
     PROJECT 04
     DATA SCIENCE SALARY ESTIMATOR
  ====================================================== */

  {
    number: "04",

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
     PROJECT 05
     PATIENT READMISSION
  ====================================================== */

  {
    number: "05",

    title:
      "Patient Readmission Prediction",

    subtitle:
      "Clinical Machine Learning Classification",

    type:
      "Machine Learning Project",

    description:
      "A classification study on 100k hospital encounters that ends in a negative result: on this data, with these features, the models cannot usefully identify who will be readmitted within 30 days. The interesting part is why the headline accuracy hides that.",

    problem:
      "Readmission within 30 days is costly and often preventable, so predicting it is a standard clinical ML task. It is also severely imbalanced: only 11.2% of encounters end in one. That imbalance is what makes accuracy the wrong thing to look at, and it is the trap this project walked into before walking back out.",

    approach: [
      "Prepared 101,766 encounters from the UCI diabetes readmission dataset: dropped columns over 40% missing, imputed the rest, and encoded categorical clinical fields.",
      "Compared five classifiers, including Random Forest, XGBoost and a Decision Tree, and applied SMOTE to rebalance the training set.",
      "Scored them on recall, precision and F1 for the minority class rather than on accuracy alone, and compared against the majority-class baseline.",
      "Read the confusion matrices, which is where the result became clear: the tree ensembles had collapsed onto the majority class despite the resampling.",
      "Used feature importance to check which clinical variables the models leaned on."
    ],

    stats: [
      {
        value: "4%",
        label: "Of Readmissions Actually Caught By XGBoost"
      },
      {
        value: "88.8%",
        label: "Accuracy Of Predicting Nobody Is Readmitted"
      }
    ],

    highlights: [
      "XGBoost and Random Forest score 0.89 accuracy, while always answering 'not readmitted' scores 0.888 on the same split.",
      "On readmissions themselves they recall 0.04 and 0.03, at F1 of 0.08 and 0.05, so the accuracy is the base rate rather than skill.",
      "SMOTE balanced the training set but did not change behaviour on the held-out data.",
      "The Decision Tree trades accuracy for recall (0.19 recall at 0.79 accuracy), which is the direction a clinical screening tool would want."
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
          "Accuracy across the models evaluated. Every bar sits near the 88.8% that predicting 'not readmitted' for everyone would score, so the accuracy figure carries almost no information."
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
     PROJECT 06
     LAMBDA ARCHITECTURE
  ====================================================== */

  {
    number: "06",

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
     PROJECT 07
     MEDALLION ARCHITECTURE
  ====================================================== */

  {
    number: "07",

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
     PROJECT 08
     WORLD LAYOFFS
  ====================================================== */

  {
    number: "08",

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