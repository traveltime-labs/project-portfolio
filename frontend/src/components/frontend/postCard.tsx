"use client";

import { Link, usePathname } from "@/i18n/routing"; // 注意要用我們自定義的 Link
import Image from "next/image";

// interface Post {
//   id: number | string;
//   title: string;
//   content: string;
//   author: string;
//   group: string;
//   image?: string;
//   link: {
//     page: string;
//   };
// }

// interface PostCardProps {
//   post: Post;
// }

const PostCard = ({post}: any) => {
  const href = post.group === "小工具" ? post.link.page : `/post/${post.id}`;

  return (
    <Link
      href={href}
      data-testid={`post-card-link-${post.id}`}
      className="block border border-zinc-900/10 dark:border-white/20
        relative overflow-hidden transition-transform duration-300
        hover:-translate-y-2 cursor-pointer will-change-transform
        animate-fade animate-duration-500 rounded-2xl"
    >
      {/* 圖片 */}
      <div className="aspect-video bg-gray-700" data-testid={`post-card-image-${post.id}`}>
        {post.image && (
          <Image
            className="object-cover w-full h-full"
            src={post.image}
            alt={post.title}
            width={400}
            height={225}
          />
        )}
      </div>

      {/* 內容 */}
      <div className="p-4 bg-white dark:bg-black transition-colors" data-testid={`post-card-content-${post.id}`}>
        <h3 className="font-bold mb-2" data-testid={`post-card-title-${post.id}`}>
          {post.title}
          <small className="ml-2 bg-amber-800 p-1 rounded-sm text-white text-xs" data-testid={`post-card-group-${post.id}`}>
            {post.group}
          </small>
        </h3>

        <p className="text-blue-400 text-xs mb-4" data-testid={`post-card-author-${post.id}`}>
          {post.author}
        </p>

        <p className="text-gray-400 text-sm mb-2 line-clamp-3" data-testid={`post-card-description-${post.id}`}>
          {post.content}
        </p>
      </div>
    </Link>
  );
};

export default PostCard;
