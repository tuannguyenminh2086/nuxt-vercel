<template>
  <base-section title="Listing">
    <template #default>
      <div v-if="loading">
        <base-loader />
      </div>
      <div v-else>
        <table class="table-auto border-collapse w-full">
            <thead>
              <tr class="font-bold border-b dark:bg-slate-900 dark:border-0">
                <th class="py-3 px-4 font-bold text-left">ID</th>
                <th class="py-3 px-4 font-bold text-left">Project Name</th>
                <th class="py-3 px-4 font-bold text-left">Priority</th>
                <th class="py-3 px-4 font-bold text-left">Total Spent</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(project, index) in filteredList"
                :key="index" 
                class="dark:border-0  lg:hover:bg-gray-100 dark:lg:hover:bg-slate-500"
                :class="[index % 2 === 0 ? '' : 'bg-slate-100 dark:bg-slate-700']"
              >

                <td class="py-3 px-4">{{ project.id }}</td>
                <td class="py-3 px-4"><NuxtLink :to="`/projects/${project.id}`">{{ project.name }}</NuxtLink></td>
                <td class="py-3 px-4 "> <base-priority v-if="project.mapped_priority" :text="project.mapped_priority.toLowerCase()" /> </td>
                <td class="py-3 px-4 "><span class="font-bold">{{ project.total_spent  }}</span></td>
              </tr>
            </tbody>
          </table>
      </div>
      
    </template>
  </base-section>
</template>

<script setup lang="ts">
  // import { ref } from 'vue'
  // import type { Ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useProjectStore } from '../../store/projects.ts'

  const projectsStore = useProjectStore();
  const { filteredList, loading } = storeToRefs(projectsStore)

  onMounted(() => {
    projectsStore.fetchAllProjects()
  })
  
</script>
