<template>
  <Html class="scroll-smooth">
    <Body
      class="antialiased duration-300 transition-all text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900"
    >
      <NuxtPage />
    </Body>
  </Html>
</template>
<script setup lang="ts">
  useHead({
    titleTemplate: 'My App - %s',
    // or, instead:
    // titleTemplate: (title) => `My App - ${title}`,
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    charset: 'utf-8',
    meta: [
      { name: 'description', content: 'My amazing site.' }
    ],
    bodyAttrs: {
      class: 'test'
    }
  })
</script>