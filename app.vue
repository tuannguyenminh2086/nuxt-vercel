<template>
  <Html class="scroll-smooth" lang="en">
    <Body
      class="antialiased duration-300 transition-all text-gray-800 dark:text-gray-200 bg-slate-100 dark:bg-gray-900"
    >
      <NuxtPage />
      <div id="modals"></div>
    </Body>
  </Html>
</template>
<script setup lang="ts">
  useHead({
    titleTemplate: '%s - Lotti',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
      { name: 'description', content: '' }
    ],
    bodyAttrs: {
      class: ''
    }
  })

  definePageMeta({
    key: route => route.fullPath
  })
</script>