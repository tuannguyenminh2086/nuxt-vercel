<template>
  <BaseSection title="Activities" class="">
    <template #default>
      <div class="p-4">
        {{ text }}
      </div>
    </template>

    <!-- <template #footer>
      <p class="text-right"><em>footer note</em></p>
    </template> -->
  </BaseSection>
</template>

<script setup lang="ts">
    const text = useToUpper('it works!');
</script>
