<template>
  <div class='dashboard task-detail'>

    <div v-if='isLoading && !issue'>
      <base-loader />
    </div>

    <div v-else>
      <!-- content -->
      <base-section title='Detail' class='mb-0'>

        <template #default>
          <div class='lg:px-6'>

            <div class='my-6'>
              <p class='text-sm'>Project:
                <NuxtLink :to='`/projects/${issue.project.id}`'>{{ issue.project.name }}</NuxtLink>
              </p>
              <h3 class='text-xl font-bold mb-3 mt-3 relative lg:text-3xl lg:w-7/12'>
                {{ issue.name }}
                <span
                  v-if='issue.state === 0'
                  class='inline-flex items-center absolute ml-3
                          last:mr-0 capitalize py-0.5 px-2 text-xs rounded-lg mr-1.5 bg-red-600 text-white border-red-700'>
                          Closed
                    </span>
              </h3>
              <h6 class='mb-2 text-lg font-semibold text-rose-500'>#{{ issue.id }}</h6>
              <p><label class='text-sm pr-2'>Created at: </label> <span class='text-sm'>{{ issue.created_at }}</span>
              </p>
            </div>

            <div class='my-6 border-y border-slate-100 py-6'>
              <div class='grid grid-cols-12 gap-4'>

                <base-section-block title='Priority' class='md:col-span-2'>
                  <template #content>
                    <base-priority :text='issue.mapped_priority' />
                  </template>
                </base-section-block>

                <base-section-block title='Status' class='md:col-span-2'>
                  <template #content>
                    <base-priority :text='issue.mapped_status.name.toLowerCase()' />
                  </template>
                </base-section-block>

                <base-section-block title='Tracked' class='md:col-span-2'>
                  <template #content>
                    <base-hours :hours='issue.current_user_spent' variant='duration' class='font-bold text-xl' />
                  </template>
                </base-section-block>

                <base-section-block title='Assignee' class='md:col-span-3'>
                  <template #content>
                    <div>
                      <!-- <base-members :members="issue.assignees" :show-name="true" /> -->
                      <base-tasks-change-assignee :members='issue.assignees' :iid='issue.id' />
                    </div>
                  </template>
                </base-section-block>
              </div>
            </div>

            <div class='grid grid-cols-12 gap-6'>
              <div class='flex flex-col col-span-full py-6 desc border-slate-200 sm:col-span-6 lg:border-r lg:pr-10'>
                <base-section-block title='Description'>
                  <template #content>
                    <base-md :content='issue.description' />
                  </template>
                </base-section-block>

                

              </div>

              <div class='flex flex-col col-span-full  py-6 sm:col-span-6 lg:pl-4'>

                  <TabGroup>
                    <TabList class="flex">
                      <Tab v-slot="{ selected }" as="template">
                        <button
                         class="px-3 font-semibold rounded  uppercase outline-none"
                         :class="[selected ? 'text-xl text-slate-900' : 'text-slate-400']"
                        >Comments</button>
                      </Tab>
                      <Tab v-slot="{ selected }" as="template" >
                         <button
                          class="px-3 font-semibold rounded uppercase outline-none"
                          :class="[selected ? 'text-xl text-slate-900' : 'text-slate-400']"
                        >Time Tracking</button>

                      </Tab>
                    </TabList>
                    <TabPanels class="mt-2">
                     
                      <TabPanel>
                      
                         <base-section-block>
                            <template #content>
                              <base-comments-task-comments
                                :comments='issue.comments'
                                :related-id='issue.id'
                                type='issue'
                              />
                            </template>
                          </base-section-block>
                      </TabPanel>

                       <TabPanel>
                          <base-section-block>
                            <template #content>
                              <base-tasks-tracking :time-tracking='issue.time_tracking' />
                            </template>
                          </base-section-block>
                      </TabPanel>

                    </TabPanels>
                  </TabGroup>



               

              </div>

            </div>

          </div>
        </template>

        <template #actions>

          <div class='flex justify-between items-center'>
            <base-tasks-change-status :id='issue.id' :status='issue.mapped_status.name.toLowerCase()' />
            <base-tasks-complete-task :id='issue.id' :disabled='issue.state === 0' />
            <base-tasks-go-to-edit :id='issue.id' />
          </div>

        </template>
        
      </base-section>
      <!-- content -->
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { Ref } from 'vue'
import { ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const route = useRoute()
if (!route.params.id) navigateTo('/projects')

const isLoading: Ref<boolean> = ref(true)
const issue: Ref<any> = ref(null)

const { $makeRequest, $bus } = useNuxtApp()

const fetch = async () => {
  const result = await $makeRequest('get', `/api/tasks/${route.params.id}`);
  const issueDetail = result.issue;
  if (issueDetail) {
    isLoading.value = false
    issue.value = Object.assign(issueDetail);
    useHead({
      title: issue.value ? '#' + issue.value.id + ' - ' + issue.value.name : ''
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

<style lang="scss">
  .desc {
    pre {
      overflow: auto;
      background-color: #fafafa;
      border: 1px solid #ccc;
      padding: 5px;
    }
  }
</style>
