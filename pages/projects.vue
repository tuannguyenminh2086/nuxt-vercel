<template>
  <NuxtLayout name="dashboard">
    <h1 class="text-4xl font-bold mb-5">Projects</h1>
    <NuxtLink to="/">Back to Home </NuxtLink>
    <nuxt-page />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useProjectStore } from '~~/store/projects';
definePageMeta({
  middleware: ['auth']
})

const projectStore = useProjectStore()
projectStore.fetchAllProjects()

</script>