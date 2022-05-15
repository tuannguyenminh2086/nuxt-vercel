<template>
  <base-section title="Issues">
    <template #default>
      <div class="p-4">
        <div class="grid grid-cols-4 mb-10 mt-4 gap-4">
            <!-- Search task  -->
            <div>
              <input
                v-model="keyword"
                type="text"
                class="form-input px-6 py-3 rounded-full min-w-full bg-slate-200" 
                placeholder="Type issue name"
              />
            </div>
            <div>
              Date time
            </div>

        </div>
         <div class="grid">
          <!-- Listing -->
          <table class="table-auto border-collapse w-full">
              <thead>
                <tr class="font-bold border-b dark:bg-slate-900 dark:border-0">
                  <th class="py-3 px-4 font-bold text-left w-20">ID</th>
                  <th class="py-3 px-4 font-bold text-left w-2/6 pr-6">Name</th>
                  <th class="py-3 px-4 font-bold text-left w-2/12">Assignees</th>
                  <th class="py-3 px-4 font-bold text-left w-1/12 ">Spent</th>
                  <th class="py-3 px-4 font-bold text-left w-1/12">Priority</th>
                  <th class="py-3 px-4 font-bold text-left">Status</th>
                  <th class="py-3 px-4 font-bold text-left w-2/12">Created at</th>
                  
                  
                </tr>
              </thead>

              <tbody v-if="filteredListing.length > 0">

                <tr  
                  v-for="(issue, index) in filteredListing"
                  :key="index" 
                  class="dark:border-0  lg:hover:bg-gray-100 dark:lg:hover:bg-slate-500"
                  :class="[index % 2 === 0 ? '' : 'bg-slate-100 dark:bg-slate-700']"
                >

                  <td class="py-3 px-4 w-20">{{ issue.id }}</td>
                  <td class="py-3 px-4 w-2/6 pr-6"><span class="font-semibold">{{ issue.name }}</span></td>
                  <td class="py-3 px-4 w-2/12"><base-members :members="issue.assignees" :show-name="true" /></td>
                  <td class="py-3 px-4 w-1/12">0</td>
                  <td class="py-3 px-4 w-1/12">n/a</td>
                  <td class="py-3 px-4">n/a</td>
                  <td class="py-3 px-4 w-2/12">{{ issue.created_at }}</td>
                  
                </tr>
              </tbody>

              <tbody v-else>
                <tr>
                  <td colspan="6">
                      <base-iddle title="Nothing here" />
                  </td>
                </tr>
                
              </tbody>
          </table>

        </div>

      </div>
    </template>
  </base-section>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { Ref } from 'vue'

  interface IIssue {
    assignees: {
      name: string
      image_path: string | null
    }[]
    author_id: number
    created_at: string
    id: string
    name: string
    state: number
  }

  interface IProps {
    listing: IIssue[]
  }

  const props = defineProps<IProps>()
  const issuesState = useState('project-issues', () => props.listing)
  const keyword: Ref<''> = ref('')

  const filteredListing = computed(() => {
    if (keyword.value === '') {
      return issuesState.value
    } else {
      return issuesState.value.filter(p => p.name.toLowerCase().includes(keyword.value.toLowerCase()))
    }
  })

</script>
