<template>
  <header
    class="sticky shadow top-0 bg-white border-b border-slate-200 z-30 dark:bg-slate-900 dark:border-slate-500"
  >
    <div class="px-4 sm:px-6">
      <div class="flex items-center justify-between h-16 -mb-px">
        <div class="flex">
          <base-clock-item />
        </div>
        <div class="flex">
          <base-events-marquee />
          <base-theme-switcher />
          <base-avatar />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>
