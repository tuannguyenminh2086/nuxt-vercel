<template>
  <span class="font-semibold">
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

  const { formatDuration } = useUTILs()


  const renderDisplay = computed(() => {
    let result:string = 'n/a'

    switch (props.variant) {
      case 'duration':
          result = props.hours > 0 ? formatDuration(props.hours)?.toString()! : '00:00:00'
        break;
        
      case 'datetime':
          if ( props.date !== '') {
            result = dayjs(props.date).format('DD MMM YYYY | HH:mm:ss')
          } else {
            result = '0'
          }
        break;
      
      case 'time':
        result = props.date;
        break;

      case '':
    }

    return result
  })

</script>


