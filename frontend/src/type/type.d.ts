


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
  // enable: boolean; // server update time
}


// 就有
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

interface PostMeta {
  slug: string;
  title?: string;
  date?: string;
  category?: string;
  excerpt?: string;
  tags? : string[] | string;
}

