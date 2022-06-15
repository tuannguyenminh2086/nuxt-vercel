<template>
  <div>
    <base-section title="Tasks Activity" class="">
      <template #default>

        <div class="">
          <div v-if="loading">
            <base-loader />
          </div>

          <div v-else>

              <base-table>
                <template #thead>
                    <th class="py-3 px-4 font-bold text-sm text-left w-20">Assignee</th>
                    <th class="py-3 px-4 font-bold text-sm text-left w-2/6 pr-6">Name</th>
                    <th class="py-3 px-4 font-bold text-sm text-left w-3/12">Project</th>
                    <th class="py-3 px-4 font-bold text-sm text-left w-2/12">Priority</th>
                    <th class="py-3 px-4 font-bold text-sm text-left w-2/12"></th>   
                </template>
                <template #tbody>
                    <tbody v-if="listing && listing.length > 0">

                      <tr  
                        v-for="(item, index) in listing"
                        :key="index" 
                        class="dark:border-0  lg:hover:bg-gray-100 dark:lg:hover:bg-slate-500"
                        :class="[index % 2 === 0 ? '' : 'bg-slate-100 dark:bg-slate-700']"
                      >

                        <td class="py-3 px-4 w-20"><base-members :members="item.issue.assignees" :show-name="true" /></td>
                        <td class="py-3 px-4 w-2/6 pr-6">
                          <NuxtLink :to="`/tasks/${item.issue_id}`">
                            <span class="font-semibold text-cyan-700">{{ item.issue.name }}</span>
                            </NuxtLink>
                        </td>
                        <td class="py-3 px-4 w-3/12"><span class="font-bold text-sm">{{ item.issue.project.name }}</span></td>
                        <td class="py-3 px-4 w-2/12"><base-priority v-if="item.issue.mapped_priority" :text="item.issue.mapped_priority.toLowerCase()" /> </td>
                        <td class="py-3 px-4 w-2/12"><base-hours variant="from-now" :date="item.created_at" class="font-normal text-sm" /></td>
                      </tr>
                    </tbody>

                    <tbody v-else>
                      <tr>
                        <td colspan="6">
                            <base-iddle title="No activities" />
                        </td>
                      </tr>
                    </tbody>
                </template>
              </base-table>

          
          </div>
        </div>
      </template>
    </base-section>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'

  const listing:Ref<any[]> = ref([])
  const loading:Ref<boolean> = ref(false)
  const { fetchTasksActivity } = useTask()
  const { $bus } = useNuxtApp()


  const fetch = async () => {
    loading.value = true
    const data = await fetchTasksActivity()

    if (data) {
      listing.value = data.value.data
      loading.value = false
    }
  }

  onMounted(() => {
    if (listing.value.length < 1) {
      fetch();
    }
    

    $bus.$on('refetch-activity', () => {
      fetch()
    })
    
  })


</script>
