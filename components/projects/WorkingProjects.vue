<template>
    <base-section title="Working Projects">
       <template #default>

          <div class="py-4 px-4">
            <div v-if="isLoading">
                <base-loader />
            </div>
            <div v-else>
              <table class="table-auto border-collapse w-full">
                <thead>
                  <tr class="font-bold border-b dark:bg-slate-900 dark:border-0">
                    <th class="py-3 px-4 font-bold text-left">Project Name</th>
                    <th class="py-3 px-4 font-bold text-left">Priority</th>
                    <th class="py-3 px-4 font-bold text-left">Total Spent</th>
                  </tr>
                </thead>

                <tbody v-if="projects">
                  <tr
                    v-for="(project, index) in projects"
                    :key="index" 
                    class="dark:border-0  lg:hover:bg-gray-100 dark:lg:hover:bg-slate-500"
                    :class="[index % 2 === 0 ? '' : 'bg-slate-100 dark:bg-slate-700']"
                  >

                    <td class="py-3 px-4"><NuxtLink :to="`/projects/${project.id}`">{{ project.name }}</NuxtLink></td>
                    <td class="py-3 px-4 "> <base-priority v-if="project.mapped_priority" :text="project.mapped_priority.toLowerCase()" /> </td>
                    <td class="py-3 px-4 "><span class="font-bold">{{ project.total_spent  }}</span></td>
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
    total_spent: number,
    mapped_priority: string
  }

  const projects: Ref<IProject[] | null> = ref(null)
  const isLoading: Ref<boolean> = ref(true)

  const { data, loading } = await cmsClient.query({
        query: GET_CURRENT_PROJECT
  });

  if ( data && data.tracking_projects) {
     projects.value = data.tracking_projects
     isLoading.value = loading
  }

</script>
