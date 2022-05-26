<template>
  <base-section title="Issues">
    <template #default>
      <div class="">
        <div class="flex mb-10 mt-4">
            <!-- Search task  -->
            <div class="w-4/12">
                <input
                  v-model="keyword"
                  type="text"
                  class="form-input px-6 py-3 rounded-full min-w-full bg-slate-200" 
                  placeholder="Type issue name"
                />
            </div>
        </div>

         <div class="grid">
          <!-- Listing -->
          <table class="table-auto border-collapse w-full">
              <thead>
                 <tr class="font-bold border-slate-100 bg-slate-50 text-slate-400 text-sm uppercase dark:bg-slate-900 dark:border-0">
                  <th class="py-3 px-4 font-bold text-sm text-left w-20">#</th>
                  <th class="py-3 px-4 font-bold text-sm text-left w-2/6 pr-6">Name</th>
                  <th class="py-3 px-4 font-bold text-sm text-left w-2/12">Assignees</th>
                  <th class="py-3 px-4 font-bold text-sm text-left w-1/12 ">Spent</th>
                  <th class="py-3 px-4 font-bold text-sm text-left w-1/12">Priority</th>
                  <th class="py-3 px-4 font-bold text-sm text-left">Status</th>
                  <th class="py-3 px-4 font-bold text-sm text-left">State</th>
                  <th class="py-3 px-4 font-bold text-sm text-left w-2/12">Created at</th>
                </tr>
              </thead>

              <tbody v-if="filteredListing.length > 0">

                <tr  
                  v-for="(issue, index) in filteredListing"
                  :key="index" 
                  class="dark:border-0  lg:hover:bg-gray-100 dark:lg:hover:bg-slate-500"
                  :class="[ index % 2 === 0 ? '' : 'bg-slate-100 dark:bg-slate-700', issue.state === 0 ? 'line-through' : '']"
                >

                  <td class="py-3 px-4 w-20">{{ issue.id }}</td>
                  <td class="py-3 px-4 w-2/6 pr-6"><NuxtLink :to="`/tasks/${issue.id}`"><span class="font-semibold">{{ issue.name }}</span></NuxtLink></td>
                  <td class="py-3 px-4 w-2/12"><base-members :members="issue.assignees" :show-name="true" /></td>
                  <td class="py-3 px-4 w-1/12">
                    <base-hours-tracking :time-tracking="issue.time_tracking" />
                  </td>
                  <td class="py-3 px-4 w-1/12">n/a</td>
                  <td class="py-3 px-4">n/a</td>
                  <td class="py-3 px-4">
                    <base-priority-state :code="issue.state" />
                  </td>
                  <td class="py-3 px-4 w-2/12">
                    <base-hours :date="issue.created_at" variant="datetime" class="font-semibold text-blue-500" />
                  </td>
                  
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

    <template #actions>

       <NuxtLink
          :to='createUrl'
          class="inline-flex cursor-pointer justify-center items-center whitespace-nowrap px-6 py-3 rounded-md ring-green-500 p-2 bg-green-500 text-white border-green-500
              focus:outline-none transition-colors 
              focus:ring duration-150 border 
              hover:bg-emerald-700">
              <span class="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </span>
              <span class="text-lg font-semibold">New Issue</span>
       </NuxtLink>

    </template>
  </base-section>
</template>

<script setup lang="ts">
  import { ref, computed} from 'vue'
  import type { Ref } from 'vue'
  import { IIssues } from '@/models/interfaces'

  interface IProps {
    listing: IIssues[],
    pname: string,
    pid: string | string []
  }

  const props = defineProps<IProps>()

  const keyword: Ref<string> = ref('')
  // const issuesState = ref(props.listing)
  const createUrl = computed(() => {
    return `/projects/${props.pid}/create`
  })


  const filteredListing = computed(() => {
    if (keyword.value === '') {
      return props.listing
    } else {
      return props.listing.filter(p => p.name.toLowerCase().includes(keyword.value.toLowerCase()))
    }
  })


</script>
