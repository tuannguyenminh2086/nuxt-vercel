<template>
    <button
      class="button border-1  p-2 rounded dark:border-0"
      type="button"
      :disabled=" isDisabled ? true : false"
      title="Start Timer"
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

  const isDisabled = computed(() => {
    return task.value.issue_id.toString() === props.taskId.toString()
  })

  const toggleTimer = () => {
    if (isDisabled.value) return
    if (!isRunning.value) {
      timerStore.startTimer(props.taskId, props.taskName)
    } else {
      alert('You need to stop other task!')
    }
     
  }

</script>
