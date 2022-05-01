<template>
  <NuxtLayout name="dashboard">
    <h1>Index page</h1>
    Hello world! {{ $hello() }}

    {{ store.counter }}

    {{ store.getCount }}
    <br />
    <button
      type="button"
      class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:(text-white bg-purple-600 border-transparent) focus:(outline-none ring-2 ring-purple-600 ring-offset-2) dark:text-white"
      @click="store.hit()"
    >
      click
    </button>
    <button @click="resetCounter">asdadad</button>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useStore } from '@/store/auth'
// alternatively, you can also use it here
const { $hello } = useNuxtApp()

// const config = useRuntimeConfig()
const store = useStore()

const resetCounter = () => {
  store.$reset()
}
</script>
