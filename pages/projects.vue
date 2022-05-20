<template>
  <NuxtLayout name="dashboard">
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