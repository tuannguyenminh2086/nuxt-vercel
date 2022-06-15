<template>
  <aside
    id="sidebar"
    class="flex flex-col fixed z-40 left-0 top-0 text-white lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 transition-all duration-200 ease-in-out -translate-x-64"
  >
    <div class="logo flex justify-center 2xl:justify-start p-4">
      <h1 class="text-white font-bold text-sm lg:text-5xl">
        L<span
          class="hidden font-bold text-sm transition-all 2xl:inline-block 2xl:text-5xl"
          >otti</span
        >
      </h1>
    </div>

    <div class="mt-10">
      <p class="px-4 pb-1 text-xs uppercase text-gray-400 hidden 2xl:block">General</p>
      <ul class="">
        <base-nav-item
          v-for="(item, key) in navGroup.common"
          v-once
          :key="key"
          :prop-name="item.name"
          :prop-slug="item.slug"
          :prop-icon="item.icon"
        />
      </ul>
    </div>

     <div v-if="auth.isAdmin" class="mt-6" >
      <p class="px-4 pb-1 text-xs uppercase text-gray-400 hidden 2xl:block">Personal</p>
      <ul class="">
        <base-nav-item
          v-for="(item, key) in navGroup.personal"
          v-once
          :key="key"
          :prop-name="item.name"
          :prop-slug="item.slug"
          :prop-icon="item.icon"
        />
      </ul>
    </div>

    <div v-if="auth.isAdmin" class="mt-6" >
      <p class="px-4 pb-1 text-xs uppercase text-gray-400 hidden 2xl:block">Administrator</p>
      <ul class="">
        <base-nav-item
          v-for="(item, key) in navGroup.admin"
          v-once
          :key="key"
          :prop-name="item.name"
          :prop-slug="item.slug"
          :prop-icon="item.icon"
        />
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ICON } from '~~/assets/icons'
import { useAuthStore } from '~~/store/auth';

const auth = useAuthStore();



const navGroup = {
  common: [
    {
      name: 'Dashboard',
      slug: '/',
      icon: ICON.HOME,
    },
    {
      name: 'Projects',
      slug: '/projects',
      icon: ICON.PROJECTS,
    },
   
  ],
  personal: [
    {
      name: 'My Tasks',
      slug: '/tasks',
      icon: ICON.MYTASKS,
    },
  ],

  admin: [
    {
      name: 'Report',
      slug: '/reports',
      icon: ICON.REPORTS,
    },
  ],
}
</script>

