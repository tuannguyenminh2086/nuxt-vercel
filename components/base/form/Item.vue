<template>
  <div class="form-control mb-8">
    <label class="text-xs font-semibold rounded-lg text-slate-400 uppercase mb-2 block">{{ controlTitle }}</label>
    <div class="relative">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  interface IProps {
    controlTitle: string
  }
  
  defineProps<IProps>();

</script>
