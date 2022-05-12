<template>
  <NuxtLayout name="dashboard">
    <h1 class="text-4xl font-bold mb-5">Tasks</h1>
    <NuxtLink to="/"> Back to Home </NuxtLink>
    <nuxt-page />
  </NuxtLayout>
</template>
<script setup lang="ts">
 definePageMeta({
    middleware: 'auth'
  })
</script>