<template>
  <aside
    :class="[
      'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-99999 border-r border-gray-200',
      {
        'lg:w-[290px]': isExpanded || isMobileOpen || isHovered,
        'lg:w-[90px]': !isExpanded && !isHovered,
        'translate-x-0 w-[290px]': isMobileOpen,
        '-translate-x-full': !isMobileOpen,
        'lg:translate-x-0': true,
      },
    ]"
    @mouseenter="!isExpanded && (isHovered = true)"
    @mouseleave="isHovered = false"
  >
    <div
      :class="[
        'py-8 flex',
        !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start',
      ]"
    >
      <router-link to="/Home">
        <img
          v-if="isExpanded || isHovered || isMobileOpen"
          class="dark:hidden"
          src="/images/logo/logo.svg"
          alt="Logo"
          width="150"
          height="40"
        />
        <img
          v-if="isExpanded || isHovered || isMobileOpen"
          class="hidden dark:block"
          src="/images/logo/logo-dark.svg"
          alt="Logo"
          width="150"
          height="40"
        />
        <img
          v-else
          src="/images/logo/logo-icon.svg"
          alt="Logo"
          width="32"
          height="32"
        />
      </router-link>
    </div>
    <div
      class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar"
    >
      <nav class="mb-6">
        <div class="flex flex-col gap-4">
          <div v-for="(menuGroup, groupIndex) in menuGroups" :key="groupIndex">
            <h2
              :class="[
                'mb-4 text-xs uppercase flex leading-[20px] text-gray-400',
                !isExpanded && !isHovered
                  ? 'lg:justify-center'
                  : 'justify-start',
              ]"
            >
              <template v-if="isExpanded || isHovered || isMobileOpen">
                {{ menuGroup.title }}
              </template>
              <HorizontalDots v-else />
            </h2>
            <ul class="flex flex-col gap-4">
              <li v-for="(item, index) in menuGroup.items" :key="item.name">
                <button
                  v-if="item.subItems"
                  @click="toggleSubmenu(groupIndex, index)"
                  :class="[
                    'menu-item group w-full',
                    {
                      'menu-item-active': isSubmenuOpen(groupIndex, index),
                      'menu-item-inactive': !isSubmenuOpen(groupIndex, index),
                    },
                    !isExpanded && !isHovered
                      ? 'lg:justify-center'
                      : 'lg:justify-start',
                  ]"
                >
                  <span
                    :class="[
                      isSubmenuOpen(groupIndex, index)
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" />
                  </span>
                  <span
                    v-if="isExpanded || isHovered || isMobileOpen"
                    class="menu-item-text"
                    >{{ item.name }}</span
                  >
                  <ChevronDownIcon
                    v-if="isExpanded || isHovered || isMobileOpen"
                    :class="[
                      'ml-auto w-5 h-5 transition-transform duration-200',
                      {
                        'rotate-180 text-brand-500': isSubmenuOpen(
                          groupIndex,
                          index
                        ),
                      },
                    ]"
                  />
                </button>
                <router-link
                  v-else-if="item.path"
                  :to="item.path"
                  :class="[
                    'menu-item group',
                    {
                      'menu-item-active': isActive(item.path),
                      'menu-item-inactive': !isActive(item.path),
                    },
                  ]"
                >
                  <span
                    :class="[
                      isActive(item.path)
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive',
                    ]"
                  >
                    <component :is="item.icon" />
                  </span>
                  <span
                    v-if="isExpanded || isHovered || isMobileOpen"
                    class="menu-item-text"
                    >{{ item.name }}</span
                  >
                </router-link>
                <transition
                  @enter="startTransition"
                  @after-enter="endTransition"
                  @before-leave="startTransition"
                  @after-leave="endTransition"
                >
                  <div
                    v-show="
                      isSubmenuOpen(groupIndex, index) &&
                      (isExpanded || isHovered || isMobileOpen)
                    "
                  >
                    <ul class="mt-2 space-y-1 ml-9">
                      <li v-for="subItem in item.subItems" :key="subItem.name">
                        <router-link
                          :to="subItem.path"
                          :class="[
                            'menu-dropdown-item',
                            {
                              'menu-dropdown-item-active': isActive(
                                subItem.path
                              ),
                              'menu-dropdown-item-inactive': !isActive(
                                subItem.path
                              ),
                            },
                          ]"
                        >
                          {{ subItem.name }}
                          <span class="flex items-center gap-1 ml-auto">
                            <span
                              v-if="subItem.new"
                              :class="[
                                'menu-dropdown-badge',
                                {
                                  'menu-dropdown-badge-active': isActive(
                                    subItem.path
                                  ),
                                  'menu-dropdown-badge-inactive': !isActive(
                                    subItem.path
                                  ),
                                },
                              ]"
                            >
                              new
                            </span>
                            <span
                              v-if="subItem.pro"
                              :class="[
                                'menu-dropdown-badge',
                                {
                                  'menu-dropdown-badge-active': isActive(
                                    subItem.path
                                  ),
                                  'menu-dropdown-badge-inactive': !isActive(
                                    subItem.path
                                  ),
                                },
                              ]"
                            >
                              pro
                            </span>
                          </span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </transition>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- <SidebarWidget v-if="isExpanded || isHovered || isMobileOpen" /> -->
    </div>
  </aside>
</template>

<script lang="ts" setup>
const route = useRoute();
const { isExpanded, isMobileOpen, isHovered, openSubmenu } = useSidebar();
const menuGroups = [
  {
    title: "Menu",
    items: [
      {
        icon: GridIcon,
        name: "政府相關",
        subItems: [
          { name: "地震公告", path: "/Government/EarthquakeNotice", pro: false },
          { name: "颱風觀測＿停班停課公告", path: "/Government/TyphoonNotice", pro: false },
          { name: "停水公告", path: "/Government/WaterNotice", pro: false, new: false },
          { name: "停電公告", path: "/Government/PowerNotice", pro: false, new: false },
          { name: "氣象公告", path: "/Government/Weather", pro: false },
          //{ name: "颱風觀測平台", path: "/Government/TyphoonPlatform", pro: false },
          { name: "防空疏散地圖", path: "/Government/AirRaidEvacuationMap", pro: false },
          //{ name: "災情通報整合", path: "/Stock/CalculateStockInterest", pro: false },
          //{ name: "防災地圖平台", path: "/Stock/CalculateStockInterest", pro: false },
        ],
      },
      // {
      //   icon: GridIcon,
      //   name: "軍事相關",
      //   subItems: [
      //     { name: "軍演追蹤平台", path: "/Stock/CalculateStockInterest", pro: false },
      //     { name: "全球軍事新聞資訊整合", path: "/Stock/CalculateStockInterest", pro: false },
      //     { name: "軍事衝突地圖視覺化", path: "/Stock/CalculateStockInterest", pro: false }
      //   ],
      // },
      {
        icon: GridIcon,
        name: "個人數據管理平台",
        subItems: [
          { name: "作品集管理(上架＋預覽)", path: "/Person/PortfolioManagement", pro: false },
          { name: "作品集統計圖", path: "/Person/StatisticalChart", pro: false }
          // { name: "股息計算", path: "/Stock/CalculateStockInterest", pro: false },
        ],
      },
      {
        icon: GridIcon,
        name: "財經相關",
        subItems: [
        { name: "股票列表", path: "/Person/CalculateStockInterest", pro: false },
        ]
      },
      {
        icon: CalenderIcon,
        name: "AI相關",
        subItems: [
          { name: "聊天室", path: "/AI/Chat", pro: false },
          // { name: "AI相關設定", path: "/AI/CalculateStockInterest", pro: false },
        ],
      },
      // {
      //   icon: GridIcon,
      //   name: "Dashboard",
      //   subItems: [{ name: "Ecommerce", path: "/", pro: false }],
      // },
      {
        icon: CalenderIcon,
        name: "Calendar",
        path: "/calendar",
      },
      {
        icon: CalenderIcon,
        name: "OtherLogin",
        path: "/OtherLogin",
      },
      // {
      //   icon: UserCircleIcon,
      //   name: "User Profile",
      //   path: "/profile",
      // },

      // {
      //   name: "Forms",
      //   icon: ListIcon,
      //   subItems: [
      //     { name: "Form Elements", path: "/form-elements", pro: false },
      //   ],
      // },
      // {
      //   name: "Tables",
      //   icon: TableIcon,
      //   subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
      // },
      // {
      //   name: "Pages",
      //   icon: PageIcon,
      //   subItems: [
      //     { name: "Black Page", path: "/blank", pro: false },
      //     { name: "404 Page", path: "/error-404", pro: false },
      //   ],
      // },
    ],
  },
  // {
  //   title: "Others",
  //   items: [
  //     {
  //       icon: PieChartIcon,
  //       name: "Charts",
  //       subItems: [
  //         { name: "Line Chart", path: "/line-chart", pro: false },
  //         { name: "Bar Chart", path: "/bar-chart", pro: false },
  //       ],
  //     },
  //     {
  //       icon: BoxCubeIcon,
  //       name: "Ui Elements",
  //       subItems: [
  //         { name: "Alerts", path: "/alerts", pro: false },
  //         { name: "Avatars", path: "/avatars", pro: false },
  //         { name: "Badge", path: "/badge", pro: false },
  //         { name: "Buttons", path: "/buttons", pro: false },
  //         { name: "Images", path: "/images", pro: false },
  //         { name: "Videos", path: "/videos", pro: false },
  //       ],
  //     },
  //     {
  //       icon: PlugInIcon,
  //       name: "Authentication",
  //       subItems: [
  //         { name: "Signin", path: "/signin", pro: false },
  //         { name: "Signup", path: "/signup", pro: false },
  //       ],
  //     },
  //   ],
  // },
];

const isActive = (path: string) => route.path === path;

const toggleSubmenu = (groupIndex: number, itemIndex: number) => {
  const key = `${groupIndex}-${itemIndex}`;
  openSubmenu.value = openSubmenu.value === key ? null : key;
};

const isAnySubmenuRouteActive = computed(() => {
  return menuGroups.some((group) =>
    group.items.some(
      (item) =>
        item.subItems && item.subItems.some((subItem) => isActive(subItem.path))
    )
  );
});

const isSubmenuOpen = (groupIndex: number, itemIndex: number) => {
  const key = `${groupIndex}-${itemIndex}`;
  return (
    openSubmenu.value === key ||
    (isAnySubmenuRouteActive.value &&
      menuGroups[groupIndex].items[itemIndex].subItems?.some((subItem) =>
        isActive(subItem.path)
      ))
  );
};

const startTransition = (el: Element, _done?: () => void) => {
  const htmlEl = el as HTMLElement;
  htmlEl.style.height = "auto";
  const height = htmlEl.scrollHeight;
  htmlEl.style.height = "0px";
  htmlEl.offsetHeight;
  htmlEl.style.height = height + "px";
};

const endTransition = (el: Element, _done?: () => void) => {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = "";
};
</script>
