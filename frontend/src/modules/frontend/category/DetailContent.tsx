import { Link, usePathname } from "@/i18n/routing"; // 注意要用我們自定義的 Link

// 標籤分類點選後列表頁面
// 組合內容
const Content = () => {
  
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">XX分類列表</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">分類文章列表</h3>
          <ul className="list-disc list-inside">
            <li><Link href="/post/slug1" className="text-blue-500 hover:underline">文章標題 1</Link></li>
            <li><Link href="/post/slug2" className="text-blue-500 hover:underline">文章標題 2</Link></li>
            <li><Link href="/post/slug3" className="text-blue-500 hover:underline">文章標題 3</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Content;
