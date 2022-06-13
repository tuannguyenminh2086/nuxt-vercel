<template>
  <base-section>
    <template #default>
    
      <base-table>
        <template #thead>
          <th class="py-3 px-4 font-bold text-sm text-left w-20">#</th>
          <th class="py-3 px-4 font-bold text-sm text-left w-2/6 pr-6">Name</th>
          <th class="py-3 px-4 font-bold text-sm text-left w-2/12">Assignees</th>
          <th class="py-3 px-4 font-bold text-sm text-left w-1/12 ">Spent</th>
          <th class="py-3 px-4 font-bold text-sm text-left w-1/12">Priority</th>
          <th class="py-3 px-4 font-bold text-sm text-left">Status</th>
          <th class="py-3 px-4 font-bold text-sm text-left w-2/12">Created At</th>
        </template>
        <template #tbody>
          <tbody v-if="listing.length > 0">

            <tr  
              v-for="(issue, index) in listing"
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
              <td class="py-3 px-4 w-1/12"><base-priority v-if="issue" :text="issue.mapped_priority!.toString()" /></td>
              <td class="py-3 px-4"> <base-priority v-if="issue" :text='issue.mapped_status!.name.toLowerCase()' /></td>
              <td class="py-3 px-4 w-2/12">
                <base-hours :date="issue.created_at" variant="datetime" class="font-semibold text-blue-500" />
              </td>
            </tr>
          </tbody>
        </template>

         <template #tfoot>
              <tfoot class="border-gray-100 p-3 lg:px-6 border-t dark:border-gray-800">
                <tr>
                  <td colspan="6">
                       <div class="flex w-full box-border pt-4 items-center">

                          <div class="flex">
                          
                            <!-- <button
                              v-for="(link, index) in links"
                              :key="index"
                              class="inline-flex cursor-pointer justify-center items-center whitespace-nowrap outline-none transition-colors 
                                duration-150 border rounded p-1 bg-white text-black border-gray-300 mr-3 
                                hover:bg-blue-700 hover:text-white hover:border-blue-700 
                                disabled:border-gray-200 disabled:text-gray-400 disabled:hover:bg-white disabled:cursor-default
                                last:mr-0 mb-3"
                              :class="link.active ? 'border-blue-600 bg-blue-600 text-white': '' "
                              type="button"
                              :disabled="!link.url ? true: false"
                            >
                              <span class="px-2" :class="link.active ? 'text-white hover:text-white': '' " v-html="link.label"></span>
                            </button> -->

                          </div>

                          <div class="ml-auto">
                            <div>
                              <span class="text-slate-400 text-sm uppercase mr-2 font-bold">Total Records:</span>
                              <span class="font-bold text-blue-700 text-xl">{{total}}</span>
                            </div>
                          </div>
                        </div>
                  </td>
                </tr>
              </tfoot>
             
            </template>
            
      </base-table>
      


    </template>
  </base-section>
</template>

<script setup lang="ts">
  import { IIssues } from '@/models/interfaces'

  interface IProps {
    listing: IIssues[],
    pname: string,
    pid: string | string [],
    total: number,
    current: number
    last: number
  }

  defineProps<IProps>()



</script>
