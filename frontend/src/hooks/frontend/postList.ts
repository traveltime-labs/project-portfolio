"use client"
import {useTranslations} from 'next-intl';
import { toolsAPI } from "@/config/fackToolsAPI";

export const usePostList = () => {
    const t = useTranslations('HomePage');
    let isLoading = true

    let data = {
        posts: toolsAPI
    }


    if (data?.posts) {
        data.posts = toolsAPI
        isLoading = false
    }
    // 假模擬結束
    const {posts=[]/*, totalPages*/} = data || {};

    return {
        t,
        isLoading,
        posts
    }
}