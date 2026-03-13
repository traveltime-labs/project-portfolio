import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc'; // 注意：App Router 使用 /rsc 版本
import { notFound } from 'next/navigation';
import type { HTMLAttributes, ReactNode } from 'react';
import remarkGfm from 'remark-gfm';
import remarkSupersub from 'remark-supersub';
import BlogHeadingsSync from '@/components/BlogHeadingsSync';
import BreadcrumbTitleSync from '@/components/BreadcrumbTitleSync';
import { Link } from '@/i18n/routing';
import { createHeadingId, extractMarkdownHeadings, extractTextFromReactNode } from '@/lib/blogHeadings';
import { readPostFile } from '@/lib/postContent';
import { cn } from '@/lib/utils';

/**
 * 預處理 Markdown 原文，將 HackMD 擴充語法轉換為 HTML inline 標籤：
 *   ==text==  →  <mark>text</mark>  （螢光標記）
 *   ++text++  →  <ins>text</ins>   （底線）
 * 程式碼區塊（```）與行內程式碼（`code`）內容不受影響。
 */
function preprocessContent(source: string): string {
  const lines = source.split('\n');
  let inCodeBlock = false;

  return lines
    .map((line) => {
      if (/^\s*```/.test(line)) {
        inCodeBlock = !inCodeBlock;
        return line;
      }
      if (inCodeBlock) return line;

      // 暫存行內程式碼，避免被替換
      const codes: string[] = [];
      let out = line.replace(/`[^`]+`/g, (m) => {
        codes.push(m);
        return `\x00${codes.length - 1}\x00`;
      });

      out = out.replace(/==([^=\n]+)==/g, '<mark>$1</mark>');
      out = out.replace(/\+\+([^+\n]+)\+\+/g, '<ins>$1</ins>');

      return out.replace(/\x00(\d+)\x00/g, (_, i) => codes[Number(i)]);
    })
    .join('\n');
}

/*
matter(fileContent)：將 Markdown 最上方的 --- 區域拆開。data 變數裡會有 title 和 category，而 content 就是剩下的文章本體。
MDXRemote (RSC)：在 Next.js 15 的 App Router 中，直接使用伺服器組件（Server Component）版本的渲染器，效能極高，且對 SEO 完美。
prose class：這來自你裝的 @tailwindcss/typography。Markdown 轉出來的 <h1> 或 <ul> 原本是沒有樣式的（被 Tailwind 重設了），加上 prose 之後，Tailwind 就會自動幫你加上漂亮的間距、字體大小和顏色。

*/

// 部落格文章內文
const Content = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const postFile = readPostFile(slug);
  if (!postFile) {
    notFound();
  }

  const { fileContent } = postFile;

  const { content, data } = matter(fileContent);
  const safeDate = typeof data.date === 'string' ? data.date : '';
  const safeCategory = typeof data.category === 'string' ? data.category : '';
  const safeTags = Array.isArray(data.tags)
    ? data.tags.map((tag) => String(tag)).filter(Boolean)
    : typeof data.tags === 'string'
      ? [data.tags]
      : [];
  const headings = extractMarkdownHeadings(content);
  const headingIdCounts = new Map<string, number>();

  const createHeadingComponent = (tag: 'h2' | 'h3' | 'h4') => {
    return ({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement> & { children?: ReactNode }) => {
      const Tag = tag;
      const text = extractTextFromReactNode(children);
      const id = createHeadingId(text, headingIdCounts);

      return (
        <Tag
          {...props}
          id={id}
          className={cn('scroll-mt-28', className)}
          data-heading-anchor={id}
        >
          {children}
        </Tag>
      );
    };
  };

  // 4. 預處理：轉換 ==highlight== / ++underline++ 語法
  const processedContent = preprocessContent(content);

  return (
    <main className="mx-auto py-10 px-3 lg:pr-0" data-testid="blog-detail-page">
      <BlogHeadingsSync headings={headings} />
      <BreadcrumbTitleSync title={typeof data.title === 'string' ? data.title : undefined} />
      <header className="mb-8 max-w-4xl" data-testid="blog-detail-header">
        <h1 className="text-4xl font-bold mb-2" data-testid="blog-detail-title">{data.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-gray-500" data-testid="blog-detail-meta">
          {safeDate ? <span data-testid="blog-detail-date">{safeDate}</span> : null}
          {safeCategory ? (
            <>
              {safeDate ? <span>|</span> : null}
              <Link href={`/category/${encodeURIComponent(safeCategory)}`} className="text-blue-600 hover:underline" data-testid="blog-detail-category-link">
                {safeCategory}
              </Link>
            </>
          ) : null}
        </div>
        {safeTags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2" data-testid="blog-detail-tags">
            {safeTags.map((tag, index) => (
              <Link
                key={`${tag}-${index}`}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-200"
                data-testid={`blog-detail-tag-${encodeURIComponent(tag)}`}
              >
                #{tag}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      <article className="
        prose 
        max-w-none
        lg:prose-xl 
        dark:prose-invert 
        prose-a:text-blue-600 
        hover:prose-a:text-blue-500 
        prose-a:no-underline 
        prose-a:font-semibold
        prose-table:block
        prose-table:overflow-x-auto
        prose-th:font-semibold
        prose-td:align-top
        [&_mark]:bg-yellow-200
        [&_mark]:text-yellow-900
        [&_mark]:rounded-sm
        [&_mark]:px-0.5
        dark:[&_mark]:bg-yellow-700
        dark:[&_mark]:text-yellow-100
        [&_ins]:underline
        [&_ins]:decoration-current
        " data-testid="blog-detail-article">
        <MDXRemote
          source={processedContent}
          components={{
            h2: createHeadingComponent('h2'),
            h3: createHeadingComponent('h3'),
            h4: createHeadingComponent('h4'),
          }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkSupersub],
            },
          }}
        />
      </article>
    </main>
  );
};

export default Content;
