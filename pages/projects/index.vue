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
  import { useProjectStore } from '~~/store/projects';
  import { GET_ALL_PROJECTS_FULL } from '~~/graphql/queries/projectQuery'

  const projectStore = useProjectStore()
  const { $graphqlClient} = useNuxtApp()


  const fetch = async () => {
    projectStore.loading = true

    try {
      const { projects } = (await $graphqlClient.query({
        query: GET_ALL_PROJECTS_FULL
      })).data;

      if (projects) {
        projectStore.initProjects(projects)
      }

    } catch (_error) {
      projectStore.error = _error
    } finally {
      projectStore.loading = false
    }
  }
  
  onMounted(() => {
    fetch()
  })
</script>
