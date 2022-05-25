<template>
  <div>
    <base-section title="Activities" class="">
      <template #default>
        <div class="">
          <div v-if="loading">
            <base-loader />
          </div>

          <div v-else>
              <table class="table-auto border-collapse w-full">
                <thead>
                  <tr class="font-bold border-slate-100 bg-slate-50 text-slate-400 text-sm uppercase dark:bg-slate-900 dark:border-0">
                    <th class="py-3 px-4 font-bold text-sm text-left w-20">Assignee</th>
                    <th class="py-3 px-4 font-bold text-sm text-left w-2/6 pr-6">Name</th>
                    <th class="py-3 px-4 font-bold text-sm text-left w-3/12">Project</th>
                    <th class="py-3 px-4 font-bold text-sm text-left w-2/12">Priority</th>
                    <th class="py-3 px-4 font-bold text-sm text-left w-2/12">Created at</th>               
                  </tr>
                </thead>

                <tbody v-if="listing && listing.length > 0">

                  <tr  
                    v-for="(item, index) in listing"
                    :key="index" 
                    class="dark:border-0  lg:hover:bg-gray-100 dark:lg:hover:bg-slate-500"
                    :class="[index % 2 === 0 ? '' : 'bg-slate-100 dark:bg-slate-700']"
                  >

                    <td class="py-3 px-4 w-20"><base-members :members="item.issue.assignees" :show-name="true" /></td>
                    <td class="py-3 px-4 w-2/6 pr-6"><NuxtLink :to="`/tasks/${item.issue_id}`"><span class="font-semibold text-cyan-700">{{ item.issue.name }}</span></NuxtLink></td>
                    <td class="py-3 px-4 w-3/12"><span class="font-bold text-sm">{{ item.issue.project.name }}</span></td>
                    <td class="py-3 px-4 w-2/12"></td>
                    <td class="py-3 px-4 w-2/12"><base-hours variant="datetime" :date="item.created_at" class="font-normal text-sm" /></td>
                  </tr>
                </tbody>

                <tbody v-else>
                  <tr>
                    <td colspan="6">
                        <base-iddle title="No activities" />
                    </td>
                  </tr>
                </tbody>
              </table>

          
          </div>
        </div>
      </template>
    </base-section>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { useFetch } from '@vueuse/core';
  import { useAuthStore } from '@store/auth';

  const listing:Ref<any[]> = ref([])
  const loading:Ref<boolean> = ref(false)
  const { $echoClient, $notification } = useNuxtApp();
  const auth = useAuthStore()
  const _token = auth.getAuthToken();
  const runtimeConfig = useRuntimeConfig()

  const fetch = async () => {
    loading.value = true

    if (!_token) {
      navigateTo('/login')
    }

    const url = runtimeConfig.public.API_URL + '/issues/working'
    const { isFetching, data } = await useFetch( url, {
      headers: {
        'Authorization': `Bearer ${_token}`,
        'Accept': 'application/json'
      }
    }).json()

    if (data.value) {
      listing.value = data.value.data
      loading.value = isFetching.value
    }
  }


  onMounted(() => {

    fetch();


    $echoClient.private("TaskInProcess").listen(".task-in-process", (_e:any) => {

        const { data: { action, message } } = _e;

        if ( action) {
          switch (action) {
            case "reload":
              $notification({
                  type: 'warning',
                  title: 'Activity Tracking',
                  text: message
              })

              fetch();
            break;
          }
        }
    
    })
    

  })


</script>
