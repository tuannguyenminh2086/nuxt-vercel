<template>
  <span class="font-semibold">
    {{ renderDisplay }}
  </span>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import dayjs from 'dayjs';
  import duration from 'dayjs/plugin/duration'
  import relativeTime from 'dayjs/plugin/relativeTime'


  dayjs.extend(duration)
  dayjs.extend(relativeTime)


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
    let result = 'n/a'

    switch (props.variant) {
      case 'duration':
          result = props.hours > 0 ? formatDuration(props.hours) : '00:00:00'
        break;
        
      case 'humanize':
          if ( props.hours > 0 ) {
            result = dayjs.duration(props.hours, "hours").humanize(true);
          } else {
            result = '0'
          }
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


