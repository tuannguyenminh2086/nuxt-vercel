<template>
  <div>
    <h1 class="text-4xl font-bold mb-10">Projects</h1>
    <div class="grid grid-cols-4 mt-6">
      <div class="col-span-1">
        <base-search-projects />
      </div>
    </div>

    <div class="grid gap-4 mt-10">
      <div class="col-auto">
        <projects-listing />
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
  import { useProjects } from '../../composables/projects'
  
  const { init } = useProjects()

  onMounted(() => {
    init()
  })
  
</script>
