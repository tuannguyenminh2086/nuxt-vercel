<template>
  <div class="project-detail">

      <div class="mb-5">
        <NuxtLink to="/projects">Go Back</NuxtLink>
      </div>

      <div v-if="isLoading">
        <base-loader />
      </div>

      <div v-else>
        <div class="hidden">loading</div>

        <div class="py-10">

          <div class="mb-4">
            <h2 v-if="project.name" class="text-5xl font-bold mb-4 text-slate-800">{{ project.name }}</h2>
            <div class="">Description</div>
          </div>

          <div class="grid grid-cols-6 gap-6 mt-10">
    
            <div v-if="project.client" class="mb-4">
                <span class="block text-sm">Client</span>
                <span class="block font-bold text-2xl">{{ project.client }}</span>
            </div>

            <div class="mb-4">
              <span class="block text-sm">Project Leader</span> 
              <span class="block font-bold text-2xl">{{ project?.leader ? project.leader.name : 'n/a'}}</span>
            </div>

            <div class="mb-4">
              <span class="block text-sm">Created date</span>
              <span class="block font-bold text-2xl">{{ project?.created_at }}</span>
            </div>

          </div>

          <div class="mt-4">
            <div class="">
              <span class="block text-sm mb-2">Priority</span> 
              <base-priority v-if="project" :text="project.mapped_priority.toString()" />
            </div>
          </div>
        </div>

        <div class="mt-4">
          <div class="grid grid-cols-4 gap-4">
            <div>
              <base-stats 
                :number="project.total_issue" 
                title="Total Issues" 
                class="col-1"
              />
            </div>
            <div>
              <base-stats 
                :number="project.total_active_issue" 
                title="Total Active Issues" 
                class="col-1"
              />
            </div>
            <div>
              <base-stats 
                :number="110" 
                title="Tracked" 
                class="col-1"
              />
            </div>
            <div>
              <base-stats 
                :number="9" 
                title="Members" 
                class="col-1"
              />
            </div>

          </div>
          
        </div>
        
        <div class="mt-20">
          <base-tasks-listing
            :listing="project?.issues" 
            :pid="route.params.id" 
            :pname="project?.name" 
          />
        </div>
       
      </div>
  </div>
  
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { GET_PROJECT_DETAIL } from '~~/graphql/queries/projectQuery';
  import cmsClient from '~~/apollo/cmsClient';

  const route = useRoute()
  const isLoading: Ref<boolean> = ref(true)


  // const { $graphqlClient } = useNuxtApp()
  if ( !route.params.id ) navigateTo('/projects');
  
  const { data: { project }, loading } = await cmsClient.query({
    query: GET_PROJECT_DETAIL,
    variables: {
      id: route.params.id
    }
  });

  if ( project ) {
     isLoading.value = loading
     
     useHead({
      title: project ? project.name : ''
    })
  }

  
</script>
<style lang="scss">
  .loadingState {
    display: none;
  }
</style>