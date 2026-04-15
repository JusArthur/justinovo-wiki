import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { blogPosts } from "../data/blogData";
import { Heart } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(post?.likes || 0);

  // 新增：用于记录当前高亮的标题 ID
  const [activeId, setActiveId] = useState("");

  // 获取 Markdown 内容
  useEffect(() => {
    if (post) {
      fetch(`/posts/${slug}.md`)
        .then((res) => res.text())
        .then((text) => setContent(text))
        .catch((err) => console.error("Error loading post content:", err));
    }
  }, [slug, post]);

  // 新增：使用 IntersectionObserver 监听滚动位置，实现 ScrollSpy
  useEffect(() => {
    // 设置一个短暂的延迟，确保 ReactMarkdown 已经将所有的 h1, h2, h3 渲染到 DOM 中
    const timeoutId = setTimeout(() => {
      const headings = document.querySelectorAll(
        ".prose h1, .prose h2, .prose h3"
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // 当标题进入视口特定区域时触发
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        // rootMargin 设置检测范围：当标题到达屏幕顶部往下 100px 到 屏幕中间 之间时触发
        { rootMargin: "-100px 0px -60% 0px" }
      );

      headings.forEach((heading) => observer.observe(heading));

      return () => observer.disconnect();
    }, 200); // 200ms 等待渲染完成

    return () => clearTimeout(timeoutId);
  }, [content]); // 当文章内容发生变化时重新绑定监听

  // 新增：点击目录平滑滚动
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!post) return <div className="pt-32 text-center">Post not found</div>;

  return (
    <div className="mx-auto flex max-w-[1140px] justify-center gap-6 px-6 pt-28 pb-12 max-sm:px-0">
      <article className="card bg-article static flex-1 overflow-auto rounded-xl p-8 border border-white/20 dark:border-gray-800 shadow-sm relative">
        <div className="text-center text-2xl font-semibold text-gray-800 dark:text-white">
          {post.title}
        </div>
        <div className="text-secondary mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="text-secondary mt-3 text-center text-sm">
          {post.date}
        </div>

        <div className="prose dark:prose-invert mt-6 max-w-none dark:text-gray-300">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Sidebar logic */}
      <div className="sticky top-24 flex w-[200px] shrink-0 flex-col gap-4 self-start max-sm:hidden">
        <div className="glass-card w-full rounded-xl border p-3 border-white/20 dark:border-gray-800 shadow-sm">
          <img
            alt="cover"
            className="rounded-xl border border-white/10 object-cover w-full h-auto"
            src={post.cover}
          />
        </div>
        <div className="glass-card w-full rounded-xl border p-3 text-sm border-white/20 dark:border-gray-800 shadow-sm">
          <h2 className="text-secondary mb-2 font-medium">Summary</h2>
          <p className="text-secondary leading-relaxed">{post.summary}</p>
        </div>

        {/* Table of Contents Section */}
        <div className="glass-card w-full rounded-xl border p-3 text-sm border-white/20 dark:border-gray-800 shadow-sm">
          <h2 className="text-secondary mb-3 font-medium border-b border-gray-200 dark:border-gray-800 pb-2">
            Table of Contents
          </h2>

          {/* FIXED: Changed to overflow-y-auto and overflow-x-hidden to kill the horizontal scrollbar */}
          <div className="space-y-3 relative max-h-[400px] overflow-y-auto overflow-x-hidden scrollbar-none">
            {post.toc.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollTo(e, item.id)}
                  // FIXED: Added pr-2 and break-words for better text wrapping, updated color to #35bfab
                  className={`block transition-all duration-300 transform break-words pr-2
                    ${
                      item.level === 1
                        ? "font-medium"
                        : "pl-4 text-[13px] border-l border-gray-200 dark:border-gray-700 ml-1"
                    } 
                    ${
                      isActive
                        ? "text-[#35bfab] translate-x-1"
                        : "text-gray-500 hover:text-[#35bfab] hover:translate-x-1"
                    }`}
                >
                  {item.text}
                </a>
              );
            })}
          </div>
        </div>

        {/* Like Button */}
        <button
          onClick={() =>
            setLikes(likes === post.likes ? likes + 1 : post.likes)
          }
          aria-label="Like this post"
          // FIXED: Added `self-start` to prevent it from stretching to 100% width
          className="glass-card self-start relative overflow-visible rounded-full p-3 flex items-center justify-center transition-transform duration-200 hover:scale-[1.02] active:scale-95"
        >
          <span className="absolute -top-2 left-9 min-w-6 rounded-full px-1.5 py-1 text-center text-xs text-white tabular-nums bg-gray-300 dark:bg-gray-600">
            {likes}
          </span>
          <div>
            <Heart
              size={28}
              strokeWidth={2}
              className={`transition-colors duration-300 ${
                likes > post.likes
                  ? "fill-rose-300 text-rose-300 dark:fill-rose-400 dark:text-rose-400"
                  : "fill-transparent text-gray-400 hover:text-rose-200 dark:hover:text-rose-300"
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
