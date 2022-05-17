<template>
  <div class="dashboard task-detail">
     <div v-if="isLoading && !issue">
        <base-loader />
      </div>
      <div v-else>
        <base-section>
          <template #default>
            <div class="px-4 py-6">

              <div class="grid grid-cols-4 auto-cols-max gap-4">

                <div class="col-span-2 lg:mr-5">
                  <h6 class="mb-2 text-sm">ID: {{ issue.id }}</h6>
                  <h1 class="text-3xl font-bold mb-3">{{ issue.name }}</h1>
                  <p class="text-sm">Project: <NuxtLink :to="`/projects/${issue.project.id}`">{{ issue.project.name }}</NuxtLink> </p>

                  <div class="my-6 border-t border-gray-200 flex py-6">

                    <div class="grid grid-cols-3 gap-3" >
                      <div>
                        <p class="font-bold mb-2 mr-4">Assignee</p>
                        <base-members :members="issue.assignees" :show-name="true" />
                      </div>

                       <div class="mr-6">
                        <p class="font-bold mb-2">Priority</p>
                        <base-priority :text="issue.mapped_priority" />
                      </div>

                      <div class="mr-6">
                        <p class="font-bold mb-2">Status</p>
                        <base-priority :text="issue.mapped_status.name.toLowerCase()" />
                      </div>

                    </div>

                    
                  </div>

                  <div class="py-6 border-t border-gray-200">
                    <h4 class="font-semibold mb-4">Description</h4>
                    <base-md :content="issue.description" />
                  </div>
                </div>

                <div class="col-span-2">
                  <base-comments-task-comments
                      :comments="issue.comments"
                      :relatedId="issue.id"
                      type="issue"
                  />
                </div>
               

              </div>

             
            </div>
          </template>
        </base-section>
      </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { GET_TASK_BY_ID } from '~~/graphql/queries/tasksQuery';
  // import cmsClient from '~~/apollo/cmsClient';

  const route = useRoute()
  if ( !route.params.id ) navigateTo('/projects')

   const isLoading: Ref<boolean> = ref(true)
  const { $graphqlClient } = useNuxtApp()
  const { data: { issue } , loading } = await $graphqlClient.query({
    query: GET_TASK_BY_ID,
    variables: {
      id: route.params.id
    }
  });

  if ( issue ) {
     isLoading.value = loading
  }

</script>
