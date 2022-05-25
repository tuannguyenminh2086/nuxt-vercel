<template>
  <div>
    <div
      class="h-96 overflow-hidden overflow-y-auto border-y border-slate-100 py-4 mt-6 pr-4"
    >
      <ul v-if="timeTracking.length > 0" role="list" class="divide-y divide-slate-100">

        <li
          v-for="(item, key) in timeTracking"
          :key="key"
          class="flex flex-col p-4 transition-all hover:bg-slate-100"
        >

          <div class="font-bold" >User name</div>
          <div class="text-sm">
            <label class="mr-2 text-sm">Last updated:</label>
            <span class="mr-2 text-sm italic">{{ item.updated_at }}</span>
          </div>
          
          <div class="grid grid-cols-3 mt-6">
            <div>
              <label class="mr-2 text-sm">Tracked:</label>
              <base-hours :hours="item.spent" variant="duration" class="text-sky-700" />
            </div>
            <div>
              <label class="mr-2 text-sm">Start:</label>
              <span class="font-bold text-sky-700">{{ item.start_time}}</span>
            </div>
            <div>
              <label class="mr-2 text-sm">End:</label>
              <span class="font-bold text-sky-700">{{ item.end_time}}</span>
            </div>
          </div>
        </li>

      </ul>

      <div v-if="timeTracking">
        <base-iddle title="No data"/>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
  interface ITracking {
    
    spent: number
    start_time: string
    end_time: string
    created_by: 4,
    updated_at: string
  }

  interface IProps {
    timeTracking: ITracking[]
  }

  defineProps<IProps>()

</script>