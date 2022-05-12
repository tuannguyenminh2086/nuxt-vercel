<template>
  <NuxtLayout name="dashboard">
    <h1 class="text-4xl font-bold mb-5">Projects</h1>
    <NuxtLink to="/"> Back to Home </NuxtLink>

    <div class="grid grid-cols-4 mt-6">
      <div class="col-span-1">
        <base-search-projects />
      </div>
    </div>

    <div class="grid gap-4 mt-2">
      <div class="col-auto">
        <projects-listing />
      </div>
    </div>

  </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>