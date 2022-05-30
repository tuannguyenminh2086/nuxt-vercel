<template>
  <div class=" ">
    <base-hours :hours="tracked" variant="duration" class="" />
  </div>
</template>

<script setup lang="ts">
  type TSpent = {
    spent: number
  }
  interface IProps {
    timeTracking: TSpent[]
  }

  const props = defineProps<IProps>()

  const tracked = computed(() => {
    let _tracked = 0;
    _tracked = props.timeTracking.reduce((previousValue, currentValue) => previousValue + currentValue.spent, 0);
    return _tracked
  })

</script>
