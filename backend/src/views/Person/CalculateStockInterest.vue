<script setup lang="ts">
import SearchIcon from '@/icons/SearchIcon.vue'
const isShowStockModal = ref(false)
const currentPageTitle = ref('Form Elements')
const products = ref([
  {
    sotckName: '台積電"',
    stockCode: '2330',
    quantity: 2,
    image: 'https://s3-symbol-logo.tradingview.com/taiwan-semiconductor.svg',
    category: '電子股',
    averageCost: '$123',
    totalCost: '#123',
    lastBuyDate: '2024/03/24',
  },
])

const openModal = (isOpen: boolean) => {
  isShowStockModal.value = isOpen ? true : false
}

const updateSave = () => {
  console.log('-- updateSave --')
}

const sort = () => {
  console.log('-- sort --')
}
</script>

<template>
  <AdminLayout>
    <!-- 麵包屑 -->
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <!-- 總表 -->
    <div class="mx-auto max-w-(--breakpoint-2xl)">
      <div class="grid grid-cols-1 gap-6 ">
        <div class="space-y-6">
          <ComponentCard title="" :isShowHeader="false">
            <div
              class="overflow-hidden rounded-2xl px-4 pb-3 pt-4 sm:px-6">
              <div class="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <!-- <div>
                  <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">股票總覽</h3>
                </div> -->

                <div class="flex items-center gap-3">
                  <button @click="openModal(true)"
                    class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                    新增股票
                  </button>
                </div>
              </div>

              <div class="max-w-full overflow-x-auto custom-scrollbar">
                <table class="min-w-full">
                  <thead>
                    <tr class="border-t border-gray-100 dark:border-gray-800">
                      <th class="py-3 text-center w-[260px]" >
                        <!-- <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">股票名稱</p> -->
                        <input type="text"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800" />
                      </th>
                      <th class="py-3 text-center">
                        <div class="flex item-center justify-center">
                          <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                          持有數量
                        </p>
                        <span class="flex flex-col gap-0.5" role="button" @click="sort()">
                          <svg class="fill-gray-300 dark:fill-gray-700" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z" fill=""></path>
                          </svg>

                          <svg class="fill-gray-300 dark:fill-gray-700" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z" fill=""></path>
                          </svg>
                        </span>
                        </div>
                      </th>
                      <th class="py-3 text-center">
                        <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">平均買入價格</p>
                      </th>
                      <th class="py-3 text-center">
                        <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">總投入成本</p>
                      </th>
                      <th class="py-3 text-center">
                        <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">最後買入日期</p>
                      </th>
                      <th class="py-3 text-center">
                        <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">功能</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(product, index) in products" :key="index"
                      class="border-t border-gray-100 dark:border-gray-800">
                      <td class="py-3 whitespace-nowrap">
                        <div class="flex items-center gap-3">
                          <div class="h-[30px] w-[30px] overflow-hidden rounded-4xl">
                            <img class=" w-full" :src="product.image" :alt="product.sotckName" />
                          </div>
                          <div>
                            <p class="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {{ product.sotckName }}
                            </p>
                          </div>
                          <p class="text-gray-500 text-theme-sm dark:text-gray-400">
                          {{ product.stockCode }}
                        </p>
                        </div>
                      </td>
                      <td class="text-center">
                        <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ product.quantity }}</p>
                      </td>
                      <td class="py-3 whitespace-nowrap text-center">
                        <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ product.averageCost }}</p>
                      </td>
                      <td class="py-3 whitespace-nowrap text-center">
                        <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ product.totalCost }}</p>
                      </td>
                      <td class="py-3 whitespace-nowrap text-center">
                        <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ product.lastBuyDate }}</p>
                      </td>
                      <td class="text-center">
                        <div class="flex items-center justify-center">
                          <EditIcon role="button" class="transition hover:brightness-125" @click="openModal(true)"/>
                          <TrashIcon role="button" class=" mx-3"/>
                          <SearchIcon role="button"/>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>

    <!-- 新增/編輯 -->
    <Modal v-if="isShowStockModal">
      <template #body>
        <div
          class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11"
        >
          <!-- close btn -->
          <button @click="openModal(false)"
            class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300"
          >
            <svg
              class="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
                fill=""
              />
            </svg>
          </button>
          <form class="flex flex-col">
            <div class="custom-scrollbar h-[458px] overflow-y-auto p-2">
              <div class="">
                <h5 class="mb-5 text-2xl font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  新增/編輯股票
                </h5>

                <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div class="col-span-2 lg:col-span-1">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      股票代號
                    </label>
                    <input
                      type="text"
                      value="2330"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>

                  <div class="col-span-2 lg:col-span-1">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      股票名稱
                    </label>
                    <input
                      type="text"
                      value="台積電"
                      class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>

                  <div class="col-span-2 lg:col-span-1">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      持有數量
                    </label>
                    <input
                      type="20"
                      value="emirhanboruch55@gmail.com"
                      class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>

                  <div class="col-span-2 lg:col-span-1">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      買進價格
                    </label>
                    <input
                      type="text"
                      value="990"
                      class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>

                  <div class="col-span-2">
                    <label
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      買進日期
                    </label>
                    <input
                      type="text"
                      value="Team Manager"
                      class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <button
                @click="openModal(false)"
                type="button"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
              >
                Close
              </button>
              <button
                @click="updateSave()"
                type="button"
                class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </template>
    </Modal>
  </AdminLayout>
</template>

<style lang="scss" scoped>
svg {
  transition: .3s;
  filter: brightness(1);
  &:hover {
    transition: .3s;
    filter: brightness(150%);
  }
}

</style>