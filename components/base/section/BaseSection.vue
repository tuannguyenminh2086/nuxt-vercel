<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: ''
    }
  })

</script>

<template>
  <section class="section bg-white  rounded-lg shadow  border-slate-500 transition-all  dark:bg-slate-800 dark:border-slate-100 hover:shadow-lg">
    <div 
      class="section__header px-4  items-center justify-between py-4 border-b border-slate-100 dark:border-slate-600"
      :class="[  title || $slots.actions ? 'flex' : 'hidden' ]"
    >
      <h3 v-if="title" class="text-xl font-semibold ml-2 text-blue-900 dark:text-slate-200">{{ title }}</h3>
      <div v-if="$slots.actions"  class="ml-auto">
        <slot name="actions"></slot>
      </div>
    </div>

    <div class="section__body p-4 md:rounded dark:bg-slate-800 ">
      <slot></slot>
    </div>
    <div class="section__footer">
      <slot name="footer"></slot>
    </div>
  </section>
</template>
