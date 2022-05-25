<template>
  <div class="dashboard task-detail">

     <div v-if="isLoading && !issue">
        <base-loader />
      </div>

      <div v-else>
        <!-- content -->

        <base-section title="Detail" class="mb-0">

          <template #default>
              <div class="lg:px-6">


                  <div class="my-6">
                    <p class="text-sm"><NuxtLink :to="`/projects/${issue.project.id}`">{{ issue.project.name }}</NuxtLink> </p>
                    <h1 class="text-3xl font-bold mb-3 mt-3 lg:text-4xl">{{ issue.name }}</h1>
                    <h6 class="mb-2 text-lg font-semibold text-rose-500">#{{ issue.id }}</h6>
                    <p><label class="text-sm pr-2">Created at: </label> <span class="text-sm">{{issue.created_at}}</span></p>
                  </div>

                  <div class="my-6 border-y border-slate-100 py-6">
                    <div class="grid grid-cols-12 gap-4">
                      <base-section-block title="Priority">
                        <template #content>
                          <base-priority :text="issue.mapped_priority" />
                        </template>
                      </base-section-block>

                      <base-section-block title="Status">
                        <template #content>
                           <base-priority :text="issue.mapped_status.name.toLowerCase()" />
                        </template>
                      </base-section-block>

                      <base-section-block title="Tracked">
                        <template #content>
                           <base-hours :hours="issue.current_user_spent" variant="duration" class="font-bold text-2xl" />
                        </template>
                      </base-section-block>

                      <base-section-block title="Assignee">
                        <template #content>
                           <base-members :members="issue.assignees" :show-name="true" />
                        </template>
                      </base-section-block>
                    </div>
                  </div>

                  <div class="grid grid-cols-12 gap-6">
                    <div class="flex flex-col col-span-full py-6 sm:col-span-6 ">
                      <base-section-block title="Description">
                        <template #content>
                          <base-md :content="issue.description" />
                        </template>
                      </base-section-block>

                      <base-section-block title="Time tracking" class="mt-10">
                        <template #content>
                          <base-tasks-tracking :time-tracking="issue.time_tracking" />
                        </template>
                      </base-section-block>
                     
                    </div>

                    <div class="flex flex-col col-span-full  py-6 sm:col-span-6 ">
                    
                       <base-section-block title="Comment">
                          <template #content>
                            <base-comments-task-comments
                                :comments="issue.comments"
                                :related-id="issue.id"
                                type="issue"
                            />
                          </template>
                      </base-section-block>

                    </div>

                  </div>

            </div>
          </template>

          <template #actions>

            <div class="flex justify-between items-center">

                <base-tasks-change-status :id="issue.id" :status="issue.mapped_status.name.toLowerCase()" />
                <base-tasks-complete-task :id="issue.id" />
            </div>

          </template>
        </base-section>


         <!-- content -->
      </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { GET_TASK_BY_ID } from '~~/graphql/queries/tasksQuery';

  const route = useRoute()
  if ( !route.params.id ) navigateTo('/projects')

  const isLoading: Ref<boolean> = ref(true)
  const issue: Ref<any> = ref(null)

  const { $graphqlClient, $bus } = useNuxtApp()

  const fetch = async() => {
     const { data , loading } = await $graphqlClient.query({
        query: GET_TASK_BY_ID,
        variables: {
          id: route.params.id
        }
      });

      if ( data.issue ) {
        isLoading.value = loading
        issue.value = {...data.issue}

        useHead({
          title: issue.value ?  '#' + issue.value.id + ' - '  + issue.value.name : ''
        })
      }
  }



  onMounted(() => {
    fetch()

     $bus.$on('refetch-issue', () => {
       fetch()
     })

    

  })

</script>
