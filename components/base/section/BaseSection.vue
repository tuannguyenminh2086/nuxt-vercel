<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: ''
    }
  })

</script>

<template>
  <section class="section ">
    <div class="section__header px-6 sm:px-0 mb-4 flex items-center justify-between">
      <h3 v-if="title" class="text-xl font-semibold mb-4">{{ title }}</h3>
      <div class="ml-auto">
        <slot name="actions"></slot>
      </div>
    </div>
    <div class="section__body shadow overflow-hidden md:rounded border-gray-100 dark:bg-slate-800 bg-white border dark:border-gray-800 mb-4">
      <slot></slot>
    </div>
    <div class="section__footer">
      <slot name="footer"></slot>
    </div>
  </section>
</template>
