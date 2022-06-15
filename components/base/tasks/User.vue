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
              <draggable
                :disabled="isProgress"
                :list="listing"
                tag="tbody"
                item-key="id"
                name="list"
                group="task"
                :data-issuetype="props.issueType"
                :animation="500"
                :move="onMove"
              >
                <template v-if="listing.length == 0" #header>
                  <tr>
                    <td colspan="6">
                      <base-iddle title="Nothing here" />
                    </td>
                  </tr>
                </template>
                <template #item="{element, index}">
                  <tr
                    class="dark:border-0  lg:hover:bg-gray-100 dark:lg:hover:bg-slate-500"
                    :class="[index % 2 === 0 ? '' : 'bg-slate-100 dark:bg-slate-700', isProgress ? '' : 'cursor-move']"
                  >
                    <td class="py-3 px-4 w-20">{{ element.id }}</td>
                    <td class="py-3 px-4 w-3/12 pr-6"><NuxtLink :to="`/tasks/${element.id}`"><span class="font-semibold">{{ element.name }}</span></NuxtLink></td>
                    <td class="py-3 px-4"><NuxtLink :to="`/projects/${element.project.id}`" class="text-blue-700 font-bold">{{ element.project.name }}</NuxtLink></td>
                    <td class="py-3 w-2/12 px-4">
                      <base-hours :hours="element.current_user_spent" variant="duration" class="text-teal-500" />
                    </td>
                    <td class="py-3 w-2/12 px-4"><base-priority v-if="element.mapped_priority" :text="element.mapped_priority.toLowerCase()" /></td>
                    <td class="py-3 px-4 ">
                      <base-hours :date="element.created_at" variant="datetime" class="font-semibold text-blue-500" />
                    </td>
                    <td class="py-3 px-4 ">
                      <div class="flex items-center justify-center">
                        <base-timer-issue-timer-actions
                          :task-id="element.id"
                          :task-name="element.name"
                          :task-project-ame="element.project.name"
                        />
                      </div>
                    </td>
                  </tr>
                </template>
              </draggable>
            </template>
          </base-table>

        </div>
      </div>
    </template>
  </base-section>
</template>

<script setup lang="ts">
  import draggable from "vuedraggable";
  import type { Ref } from 'vue'
  import { ref } from 'vue'
  import { useNuxtApp } from '#app'
  import { useFetch } from '@vueuse/core'
  import { useAuthStore } from '@/store/auth';

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

  const auth = useAuthStore()
  const isProgress: Ref<boolean> = ref(false)

  const fetchIssues = async () => {
    const {$makeRequest} = useNuxtApp()
     const { status,listTodo } = await $makeRequest(
       'post',
       '/api/tasks/todo',
       {
         status: props.issueType
      })
      if ( status ) {
        isLoading.value = false
        listing.value =  useOrderBy(listTodo, 'id','desc');
      }
  }

  onMounted(() => {
    const nuxtApp = useNuxtApp();

    fetchIssues()
    nuxtApp.$bus.$on("refetch-issues", () => {
      fetchIssues()
    })
  })

  const handleChangeStatus = async (taskID: string, taskStatus: number) => {
    const _token = auth.getAuthToken();
    const nuxtApp = useNuxtApp();

    if (_token) {
      isProgress.value = true

      const _headers = {
        Authorization: `Bearer ${_token}`,
        Accept: 'application/json'
      };

      const runtimeConfig = useRuntimeConfig()
      const url = runtimeConfig.public.API_URL + '/issues/' + taskID + '/status'

      const resp = await useFetch( url, {
        headers: _headers
      } ).put({
        status: taskStatus
      }).json()

      if (resp) {
        const { statusCode, data } = resp
        if (statusCode.value === 200) {
          if (process.client) {
              nuxtApp.$bus.$emit('refetch-issue')
              nuxtApp.$notification({
                type: 'success',
                title: 'Success',
                text: data.value.message ?  data.value.message.message : ''
              })
          }
        }

        isProgress.value = false
      }
    }
  }

  const onMove = (evt: any) => {
    const currentStatusIndex = evt.from.attributes['data-issuetype'].value;
    const futureStatusIndex:number = evt.to.attributes['data-issuetype'].value;
    const taskID:string = evt.draggedContext.element.id;

    if(currentStatusIndex !== futureStatusIndex) {
      handleChangeStatus(taskID, futureStatusIndex);
    }
  }
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