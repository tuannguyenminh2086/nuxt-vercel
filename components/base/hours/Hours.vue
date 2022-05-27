<template>
  <span class="font-bold">
    {{ renderDisplay }}
  </span>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import dayjs from 'dayjs';

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
            result = dayjs(props.date).format('DD MMM YYYY  | HH:mm:ss')
          } else {
            result = '0'
          }
        break;
      
      case 'time':
        result = props.date;
        break;
    }

    return result
  })

</script>
