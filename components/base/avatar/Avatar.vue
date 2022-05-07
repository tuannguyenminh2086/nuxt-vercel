<template>
    <Menu as="div" class="relative">
        <MenuButton class="flex items-center justify-center grow-0 shrink-0 px-4 h-full">
          <div class="rounded-full border bg-slate-500 cursor-pointer w-8 h-8 overflow-hidden">
            <img src="@/assets/imgs/dummy-avatar.jpg" alt="" />
          </div>
      </MenuButton>
      <MenuItems class="absolute right-0 w-56 origin-top-right divide-y p-4 divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <MenuItem>
          <a href="#">Sign Out</a>
        </MenuItem>
      </MenuItems>
    </Menu>
</template>

<script setup lang="ts">
  import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
</script>
