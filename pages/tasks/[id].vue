<template>
  <div class="dashboard task-detail">

     <div v-if="isLoading && !issue">
        <base-loader />
      </div>

      <div v-else>
        <base-section title="Detail">
          <template #default>
              <div class="grid grid-cols-1 gap-1 auto-cols-max lg:grid-cols-8 lg:gap-8">

                <div class="lg:col-span-5 lg:pr-5">

                  <div class="mb-10 mt-4">
                    <p class="text-sm"><NuxtLink :to="`/projects/${issue.project.id}`">{{ issue.project.name }}</NuxtLink> </p>
                    <h1 class="text-3xl font-bold mb-3 mt-3 lg:text-4xl">{{ issue.name }}</h1>
                    <h6 class="mb-2 text-lg font-semibold text-rose-500">ID: {{ issue.id }}</h6>
                  </div>


                  <div class="my-6 border-t border-slate-100 flex py-6 box-border w-full">

                    <div class="grid grid-cols-6 gap-4 box-border w-full" >

                      <div>
                        <p class="text-xs font-semibold text-slate-400 uppercase mb-2">Assignee</p>
                        <base-members :members="issue.assignees" :show-name="true" />
                      </div>

                       <div class="">
                        <p class="text-xs font-semibold text-slate-400 uppercase mb-2">Priority</p>
                        <base-priority :text="issue.mapped_priority" />
                      </div>

                      <div class="">
                        <p class="text-xs font-semibold text-slate-400 uppercase mb-2">Status</p>
                        <base-priority :text="issue.mapped_status.name.toLowerCase()" />
                      </div>

                      <div class="">
                        <p class="text-xs font-semibold text-slate-400 uppercase mb-2">Tracked</p>
                        <div class="font-bold text-2xl"><base-hours :hours="issue.current_user_spent" variant="duration" class="font-bold text-2xl" /> </div>
                      </div>

                    </div>

                  </div>

                  <div class="py-6 border-t border-slate-100 mt-5">
                    <h4 class="font-semibold text-slate-400 uppercase mb-4">Description</h4>
                    <base-md :content="issue.description" />
                  </div>

                </div>



                <div class="lg:col-span-3">
                  <base-comments-task-comments
                      :comments="issue.comments"
                      :relatedId="issue.id"
                      type="issue"
                  />
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
      }
  }



  onMounted(() => {
    fetch()

     $bus.$on('refetch-issue', () => {
       fetch()
     })
  })

</script>
