<template>
  <div class="font-semibold px-2 py-1 inline-block rounded text-white text-sm text-capitalize w-16 text-center" :class="styleRender">
    {{ render }}
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { Ref } from 'vue'
   interface IProps {
    code: number
  }

  const props = defineProps<IProps>()
  const styleRender: Ref<string> = ref('');

  const render = computed(() => {
    switch (props.code) {
      case 0:
        styleRender.value = "bg-red-500 border-red-500"
        return 'closed'
      case 1:
        styleRender.value = "bg-green-500 border-green-500"
        return 'open'
    }
  })

</script>
