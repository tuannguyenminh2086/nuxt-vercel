<template>
  <div>
    <h1 class="text-4xl font-bold mb-10">Projects</h1>
    <div class="mt-6">
        <projects-filter-bar />
    </div>

    <div class=" mt-6">
      <base-projects-listing />
    </div>
    
  </div>
</template>

<script setup lang="ts">
  const { fetchAPI } = useProjects()

  useHead({
    title: 'Projects'
  })

  onMounted(() => {
    fetchAPI('')
  })
  
</script>
