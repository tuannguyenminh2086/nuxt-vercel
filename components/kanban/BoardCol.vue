<template>
  <div class="w-[400px] h-[calc(100vh-220px)] align-middle inline-block bg-slate-200 p-5 rounded-lg mr-5 overflow-auto whitespace-normal border-t-4 border-solid" :class="boardColorMap[props.issueType]">
    <h2 class="text-2xl mb-5">{{ props.title }}</h2>
    <kanban-board-item :issue-type="props.issueType" :board-color-map="boardColorMap"></kanban-board-item>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    title?: string
    issueType: number
  }

  interface IBoardColorMap {
    [key:number]: string
  }

  const props = defineProps<Props>()

  const boardColorMap:IBoardColorMap = {
    2: 'border-green-300',
    4: 'border-orange-300',
    5: 'border-slate-400',
    6: 'border-yellow-300'
  }
</script>