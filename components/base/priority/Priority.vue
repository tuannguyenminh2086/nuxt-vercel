<template>
  <span class="font-bold px-4 inline-block text-white" :class="styleRender">
    {{ text }}
  </span>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ref } from 'vue'

  interface IProps {
    text: string
  }

  const props = defineProps<IProps>()
  const styleRender: Ref<string> = ref('');

  switch (props.text) {
    case 'critical':
      styleRender.value = 'bg-red-500'
      break;
    case 'urgent':
      styleRender.value = 'bg-orange-700'
      break;
     case 'low':
       styleRender.value = 'bg-lime-600'
      break;
     case 'medium':
       styleRender.value = 'bg-cyan-500'
      break;
     case 'high':
       styleRender.value = 'bg-yellow-500'
      break;
  
    default:
      styleRender.value = 'bg-slate-100'
      break;
  }

</script>

