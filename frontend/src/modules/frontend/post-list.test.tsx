import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import PostList from '@/modules/frontend/post-list';
import { usePostList } from '@/hooks/frontend/postList';

vi.mock('@/hooks/frontend/postList', () => ({
  usePostList: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => <img alt={alt} {...props} />,
}));

vi.mock('@/i18n/routing', () => ({
  Link: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: () => '/post',
}));

const mockedUsePostList = vi.mocked(usePostList);
type UsePostListResult = ReturnType<typeof usePostList>;
type UsePostListTranslator = UsePostListResult['t'];
type UsePostListItem = UsePostListResult['posts'][number];

const createTranslator = (): UsePostListTranslator => {
  const translator = ((key: string) => key) as UsePostListTranslator;
  translator.rich = vi.fn((key: string) => key) as UsePostListTranslator['rich'];
  translator.markup = vi.fn((key: string) => key) as UsePostListTranslator['markup'];
  translator.raw = vi.fn((key: string) => key) as UsePostListTranslator['raw'];
  translator.has = vi.fn(() => true) as UsePostListTranslator['has'];
  return translator;
};

const createPost = (overrides: Partial<UsePostListItem> = {}): UsePostListItem => ({
  id: 1,
  title: '預設文章',
  content: '預設內容',
  tags: ['default'],
  group: '小工具',
  category: '小工具',
  author: 'Wendy',
  createdAt: '2024-06-01',
  updateAt: '2024-06-05',
  image: 'https://example.com/default.png',
  enable: true,
  link: {
    page: '/tools/default',
    github: '/',
    npm: '/',
    web: '/',
  },
  stats: {
    views: 0,
    clicks: 0,
  },
  ...overrides,
});

describe('PostList', () => {
  beforeEach(() => {
    mockedUsePostList.mockReset();
  });

  it('renders loading state while posts are being prepared', () => {
    mockedUsePostList.mockReturnValue({
      t: createTranslator(),
      isLoading: true,
      posts: [],
    });

    render(<PostList />);

    expect(screen.getByTestId('post-list-grid')).toBeInTheDocument();
    expect(screen.getByTestId('post-list-loading')).toHaveTextContent('Loading...');
  });

  it('模擬 usePostList 回傳空陣列，驗證空狀態訊息是否正確顯示', () => {
    mockedUsePostList.mockReturnValue({
      t: createTranslator(),
      isLoading: false,
      posts: [],
    });

    render(<PostList />);

    expect(screen.getByTestId('post-list-empty')).toHaveTextContent('No posts found.');
  });


  it('模擬 usePostList 回傳兩篇文章，驗證文章卡片是否正確渲染並包含正確的內容與連結', () => {
    mockedUsePostList.mockReturnValue({
      t: createTranslator(),
      isLoading: false,
      posts: [
        createPost({
          id: 1,
          title: '文字計算工具',
          content: '文字與段落計算。',
          tags: ['string'],
          group: '小工具',
          category: '小工具',
          image: 'https://example.com/tool.png',
          author: 'Wendy',
          link: {
            page: '/tools/text',
            github: '/',
            npm: '/',
            web: '/',
          },
        }),
        createPost({
          id: 2,
          title: '前端筆記',
          content: '整理元件設計與實作。',
          tags: ['react'],
          group: '文章',
          category: 'Frontend',
          image: 'https://example.com/post.png',
          author: 'Wendy',
          link: {
            page: '/ignored',
            github: '/',
            npm: '/',
            web: '/',
          },
        }),
      ],
    });

    render(<PostList />);

    expect(screen.getByTestId('post-card-link-1')).toHaveAttribute('href', '/tools/text');
    expect(screen.getByTestId('post-card-title-1')).toHaveTextContent('文字計算工具');
    expect(screen.getByTestId('post-card-group-1')).toHaveTextContent('小工具');
    expect(screen.getByTestId('post-card-author-1')).toHaveTextContent('Wendy');

    expect(screen.getByTestId('post-card-link-2')).toHaveAttribute('href', '/post/2');
    expect(screen.getByTestId('post-card-title-2')).toHaveTextContent('前端筆記');
    expect(screen.getByTestId('post-card-description-2')).toHaveTextContent('整理元件設計與實作。');
  });
});