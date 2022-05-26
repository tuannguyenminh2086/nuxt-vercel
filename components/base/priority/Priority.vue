<template>
  <span class="font-bold text-sm px-2 py-1 inline-block rounded text-white text-capitalize w-20 text-center" :class="styleRender">
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

  switch (props.text.toLowerCase()) {
    case 'critical':
      styleRender.value = 'bg-red-500'
      break;

    case 'urgent':
      styleRender.value = 'bg-orange-700'
      break;

     case 'low':
       styleRender.value = 'bg-lime-400'
      break;
      
     case 'doing':
       styleRender.value = 'bg-lime-600'
      break;
      
     case 'medium':
       styleRender.value = 'bg-cyan-500'
      break;

     case 'high':
       styleRender.value = 'bg-yellow-500'
      break;

     case 'done':
       styleRender.value = 'bg-emerald-500'
      break;

     case 'normal':
       styleRender.value = 'bg-sky-500'
      break;
  
    default:
      styleRender.value = 'bg-slate-100 text-sky-400'
      break;
  }

</script>

