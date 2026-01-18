// post API
import { api } from '@/services/api'
import { BUSINESS_STATUS_CODE } from "@/config/constants";

export const getPostList = async () => {
    const res = await api.getPosts()
    if (res.status != BUSINESS_STATUS_CODE.SUCCESS) throw new Error(res.message)
    return res.data
}

export const addPost = async (data: Post) => {
    const res = await api.addPost(data)
    if (res.status != BUSINESS_STATUS_CODE.SUCCESS) throw new Error(res.message)
    return res.data
}

export const updatePost = async (data: Post) => {
    const res = await api.updatePost(data)
    if (res.status != BUSINESS_STATUS_CODE.SUCCESS) throw new Error(res.message)
    return res.data
}

export const deletePost = async (data: { id: number }) => {
    const res = await api.deletePost(data)
    if (res.status != BUSINESS_STATUS_CODE.SUCCESS) throw new Error(res.message)
    return res.data
}

export const getPost = async (id: string) => {
    // const res = await api.getPost(id)
    // if (res.status != BUSINESS_STATUS_CODE.SUCCESS) throw new Error(res.message)
    // return res.data
    return {
        status: BUSINESS_STATUS_CODE.SUCCESS,
        message: "Success",
        data: {}
    }
}