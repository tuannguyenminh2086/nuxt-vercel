<template>
    <button
      class="button border-1  p-2 rounded dark:border-0"
      type="button"
      :disabled=" isDisabled ? true : false"
      title="Start/Stop Timer"
      @click.stop="toggleTimer"
    >
        <svg 
          aria-hidden="true"
          role="img" 
          class="" 
          :class=" isDisabled ? 'stroke-zinc-200' : 'stroke-cyan-500 hover:stroke-cyan-700'"
          width="24" 
          height="24" 
          preserveAspectRatio="xMidYMid meet" 
          viewBox="0 0 48 48"
        >
          <g fill="none" fill-rule="evenodd" stroke-linejoin="round" stroke-width="4" transform="translate(7 3)">
            <circle cx="17" cy="24" r="17"></circle>
            <path stroke-linecap="round" d="M11 1h12m-6 15v8m8 0h-8m0-23v4"></path>
          </g>
        </svg>
    </button>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useTimerStore } from '@/store/timer'
  
  interface IProps {
    taskId: string
    taskName: string
  }

  const props = defineProps<IProps>()
  const timerStore = useTimerStore()
  const { task, isRunning } = storeToRefs(timerStore)
  const { startTimer } = useTask()
  const isProgress = ref(false)
  const { $bus } = useNuxtApp()

  const isDisabled = computed(() => {
    return task.value.issue_id.toString() === props.taskId.toString()
  })

  const toggleTimer = async () => {

    if ( isProgress.value || isRunning.value ) {
      alert('You need to stop other task!')
      return
    } 
    
    isProgress.value = true
    const startAt = new Date()
    const result = await startTimer(props.taskId, props.taskName, startAt.toString())

    if (result.value.status) {
      
      setTimeout(()=>{
        isProgress.value = false
        $bus.$emit('refetch-issues')
      }, 3000)

    }

  }

</script>

