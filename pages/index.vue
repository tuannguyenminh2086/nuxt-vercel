<script setup lang="ts">
import { useToggle } from '@vueuse/shared'
import { isDark } from '../composables/dark'

const toggleDark = useToggle(isDark)
</script>

<template>
  <NuxtLayout name="dashboard">
    <div className="grid grid-cols-12 gap-6">
    
      <div class="test">        
        <button
          class="group relative w-auto mx-auto mt-6 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          @click="toggleDark()"
        >
          <i inline-block align-middle i="dark:carbon-moon carbon-sun" />

          <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
        </button>

        <NuxtLink to="/projects">
          <span class="text-black">Projects</span>
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
.test {
  min-height: 1000px;
}
</style>
