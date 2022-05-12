<template>
  <div name="dashboard">
      <h3>Detail</h3>
      {{ route.params.id }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
</script>
