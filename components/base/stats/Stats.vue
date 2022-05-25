<template>
  <div class="bg-white
        p-6 rounded-lg flex flex-col col-span-full border border-slate-200 
          sm:col-span-6 xl:col-span-4 
        dark:bg-slate-800 dark:border-gray-800"
  >
    <h2 v-if="title" class="text-lg font-semibold text-slate-800 mb-2 dark:text-slate-200">
      {{ title }}
    </h2>

    <div class="flex items-start">
      <div class="text-5xl font-semibold text-blue-800 mr-2 dark:text-slate-200">
      {{ number }}
      </div>
    </div>
  
  </div>
</template>

<script setup lang="ts">

  interface IProps {
    title: string,
    number: string | number
  }

  const { title = '' } = defineProps<IProps>()

</script>

