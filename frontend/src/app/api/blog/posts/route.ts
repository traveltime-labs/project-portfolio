import { NextRequest } from 'next/server';
import { withApiHandler } from '@/utils/withApiHandler';
import { success } from '@/utils/apiResponse';
import { getAllPosts, getPostsByCategory, getRecentPosts, searchPosts } from '@/hooks/blogLists';

export const GET = withApiHandler(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const recent = Number(searchParams.get('recent') || '0');

  let posts = getAllPosts();

  if (keyword) {
    posts = searchPosts(keyword, 20);
  } else if (category) {
    posts = getPostsByCategory(category);
  } else if (recent > 0) {
    posts = getRecentPosts(recent);
  }

  return Response.json(success(posts), { status: 200 });
});
