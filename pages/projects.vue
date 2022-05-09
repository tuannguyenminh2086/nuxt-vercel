<template>
  <NuxtLayout name="dashboard">
    <h1 class="text-4xl font-bold">Projects</h1>
    <NuxtLink to="/"> Home </NuxtLink>
  </NuxtLayout>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>