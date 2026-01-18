interface PostProps {
  post?: Post;
}

// 列表卡片
const Post = ({ post }: PostProps) => {
  console.log(post)
  const { title = "--", content = "-", createdAt = 0 } = post || {};
  return (
    <div className="w-full border-b border-white/10 py-6">
      test-----文件插件
      <h3 className="text-sm text-white font-bold">{title}</h3>
      <p className="text-sm text-white/50 mt-2">{content}</p>
      <p className="text-sm text-white/50 mt-2">
        {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default Post;
