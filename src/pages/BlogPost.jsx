import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { blogPosts } from "../data/blogData";
import { Heart } from "lucide-react";
// 引入 Markdown 相关库
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(post?.likes || 0);

  useEffect(() => {
    if (post) {
      // 异步获取 Markdown 纯文本内容
      fetch(`/posts/${slug}.md`)
        .then((res) => res.text())
        .then((text) => setContent(text))
        .catch((err) => console.error("Error loading post content:", err));
    }
  }, [slug, post]);

  if (!post) return <div className="pt-32 text-center">Post not found</div>;

  return (
    <div className="mx-auto flex max-w-[1140px] justify-center gap-6 px-6 pt-28 pb-12 max-sm:px-0">
      <article className="card bg-article static flex-1 overflow-auto rounded-xl p-8 border border-white/20 dark:border-gray-800 shadow-sm">
        <div className="text-center text-2xl font-semibold text-gray-800 dark:text-white">{post.title}</div>
        <div className="text-secondary mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
          {post.tags.map(tag => <span key={tag}>{tag}</span>)}
        </div>
        <div className="text-secondary mt-3 text-center text-sm">{post.date}</div>
        
        {/* 使用 ReactMarkdown 渲染内容，搭配 Tailwind 的 prose 样式 */}
        <div className="prose dark:prose-invert mt-6 max-w-none dark:text-gray-300">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeSlug]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>

      {/* 右侧边栏 (TOC & Likes) 保持不变 */}
      <div className="sticky top-24 flex w-[200px] shrink-0 flex-col gap-4 self-start max-sm:hidden">
        <div className="glass-card w-full rounded-xl border p-3 border-white/20 dark:border-gray-800 shadow-sm">
          <img alt="cover" className="rounded-xl border border-white/10 object-cover w-full h-auto" src={post.cover} />
        </div>
        <div className="glass-card w-full rounded-xl border p-3 text-sm border-white/20 dark:border-gray-800 shadow-sm">
          <h2 className="text-secondary mb-2 font-medium">Summary</h2>
          <p className="text-secondary leading-relaxed">{post.summary}</p>
        </div>
        <div className="glass-card w-full rounded-xl border p-3 text-sm border-white/20 dark:border-gray-800 shadow-sm">
          <h2 className="text-secondary mb-2 font-medium">Table of Contents</h2>
          <div className="space-y-2">
            {post.toc.map((item) => (
              <a key={item.id} href={`#${item.id}`} className={`hover:text-brand block transition-colors ${item.level === 1 ? 'font-medium' : 'pl-3 text-gray-500'}`}>
                {item.text}
              </a>
            ))}
          </div>
        </div>
        <button onClick={() => setLikes(likes + 1)} className="glass-card relative rounded-full p-3 flex justify-center hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all">
          <span className="absolute -top-2 left-12 rounded-full px-1.5 py-0.5 text-[10px] text-white bg-gray-400">{likes}</span>
          <Heart className={`w-6 h-6 ${likes > post.likes ? 'fill-rose-500 text-rose-500' : 'text-rose-300'}`} />
        </button>
      </div>
    </div>
  );
}