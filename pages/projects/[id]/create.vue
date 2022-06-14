<template>
  <div>
    <h2 class="text-4xl font-bold my-10">
      <span v-if="project"><span class="block">Project:  {{ project.name }}</span></span>New Issue</h2>

    <base-section>
      <template #default>
        <base-tasks-create />
      </template>
    </base-section>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useProjectStore } from '~~/store/project'
  const projectStore = useProjectStore()
  const { project } = storeToRefs(projectStore)

</script>