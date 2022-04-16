<template>
  <NuxtLayout name="custom">
    <h1>Index page</h1>
    Hello world! {{ $hello() }}
  </NuxtLayout>
</template>

<script setup lang="ts">
// alternatively, you can also use it here
const { $hello } = useNuxtApp()
</script>

