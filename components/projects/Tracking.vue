<template>
  <div>
    <base-section title="Working Projects">
       <template #default>

          <div class="">
            <div v-if="isLoading">
                <base-loader />
            </div>

            <div v-else>
            
              <table class="table-auto border-collapse w-full">
                <thead class="">
                  <tr class="border-slate-100 bg-slate-50 text-slate-400 text-sm uppercase dark:bg-slate-900 dark:border-0">
                    <th class="py-3 px-4 font-bold text-sm text-left">Project Name</th>
                    <th class="py-3 px-4 font-bold text-sm text-left">Project Leader</th>
                    <th class="py-3 px-4 font-bold text-sm text-left">Priority</th>
                    <th class="py-3 px-4 font-bold text-sm text-left">Tracked</th>
                  </tr>
                </thead>

                <tbody v-if="tracking">
                  <tr
                    v-for="(project, index) in tracking"
                    :key="index" 
                    class="dark:border-0   lg:hover:bg-gray-100 dark:lg:hover:bg-slate-500"
                    :class="[index % 2 === 0 ? '' : 'bg-slate-100 dark:bg-slate-700']"
                  >

                    <td class="py-3 px-4"><NuxtLink :to="`/projects/${project.id}`">{{ project.name }}</NuxtLink></td>
                    <td class="py-3 px-4">{{ project.leader? project.leader.name : 'N/A' }}</td>
                    <td class="py-3 px-4 "> <base-priority v-if="project.mapped_priority" :text="project.mapped_priority.toLowerCase()" /> </td>
                    <td class="py-3 px-4 "><base-hours :hours="project.total_spent" variant="duration"  class="font-semibold text-blue-500" /></td>
                  </tr>
                
                </tbody>
              </table>
              
            </div>

          </div>
       </template>
       <template #actions>
          <nuxt-link
            href="/projects" 
            class="inline-flex cursor-pointer justify-center items-center whitespace-nowrap px-4 focus:outline-none transition-colors duration-150 border rounded p-1 bg-blue-500 text-white border-blue-500 hover:bg-blue-700 mr-3 last:mr-0">
            View All
          </nuxt-link>

       </template>
    </base-section>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { storeToRefs } from 'pinia';
  import { useProjectsStore } from '@/store/projects'


  const isLoading: Ref<boolean> = ref(false)
  const { fetchTrackingProjects } = useProjects()
  const projectsStore = useProjectsStore()
  const { tracking } = storeToRefs(projectsStore)

  const fetch = async () => {
    isLoading.value = true
    await fetchTrackingProjects()
    isLoading.value = false
  }

  onMounted(() => {
    if (tracking.value.length < 1) {
      fetch()
    }
    
  })

</script>
