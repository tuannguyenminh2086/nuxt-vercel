<template>
  <div class="font-bold px-4 inline-block text-white uppercase" :class="styleRender">
    {{ text }}
  </div>
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
    case 'urgent':
      styleRender.value = 'bg-red-500'
      break;
     case 'low':
       styleRender.value = 'bg-lime-600'
      break;
  
    default:
      styleRender.value = ''
      break;
  }

</script>

