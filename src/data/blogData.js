// src/data/blogData.js
export const blogPosts = [
  {
    slug: "autore",
    title: "Using Harness for Autoresearch",
    date: "2026-04-01",
    tags: ["#Agent"],
    cover: "/assets/collage/aurora.jpg", 
    summary: "How to design automated evaluation functions",
    likes: 2136,
    toc: [
      { id: "harness-for-automated-research", text: "Harness for Automated Research", level: 1 },
      { id: "searchable-harness-objects", text: "Searchable Harness Objects", level: 2 },
      { id: "automated-evaluation-signals", text: "Automated Evaluation Signals", level: 2 },
      { id: "challenges", text: "Challenges", level: 2 },
      { id: "implementation", text: "Implementation", level: 1 },
      { id: "entry-point", text: "Entry Point", level: 1 },
    ],
  },
  {
    slug: "nhl-stats",
    title: "Data-Driven: Predicting NHL Player Performance using Python",
    date: "2026-04-05",
    tags: ["#DataScience", "#Python"],
    cover: "/assets/collage/roy.jpg", 
    summary: "How to use historical NHL data to build predictive models and quantify player scoring potential.",
    likes: 84,
    toc: [
      { id: "structured-data-exploration", text: "Structured Data Exploration", level: 1 },
      { id: "model-selection-and-training", text: "Model Selection and Training", level: 1 },
      { id: "practical-conclusions", text: "Practical Conclusions", level: 1 },
    ],
  },
  {
    slug: "ui-magic",
    title: "The 'Magician' Mindset in Frontend Development: Beyond Styling",
    date: "2026-03-28",
    tags: ["#Frontend", "#Magic"],
    cover: "/assets/collage/ferrari.jpg", 
    summary: "Exploring how 'misdirection' techniques in magic shows can help us design better UI interactions.",
    likes: 312,
    toc: [
      { id: "misdirection-and-visual-focus", text: "Misdirection and Visual Focus", level: 1 },
      { id: "interaction-continuity", text: "Interaction Continuity", level: 1 },
      { id: "creating-stunning-moments", text: "Creating Stunning Moments", level: 2 },
    ],
  }
];