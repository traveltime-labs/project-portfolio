import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import routes from 'virtual:generated-pages'
// import { useUIStore } from '@/stores/UIStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[]
})

// // loading 遮罩設定
// router.beforeEach(async (to, from, next) => {
//   const ui = useUIStore()
//   ui.showLoading(true)

//   await new Promise(resolve => setTimeout(resolve, 50))
//   next()
// })

// router.afterEach(() => {
//   const ui = useUIStore()
//   // 延遲一點點關掉 loading
//   setTimeout(() => {
//     ui.showLoading(false)
//   }, 500)
// })

export default router
