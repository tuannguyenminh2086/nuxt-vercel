<template>
  <div class="mt-8">
    <h1 class="text-4xl font-bold mb-10">My Tasks</h1>

    <TabGroup>
      <TabList class="flex mb-4">
        <Tab v-slot="{ selected }" as="template">
          <button
            class="pr-3 font-semibold rounded  uppercase outline-none"
            :class="[selected ? 'text-xl text-slate-900' : 'text-slate-400']"
          >Board view</button>
        </Tab>
        <Tab v-slot="{ selected }" as="template" >
            <button
            class="px-3 font-semibold rounded uppercase outline-none"
            :class="[selected ? 'text-xl text-slate-900' : 'text-slate-400']"
          >List view</button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel>
          <kanban-board />
        </TabPanel>

        <TabPanel>
          <!-- <div class="mt-10">
            <base-section title="Statistic">
              <template #default>
                <div class="p-4">is coming soon </div>
              </template>
            </base-section>
          </div> -->

          <div class="grid gap-4 mt-10">
            <div class="col-auto mb-10">
              <base-tasks-user :issue-type="2" title="Doing" />
            </div>

            <div class="col-auto mb-10">
              <base-tasks-user :issue-type="6" title="To do" />
            </div>

            <div class="col-auto mb-10">
              <base-tasks-user :issue-type="4"  title="Review"  />
            </div>

            <div class="col-auto">
              <base-tasks-user :issue-type="5"  title="Done"  />
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

useHead({
    title: 'Tasks'
  })
</script>