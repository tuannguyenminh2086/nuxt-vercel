<template>
  <div class="page-title">
    <h1 v-if="title" class="text-4xl font-bold mb-2">{{ title }}</h1>
    <div v-if="subtitle">{{subtitle}}</div>
  </div>
</template>

<script setup lang="ts">
  interface IProps {
    title?: string
    subtitle?: string
  }

  defineProps<IProps>()

</script>
