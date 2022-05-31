<template>
  <base-section :title="props.title">
    <template #default>
      <div v-if="isLoading" class="p-4">
        <base-loader />
      </div>
      <div v-else class="">
          <div v-if="listing">

          <base-table>
            <template #thead>
                  <th class="py-3 px-4 font-bold text-left w-20">#</th>
                  <th class="py-3 px-4 font-bold text-left w-3/12 pr-6">Name</th>
                  <th class="py-3 px-4 font-bold text-left ">Project</th>
                  <th class="py-3 px-4 font-bold text-left w-2/12">Spent</th>
                  <th class="py-3 px-4 font-bold text-left w-2/12">Priority</th>
                  <th class="py-3 px-4 font-bold text-left ">Created at</th>
                  <th class="py-3 px-4 font-bold"></th>
            </template>
            <template #tbody>
                <TransitionGroup v-if="listing.length > 0"  name="list" tag="tbody">

                  <tr  
                    v-for="(issue, index) in listing"
                    :key="index" 
                    class="dark:border-0  lg:hover:bg-gray-100 dark:lg:hover:bg-slate-500"
                    :class="[index % 2 === 0 ? '' : 'bg-slate-100 dark:bg-slate-700']"
                  >

                    <td class="py-3 px-4 w-20">{{ issue.id }}</td>
                    <td class="py-3 px-4 w-3/12 pr-6"><NuxtLink :to="`/tasks/${issue.id}`"><span class="font-semibold">{{ issue.name }}</span></NuxtLink></td>
                    <td class="py-3 px-4"><NuxtLink :to="`/projects/${issue.project.id}`" class="text-blue-700 font-bold">{{ issue.project.name }}</NuxtLink></td>
                    <td class="py-3 w-2/12 px-4">
                      <base-hours :hours="issue.current_user_spent" variant="duration" class="text-teal-500" />
                    </td>
                    <td class="py-3 w-2/12 px-4"><base-priority v-if="issue.mapped_priority" :text="issue.mapped_priority.toLowerCase()" /></td>
                    <td class="py-3 px-4 ">
                      <base-hours :date="issue.created_at" variant="datetime" class="font-semibold text-blue-500" />
                    </td>
                    <td class="py-3 px-4 ">
                      <div class="flex items-center justify-center">
                        <base-timer-issue-timer-actions
                          :task-id="issue.id"
                          :task-name="issue.name"
                          :task-project-ame="issue.project.name" 
                        />
                      </div>
                    </td>
                  </tr>

                </TransitionGroup>

                <tbody v-else>
                  <tr>
                    <td colspan="6">
                      <base-iddle title="Nothing here" />
                    </td>
                  </tr>
                  
                </tbody>
            </template>
          </base-table>

          </div>
      </div>
    </template>
  </base-section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import cmsClient from '~~/apollo/cmsClient';
  import { GET_ISSUES_BY_STATUS } from '~~/graphql/queries/tasksQuery';

  interface Props {
    title?: string
    issueType: number
  }

  interface ITimeTracking {
    end_time?: string
    spent: number
    start_time: string
  }

  interface IIssue {
    created_at: string
    current_user_spent: number
    id: string
    mapped_priority: string
    mapped_status: { 
      key: string
      name: string
    }
    name: string
    project: {
      id: string
      name: string
    }
    state: number
    status: number
    time_tracking?: ITimeTracking[]
  }

  const props = defineProps<Props>()

  const isLoading: Ref<boolean> = ref(true)
  const listing: Ref<IIssue[]> = ref([])


  const fetchIssues = async () => {
     const { data, loading } = await cmsClient.query({
        query: GET_ISSUES_BY_STATUS,
        variables: {
          status: props.issueType
        }
      })

      

      if ( data.list_todo ) {
        isLoading.value = loading
        listing.value =  useOrderBy(data.list_todo, 'id','desc');
      }
  }

  onMounted(() => {
    const nuxtApp = useNuxtApp();

    fetchIssues()
    nuxtApp.$bus.$on("refetch-issues", () => {
      fetchIssues()
    })
    
  })

</script>

<style lang="scss">
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>