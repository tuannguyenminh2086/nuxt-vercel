<template>
  <div>
    <h1 class="text-4xl font-bold mb-10">Projects</h1>
    <div class="mt-6">
      <projects-filter-bar />
    </div>

    <div class=" mt-6">
      <projects-listing />
    </div>
    
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useProjectsStore } from '~~/store/projects'
  const { fetchAPI } = useProjects()
  
  useHead({
    title: 'Projects'
  })

  const projectsStore = useProjectsStore()
  const { listing } = storeToRefs(projectsStore)

  if (listing.value.length < 1) {
    fetchAPI('')
  } 

</script>
