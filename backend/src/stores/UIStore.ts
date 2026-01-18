import { defineStore } from 'pinia'


export const useUIStore = defineStore('UIStore', () => {
    const loading = ref(true)

    const showLoading = (action: boolean) => {
        try {
            loading.value = action
            // let el = document.getElementById('app')
            // if (loading.value && el) el.classList.add('overflow-hidden', 'h-screen')
            // if (loading.value && el) el.classList.remove('overflow-hidden', 'h-screen')
        } catch (e) {
            console.error(`loading 載入異常:${e}`)
        }
    }

    return {
        loading,
        showLoading
    }
})
