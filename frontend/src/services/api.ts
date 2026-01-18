import { callAPI } from './fetcher'

export const api = {
    login: (data: LoginReq) => callAPI("/api/auth/login", "POST", data),
    logout: () => callAPI("/api/auth/logout", "POST"),
    getPosts: (): Promise<ApiResponse<Post[]>> => callAPI("/api/post/list", "GET"),
    addPost: (data: Post): Promise<ApiResponse<Post>> => callAPI("/api/post/add", "POST", data),
    updatePost: (data: Post): Promise<ApiResponse<Post>> => callAPI("/api/post/update", "PUT", data),
    deletePost: (data: {id: number}): Promise<ApiResponse<Post>> => callAPI("/api/post/delete", "DELETE", data),
};