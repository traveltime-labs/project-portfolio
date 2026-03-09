/**
  modules: 負責「組合這個頁面的一些功能區塊」
  ex: 組合家具（PostList, CommentBtn），這房間只屬於這個房子
  * 
 */

import { Link } from "@/i18n/routing";
import { getTagCounts } from "@/hooks/blogLists";

const Content = () => {
  const tagGroups = getTagCounts();

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">標籤列表</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(tagGroups).length === 0 ? (
          <div className="text-sm text-gray-500">No posts found.</div>
        ) : (
          Object.entries(tagGroups).map(([tag, count]) => (
            <div key={tag} className="text-sm">

              <Link href={`/tags/${tag}`}>
                {tag} ({count})
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Content;
