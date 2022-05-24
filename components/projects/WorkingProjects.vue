<template>
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

                <tbody v-if="projects">
                  <tr
                    v-for="(project, index) in projects"
                    :key="index" 
                    class="dark:border-0   lg:hover:bg-gray-100 dark:lg:hover:bg-slate-500"
                    :class="[index % 2 === 0 ? '' : 'bg-slate-100 dark:bg-slate-700']"
                  >

                    <td class="py-3 px-4"><NuxtLink :to="`/projects/${project.id}`">{{ project.name }}</NuxtLink></td>
                    <td class="py-3 px-4">{{ project.leader? project.leader.name : 'N/A' }}</td>
                    <td class="py-3 px-4 "> <base-priority v-if="project.mapped_priority" :text="project.mapped_priority.toLowerCase()" /> </td>
                    <td class="py-3 px-4 "><base-hours :hours="project.total_spent" variant="duration" /></td>
                  </tr>
                
                </tbody>
              </table>
            </div>

          </div>
       </template>
    </base-section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { GET_CURRENT_PROJECT } from '~~/graphql/queries/projectQuery';
  import cmsClient from '~~/apollo/cmsClient';

  interface IProject {
    name: string,
    id: string,
    total_spent: number,
    mapped_priority: string,
    leader?: {
      name: string
    }
  }

  const projects: Ref<IProject[] | null> = ref(null)
  const isLoading: Ref<boolean> = ref(true)

  const { data, loading } = await cmsClient.query({
    query: GET_CURRENT_PROJECT
  });

  if ( data && data.tracking_projects ) {
     projects.value = data.tracking_projects
     isLoading.value = loading
  }

</script>
