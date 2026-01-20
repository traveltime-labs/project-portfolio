import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc'; // 注意：App Router 使用 /rsc 版本

/*
matter(fileContent)：將 Markdown 最上方的 --- 區域拆開。data 變數裡會有 title 和 category，而 content 就是剩下的文章本體。
MDXRemote (RSC)：在 Next.js 15 的 App Router 中，直接使用伺服器組件（Server Component）版本的渲染器，效能極高，且對 SEO 完美。
prose class：這來自你裝的 @tailwindcss/typography。Markdown 轉出來的 <h1> 或 <ul> 原本是沒有樣式的（被 Tailwind 重設了），加上 prose 之後，Tailwind 就會自動幫你加上漂亮的間距、字體大小和顏色。

*/

// 部落格文章內文
const Content = async ({ params }: { params: Promise<{ slug: string }> }) => {
  console.log(params)
  const { slug } = await params;
  console.log(slug)

  // 1. 取得檔案路徑
  const filePath = path.join(process.cwd(), 'src', 'content', 'posts', `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return <div>找不到文章：{filePath}</div>;
  }

  // 2. 讀取檔案內容
  const fileContent = fs.readFileSync(filePath, 'utf8');

    
  // 3. 使用 gray-matter 解析 Front-matter (標題、日期等)
  const { content, data } = matter(fileContent);


  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
        <div className="text-gray-500">
          <span>{data.date}</span> | <span>{data.category}</span>
        </div>
      </header>

      <article className="
        prose 
        lg:prose-xl 
        dark:prose-invert 
        max-w-none
        prose 
        /* 設定連結顏色 */
        prose-a:text-blue-600 
        /* 設定滑鼠懸停顏色 */
        hover:prose-a:text-blue-500 
        /* 取消底線 */
        prose-a:no-underline 
        /* 增加加粗效果 */
        prose-a:font-semibold
        ">
        <MDXRemote source={content} />
      </article>
    </main>
  );
};

export default Content;
