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
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-1" >
              <svg 
                aria-hidden="true"
                role="img" 
                class="stroke-slate-500" 
                width="20" 
                height="20" 
                preserveAspectRatio="xMidYMid meet" 
                viewBox="0 0 48 48"
              >
                <g fill="none" fill-rule="evenodd" stroke-linejoin="round" stroke-width="4" transform="translate(7 3)">
                  <circle cx="17" cy="24" r="17"></circle>
                  <path stroke-linecap="round" d="M11 1h12m-6 15v8m8 0h-8m0-23v4"></path>
                </g>
              </svg>
            </div>
            <div class="font-bold col-span-2" >
              <span v-if="item.createdByUser">{{ item.createdByUser.name}}</span>
            </div>
            <div class="col-span-4">
                <span class="mr-2 text-sm italic">{{ item.updated_at }}</span>
            </div>
            <div class="col-span-4">
              Tracked:&nbsp;&nbsp; <base-hours :hours="item.spent" variant="duration" class="text-sky-700" />
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