// src/data/blogData.js
export const blogPosts = [
    {
      slug: "autore",
      title: "Harness 用于 autoresearch",
      date: "2026-04-01",
      tags: ["#Agent"],
      cover: "https://lvyovo-wiki.tech/blogs/autore/44e9306b42119659.jpg",
      summary: "如何设计自动化的评估函数",
      likes: 2136,
      toc: [
        { id: "harness-用于自动化科研", text: "Harness 用于自动化科研", level: 1 },
        { id: "可以搜索的harness对象", text: "可以搜索的'Harness'对象", level: 2 },
        { id: "评估信号自动化", text: "**评估信号自动化**", level: 2 },
        { id: "挑战", text: "挑战", level: 2 },
        { id: "落地", text: "落地", level: 1 },
        { id: "切入", text: "切入", level: 1 },
      ],
    },
    {
        slug: "nhl-stats",
        title: "数据驱动：使用 Python 预测 NHL 球员表现",
        date: "2026-04-05",
        tags: ["#DataScience", "#Python"],
        cover: "https://images.unsplash.com/photo-1515703407324-5f753eed2411?q=80&w=800",
        summary: "如何利用 NHL 历史数据构建预测模型，量化球员的得分潜力。",
        likes: 84,
        toc: [
          { id: "eda", text: "结构化数据探索", level: 1 },
          { id: "modeling", text: "模型选取与训练", level: 1 },
          { id: "conclusion", text: "实战结论", level: 1 },
        ],
      },
      {
        slug: "ui-magic",
        title: "前端开发中的‘魔术师’思维：不仅仅是样式",
        date: "2026-03-28",
        tags: ["#Frontend", "#Magic"],
        cover: "https://images.unsplash.com/photo-1523349282711-1558da797bd3?q=80&w=800",
        summary: "探索魔术表演中的‘错误引导’技巧如何帮助我们设计更好的 UI 交互。",
        likes: 312,
        toc: [
          { id: "misdirection", text: "错误引导与视觉重心", level: 1 },
          { id: "continuity", text: "交互的连贯性", level: 1 },
          { id: "surprise", text: "创造惊艳瞬间", level: 2 },
        ],
      }
    // Add more post metadata here as you write them
  ];