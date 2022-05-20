<template>
  <div class="project-detail">

      <div class="mb-5">
        <NuxtLink to="/projects">Go Back</NuxtLink>
      </div>

      <div v-if="isLoading && !project">
        <base-loader />
      </div>
      <div v-else>

        <base-section>
          <template #default>
              <div class="grid grid-cols-3 py-10 px-6">
                <div class="col-span-2">
                  <h2 class="text-5xl font-bold mb-5">{{ project?.name }}</h2>
                  <h6 class="mb-2"><b>Client:</b> {{ project?.client ? project.client : 'n/a'}}</h6>
                  <div><b>Leader:</b> {{ project?.leader ? project.leader.name : 'n/a'}} </div>
                </div>

                <div class="">
                  <div class="mb-4"><div class="font-bold">Priority:</div> <base-priority v-if="project" :text="project.mapped_priority.toString()" /></div>
                  <div class="mb-4"><b>Created at:</b> {{ project?.created_at }}</div>
                </div>
              </div>
          </template>
        </base-section>
        
        <div class="mt-10">
          <base-tasks-listing :listing="project?.issues" :pid="route.params.id" :pname="project?.name" />
        </div>
       
      </div>
  </div>
  
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { GET_PROJECT_DETAIL } from '~~/graphql/queries/projectQuery';
  const route = useRoute()
  const isLoading: Ref<boolean> = ref(true)


  const { $graphqlClient } = useNuxtApp()
  if ( !route.params.id ) navigateTo('/projects');
  const { data: { project }, loading } = await $graphqlClient.query({
    query: GET_PROJECT_DETAIL,
    variables: {
      id: route.params.id
    }
  });

  if ( project ) {
     isLoading.value = loading
  }

  useHead({
    title: 'Project Detail'
  })

</script>
