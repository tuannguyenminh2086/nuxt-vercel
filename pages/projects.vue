<template>
  <NuxtLayout name="dashboard">
    <nuxt-page />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>