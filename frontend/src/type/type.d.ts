interface Post {
  id?: number;
  title: string;
  content: string;
  tags: string[];
  group: string;
  category: string;
  image: string | File | null;
  author?: string; // 前端登入寫死
  createdAt?: string;
  updateAt?: string; // server update time
  enable: boolean; // server update time
  link: {
    page: string;
    github?: string;
    npm?: string;
    web?: string;
  };
  stats?: {
    views: number;        // 瀏覽數（進頁面,  server update time
    clicks: number;        // 點擊數（點卡片,  server update time
  };
}

interface addPostReq {
  title: string;
  content: string;
}

interface ApiResponse<T = any> {
    data?: T;
    status?: number;
    message?: string;
  }

type LoginReq = {
    account: string,
    password: string
}



