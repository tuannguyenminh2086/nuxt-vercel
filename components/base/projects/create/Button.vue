<template>
  <div  class="flex items-center">
    <nuxt-link
      to="/projects/new"
      class="inline-flex cursor-pointer justify-center items-center whitespace-nowrap px-4 py-2 focus:outline-none transition-colors duration-150 border rounded p-1 btn bg-indigo-500 text-white border-blue-500 font-semibold  mr-3 hover:bg-indigo-600 last:mr-0"
      type="button"
    >
      <svg class="w-4 h-4 fill-white opacity-100 shrink-0 mr-2" viewBox="0 0 16 16">
        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
      </svg>
      <span>New Project</span>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">

</script>
