<template>
  <div>
    <div
      class="h-96 overflow-hidden overflow-y-auto border-y border-slate-100 py-4 mt-6 pr-4"
    >
      <ul v-if="timeTracking.length > 0" role="list" class="divide-y divide-slate-100 ">

        <li
          v-for="(item, key) in timeTracking"
          :key="key"
          class="flex flex-col p-4 transition-all hover:bg-slate-100 odd:bg-white even:bg-slate-50" 
        >
          <div class="font-bold" ><span v-if="item.createdByUser">{{ item.createdByUser.name}}</span></div>
          <div class="text-sm">
            <label class="mr-2 text-sm">Last updated:</label>
            <span class="mr-2 text-sm italic">{{ item.updated_at }}</span>
          </div>
          
          <div class="grid grid-cols-3 mt-6">
            <div>
              <label class="mr-2 text-sm block">Tracked:</label>
              <base-hours :hours="item.spent" variant="duration" class="text-sky-700" />
            </div>
            <div>
              <label class="mr-2 text-sm block">Start:</label>
              <span class="font-bold text-sky-700">{{ item.start_time}}</span>
            </div>
            <div>
              <label class="mr-2 text-sm block">End:</label>
              <span class="font-bold text-sky-700">{{ item.end_time}}</span>
            </div>
          </div>
        </li>

      </ul>

      <div v-else>
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
    created_by: number,
    updated_at: string
    createdByUser: {
        name: string
        email:string
      }
  }

  interface IProps {
    timeTracking: ITracking[]
  }

  defineProps<IProps>()

</script>