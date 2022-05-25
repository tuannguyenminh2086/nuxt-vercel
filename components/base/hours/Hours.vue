<template>
  <span class="font-bold">
    {{ renderDisplay }} 
  </span>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  // import * as dayjs from 'dayjs';

  interface IProps {
    hours?: number,
    date?: string
    variant: string
  }

  const props = withDefaults(defineProps<IProps>(),{
    hours: 0,
    date: '',
    variant: 'duration'
  });

  // const display: Ref<string> = ref('');

  const renderDisplay = computed(() => {
    let result = ''
    switch (props.variant) {
      case 'duration':
          if ( props.hours > 0 ) {
            const _hours = props.hours / 3600;
            result = _hours.toFixed(2);
          } else {
            result = '0'
          }
        break;
        
      case 'datetime':
          if ( props.date !== '') {
            result = new Date(props.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' } )
          } else {
            result = '0'
          }
        break;
      
      case 'time':
          
        break;
    }

    return result
  })

</script>
