<template>
  <div>
    <h6 class="text-xs font-semibold rounded-lg text-slate-400 uppercase mb-2">{{ title }}</h6>
    <div>
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: ''
    }
  })

</script>
