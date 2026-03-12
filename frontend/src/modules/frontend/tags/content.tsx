import { Link } from "@/i18n/routing";
import { getTagCounts } from "@/hooks/blogLists";

const Content = () => {
  const tagGroups = getTagCounts();

  return (
    <div className="container mx-auto py-8" data-testid="tags-page">
      <h2 className="text-2xl font-bold mb-6" data-testid="tags-title">標籤列表</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="tags-list">
        {Object.keys(tagGroups).length === 0 ? (
          <div className="text-sm text-gray-500" data-testid="tags-empty-state">No posts found.</div>
        ) : (
          Object.entries(tagGroups).map(([tag, count]) => (
            <div key={tag} className="text-sm" data-testid={`tags-item-${encodeURIComponent(tag)}`}>

              <Link href={`/tags/${tag}`} data-testid={`tags-link-${encodeURIComponent(tag)}`}>
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
