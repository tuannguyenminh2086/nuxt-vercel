<template>
  <Html class="scroll-smooth">
    <Body
      class="antialiased duration-300 transition-all text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900"
    >
      <NuxtPage />
    </Body>
  </Html>
</template>
<script setup lang="ts">
  import { useTimerStore } from '@/store/timer';
  const timerStore = useTimerStore();
  timerStore.getCurrentTracking();
</script>