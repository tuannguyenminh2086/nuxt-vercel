<template>
  <div
    class="bg-slate-50 rounded-md p-4 shadow-xl transition-all w-96 lg:w-1/4 lg:px-6 dark:bg-slate-800"
    :class="isRunning ? 'block fixed bottom-0 right-0 ': 'hidden translate-y-full'"
  >
    <div class="flex items-center">
      <div class="mr-10 flex-1 flex-grow">
        <p class="text-sm">You're working on:</p>

        <h3 class="font-bold mb-2 text-lg mt-2 lg:text-2xl">
          <NuxtLink :to="`/tasks/${currentTracking.id}`" class="font-bold mb-2 text-lg mt-2 lg:text-2xl">{{ currentTracking.name ? currentTracking.name : '' }}</NuxtLink>
        </h3>
        <!-- <div class="font-bold text-4xl mt-6">{{counter}}</div> -->
      </div>

      <div class="ml-auto">
        <button 
          class="button border-1 border-slate-200 p-4 rounded-full transition-all bg-red-500 hover:bg-red-600"
          @click.stop.prevent="stopTimerHandle"
        >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              class="stroke-slate-50 fill-slate-50">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            </svg>

        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useTimerStore } from '@/store/timer'

  const timerStore = useTimerStore()
  const { stopTimer, fetchTimer } = useTask()
  const { isRunning, task } = storeToRefs(timerStore)

  const stopTimerHandle = () => {
    stopTimer(task.value.issue_id)
  }

  const currentTracking = computed(() => {
    const _localTask = JSON.parse(localStorage.getItem('lottiTimer')!)

    const res = {
      name: 'N/A',
      id: ''
    }

    if (task.value) {
      const _task:any = {...task.value}   

      if (_task.name) {
        res.name = _task.name
      } else {
        res.name = _localTask ? _localTask.name : ''
        res.id = _localTask ? _localTask.id : ''
      }

    }

    return res
  })




  onMounted(() => {
    fetchTimer()
  })


</script>
