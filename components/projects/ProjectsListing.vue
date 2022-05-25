<template>
  <base-section title="List">
    <template #default>

        <div v-if="loading">
          <base-loader />
        </div>
        <div v-else>
          <table class="table-auto border-collapse w-full">
              <thead>
               <tr class="border-slate-100 bg-slate-50 text-slate-400 text-sm uppercase dark:bg-slate-900 dark:border-0">
                  <th class="py-3 px-4 font-bold text-sm text-left">#</th>
                  <th class="py-3 px-4 font-bold text-sm text-left">Name</th>
                  <th class="py-3 px-4 font-bold text-sm text-left">Leader</th>
                  <th class="py-3 px-4 font-bold text-sm text-left">Priority</th>
                  <th class="py-3 px-4 font-bold text-sm text-left">Status</th>
                  <th class="py-3 px-4 font-bold text-sm text-left">Tracked</th>
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
                  <td class="py-3 px-4"><NuxtLink :to="`/projects/${project.id}`" class="text-blue-500 font-bold text-lg hover:text-blue-600">{{ project.name }}</NuxtLink></td>
                  <td class="py-3 px-4">{{ project.leader? project.leader.name : 'n/a' }}</td>
                  <td class="py-3 px-4 "><base-priority v-if="project.mapped_priority" :text="project.mapped_priority.toLowerCase()" /></td>
                  <td class="py-3 px-4 ">n/a</td>
                  <td class="py-3 px-4 "><base-hours :hours="project.total_spent" variant="duration" /></td>
                </tr>
              </tbody>
            </table>
        </div>

    </template>
  </base-section>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useProjectStore } from '@/store/projects'

  const projectsStore = useProjectStore();
  const { filteredList, loading } = storeToRefs(projectsStore)
  
</script>

