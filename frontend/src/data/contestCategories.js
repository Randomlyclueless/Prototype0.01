const contestCategories = [
  {
    category: "Data Science & Machine Learning Competitions",
    contests: [
      {
        name: "Kaggle",
        description: "Popular ML/DS competitions with cash prizes",
        link: "https://www.kaggle.com/",
      },
      {
        name: "DrivenData",
        description: "Social impact data science challenges",
        link: "https://www.drivendata.org/",
      },
      {
        name: "CrowdANALYTIX",
        description: "Business-focused analytics competitions",
        link: "https://crowdanalytix.com/",
      },
      {
        name: "Zindi",
        description: "Africa-focused data science competitions",
        link: "https://zindi.africa/",
      },
      {
        name: "AIcrowd",
        description: "Research-oriented AI challenges",
        link: "https://www.aicrowd.com/",
      },
      {
        name: "Bitgrit",
        description: "Practical AI challenges platform",
        link: "https://bitgrit.net/",
      },
      {
        name: "Analytics Vidhya",
        description: "Indian ML hackathons & challenges",
        link: "https://datahack.analyticsvidhya.com/",
      },
      {
        name: "MachineHack",
        description: "Indian platform for ML competitions",
        link: "https://machinehack.com/",
      },
      {
        name: "Tianchi",
        description: "Alibaba's competition platform",
        link: "https://tianchi.aliyun.com/",
      },
      {
        name: "KDD Cup",
        description: "Academic ML competition by KDD conference",
        link: "https://www.kdd.org/kdd-cup",
      },
    ],
  },
  {
    category: "NLP & Language Processing",
    contests: [
      {
        name: "SemEval",
        description: "Semantic evaluation shared tasks",
        link: "https://semeval.github.io/",
      },
      {
        name: "CoNLL",
        description: "Conference on Natural Language Learning tasks",
        link: "https://www.conll.org/",
      },
      {
        name: "CLEF",
        description: "Cross-Language Evaluation Forum",
        link: "http://www.clef-initiative.eu/",
      },
      {
        name: "TREC",
        description: "Text REtrieval Conference challenges",
        link: "https://trec.nist.gov/",
      },
      {
        name: "WMT",
        description: "Workshop on Machine Translation",
        link: "http://www.statmt.org/wmt22/",
      },
    ],
  },
  {
    category: "SQL & Database Competitions",
    contests: [
      {
        name: "Hackerrank SQL Challenges",
        description: "SQL practice and competitions",
        link: "https://www.hackerrank.com/domains/sql",
      },
      {
        name: "LeetCode Database",
        description: "SQL coding problems and contests",
        link: "https://leetcode.com/problemset/database/",
      },
      {
        name: "Mode Analytics SQL Tutorial",
        description: "Hands-on SQL challenges",
        link: "https://mode.com/sql-tutorial/",
      },
      {
        name: "StrataScratch",
        description: "Real interview SQL problems",
        link: "https://www.stratascratch.com/",
      },
      {
        name: "DataLemur",
        description: "SQL interview practice",
        link: "https://datalemur.com/",
      },
    ],
  },
  {
    category: "AI/ML Research Competitions",
    contests: [
      {
        name: "NeurIPS Competition Track",
        description: "Annual ML research competitions",
        link: "https://neurips.cc/",
      },
      {
        name: "ICML",
        description: "Machine Learning competitions",
        link: "https://icml.cc/",
      },
      {
        name: "ICLR",
        description: "Learning representation challenges",
        link: "https://iclr.cc/",
      },
      {
        name: "CVPR",
        description: "Computer vision challenges",
        link: "https://cvpr.thecvf.com/",
      },
      {
        name: "ICCV",
        description: "International Conference on Computer Vision",
        link: "https://iccv2023.thecvf.com/",
      },
      {
        name: "ECCV",
        description: "European Computer Vision conference",
        link: "https://eccv2024.ecva.net/",
      },
    ],
  },
  {
    category: "Specialized Platforms",
    contests: [
      {
        name: "CodaLab",
        description: "Open-source platform for ML competitions",
        link: "https://codalab.lisn.upsaclay.fr/",
      },
      {
        name: "EvalAI",
        description: "AI evaluation and competition hosting",
        link: "https://eval.ai/",
      },
      {
        name: "Papers with Code",
        description: "Benchmark ML models and challenges",
        link: "https://paperswithcode.com/",
      },
      {
        name: "OpenReview",
        description: "Academic ML competitions",
        link: "https://openreview.net/",
      },
    ],
  },
  {
    category: "Company-Sponsored Platforms",
    contests: [
      {
        name: "Google AI Challenges",
        description: "Occasional Google AI contests",
        link: "https://ai.google/",
      },
      {
        name: "Microsoft AI Challenge",
        description: "Various AI challenges",
        link: "https://www.microsoft.com/en-us/ai",
      },
      {
        name: "IBM Call for Code",
        description: "Social impact technology competitions",
        link: "https://developer.ibm.com/callforcode/",
      },
      {
        name: "Facebook AI Challenges",
        description: "Research-focused AI competitions",
        link: "https://ai.facebook.com/",
      },
    ],
  },
  {
    category: "Programming & DSA",
    contests: [
      {
        name: "LeetCode",
        description: "Weekly and biweekly coding contests",
        link: "https://leetcode.com/contest/",
      },
      {
        name: "Codeforces",
        description: "Frequent rated programming contests",
        link: "https://codeforces.com/",
      },
      {
        name: "CodeChef",
        description: "Monthly contests and Cook-Offs",
        link: "https://www.codechef.com/contests",
      },
      {
        name: "AtCoder",
        description: "Japanese competitive programming platform",
        link: "https://atcoder.jp/",
      },
      {
        name: "TopCoder",
        description: "SRMs and marathon matches",
        link: "https://www.topcoder.com/",
      },
      {
        name: "HackerRank",
        description: "Programming challenges and hackathons",
        link: "https://www.hackerrank.com/contests",
      },
      {
        name: "HackerEarth",
        description: "Hackathons and coding contests",
        link: "https://www.hackerearth.com/challenges/",
      },
      {
        name: "GeeksforGeeks",
        description: "Practice contests & hiring challenges",
        link: "https://practice.geeksforgeeks.org/contests",
      },
      {
        name: "SPOJ",
        description: "Programming contests and problems",
        link: "https://www.spoj.com/",
      },
    ],
  },
];

export default contestCategories;
