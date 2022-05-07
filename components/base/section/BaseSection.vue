<script setup lang="ts">
  defineProps({
    title: String
  })

</script>

<template>
  <section class="section">
    <div class="section__header px-6 sm:px-0 mb-4 flex items-center justify-between">
      <h3 class="text-xl font-semibold">{{ title }}</h3>
      <div class="ml-auto">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="section__body md:rounded border-gray-100 dark:bg-slate-800 bg-white border dark:border-gray-800 mb-4">
      <slot></slot>
    </div>
    <div class="section__footer">
      <slot name="footer"></slot>
    </div>
  </section>
</template>
