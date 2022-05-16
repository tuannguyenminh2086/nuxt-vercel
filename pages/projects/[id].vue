<template>
  <div class="project-detail">
      <h1 class="text-2xl font-bold">Projects</h1>
      <div class="mb-5">
        <NuxtLink to="/projects">Go Back</NuxtLink>
      </div>

      <div v-if="isLoading && !project">
        <base-loader />
      </div>
      <div v-else>
        <base-section>
          <template #default>
              <div class="grid grid-cols-3 py-6 px-4">
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
          <base-tasks-listing :listing="project?.issues" />
          <!-- <component :is="isComponent" /> -->
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

  // interface IName {
  //   name: string
  // }

  // interface IIssue {
  //   assignees: {
  //     name: string
  //     image_path: string | null
  //   }[]
  //   author_id: number
  //   created_at: string
  //   id: string
  //   name: string
  //   state: number
  // }

  // interface IProject {
  //   name: string;
  //   client?: string | null;
  //   created_at?: string | null;
  //   leader?:  IName;
  //   mapped_priority: string;
  //   mapped_status?:  IName;
  //   projectType?:  IName;
  //   issues?: IIssue[]
  // }

  // const project: Ref<IProject | null> = ref(null)
  const isLoading: Ref<boolean> = ref(true)
  // const isComponent: Ref<string> = ref('base-tasks-listing')

  if ( !route.params.id ) navigateTo('/projects')

  const { data: { project }, loading } = await cmsClient.query({
    query: GET_PROJECT_DETAIL,
    variables: {
      id: route.params.id
    }
  });

  if ( project ) {
     isLoading.value = loading
  }


</script>
