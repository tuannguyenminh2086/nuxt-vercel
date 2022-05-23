<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: ''
    }
  })

</script>

<template>
  <section class="section bg-white shadow-md rounded-sm  border-slate-500  dark:bg-slate-800 dark:border-slate-100">
    <div class="section__header px-4 flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-600 ">
      <h3 v-if="title" class="text-lg font-semibold">{{ title }}</h3>
      <div class="ml-auto">
        <slot name="actions"></slot>
      </div>
    </div>

    <div class="section__body overflow-hidden p-4 md:rounded dark:bg-slate-800 ">
      <slot></slot>
    </div>
    <div class="section__footer">
      <slot name="footer"></slot>
    </div>
  </section>
</template>
