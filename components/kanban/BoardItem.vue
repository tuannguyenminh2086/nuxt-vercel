<template>
  <draggable
    :list="listing"
    item-key="id"
    name="list"
    group="task"
    :data-issuetype="props.issueType"
    :animation="500"
    :move="onMove"
    class="h-[calc(100%-50px)]"
  >
    <template v-if="listing.length == 0 && !isLoading" #header>
      <base-iddle title="Nothing here" />
    </template>

    <template #item="{element}">
      <div
        class="mb-5 last:mb-0 bg-white p-5 rounded-lg shadow border-l-4 border-solid cursor-move"
        :class="props.boardColorMap[props.issueType]"
      >
        <div class="mb-3">
          <NuxtLink
            :to="`/projects/${element.project.id}`"
            class="font-bold text-sm inline-block rounded text-capitalize text-center mr-4"
          >
            {{ element.project.name }}
          </NuxtLink>

          <base-priority
            v-if="element.mapped_priority"
            :text="element.mapped_priority.toLowerCase()"
          />
        </div>

        <div>
          <NuxtLink :to="`/tasks/${element.id}`" class="text-lg">{{ element.name }}</NuxtLink>
        </div>

        <div class="flex justify-between items-center mt-2">
          <div class="text-sm">#{{ element.id }}</div>

          <div class="flex items-center">
            <base-hours :hours="element.current_user_spent" variant="duration" />
            <base-timer-issue-timer-actions
              :task-id="element.id"
              :task-name="element.name"
              :task-project-ame="element.project.name"
            />
          </div>
        </div>
      </div>
    </template>

    <template v-if="isLoading" #footer>
      <base-loader />
    </template>
  </draggable>
</template>

<script setup lang="ts">
  import draggable from "vuedraggable";
  import type { Ref } from 'vue'
  import { ref } from 'vue'
  import { useNuxtApp } from '#app'
  const { changeTaskStatus } = useTask()

  interface Props {
    issueType: number,
    boardColorMap: {
      [key: number]: string
    }
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
    const {$makeRequest} = useNuxtApp()
     const { status,listTodo } = await $makeRequest(
       'post',
       '/api/tasks/todo',
       {
         status: props.issueType
      })
      if ( status ) {
        isLoading.value = false
        listing.value = useOrderBy(listTodo, 'id','desc');
      }
  }

  onMounted(() => {
    const nuxtApp = useNuxtApp();

    fetchIssues()
    nuxtApp.$bus.$on("refetch-issues", () => {
      fetchIssues()
    })
  })

  const onMove = (evt: any) => {
    const currentStatusIndex = evt.from.attributes['data-issuetype'].value;
    const futureStatusIndex:number = evt.to.attributes['data-issuetype'].value;
    const taskID:string = evt.draggedContext.element.id;

    if(currentStatusIndex !== futureStatusIndex) {
      changeTaskStatus(taskID, futureStatusIndex);
    }
  }
</script>