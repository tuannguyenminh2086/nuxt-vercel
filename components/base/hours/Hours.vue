<template>
  <span class="font-bold">
    {{ renderDisplay }} 
  </span>
</template>

<script setup lang="ts">
  // import { ref } from 'vue';
  // import type { Ref } from 'vue';
  // import moment from 'moment';

  interface IProps {
    hours: number,
    variant: string
  }

  const props = withDefaults(defineProps<IProps>(),{
    hours: 0,
    variant: 'duration'
  });

  // const display: Ref<string> = ref('');

  const renderDisplay = computed(() => {

    switch (props.variant) {
      case 'duration':
          if ( props.hours > 0 ) {
            const _hours = props.hours / 3600;
            return _hours.toFixed(2);
          } else {
            return '0'
          }

      default:
        break;
    }
  })

</script>
