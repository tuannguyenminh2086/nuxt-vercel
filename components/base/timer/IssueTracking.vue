<template>
  <div
    class="bg-emerald-50 rounded p-4 shadow-xl transition-all w-96 lg:w-1/4 dark:bg-slate-800"
    :class="isRunning ? 'block fixed bottom-0 right-0 ': 'hidden translate-y-full'"
  >
    <div class="flex items-center">
      <div class="mr-10 flex-1 flex-grow">
        <h3 class="font-bold mb-2">{{ task.name ? task.name : 'n/a' }}</h3>
        <h6 class="text-xs">Project</h6>
        <!-- <div class="font-bold text-4xl mt-6">{{counter}}</div> -->
      </div>

      <div class="ml-auto">
        <button 
          class="button border p-2 rounded-lg fill-red-600 bg-red-100"
          @click.stop.prevent="stopTimerHandle"
        >
            <svg aria-hidden="true" role="img" class="iconify iconify--fluent" width="44" height="44" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20"><path d="M10 18a8 8 0 1 0 0-16a8 8 0 0 0 0 16ZM8 7h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"></path></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useTimerStore } from '@/store/timer'

  const timerStore = useTimerStore()
  timerStore.getCurrentTracking();


  const { isRunning, task } = storeToRefs(timerStore)
  
  const stopTimerHandle = () => {
    timerStore.stopTimer(task.value.issue_id);
    timerStore.$reset();
  }


</script>
