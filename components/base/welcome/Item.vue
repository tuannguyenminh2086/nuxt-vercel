<template>
  <div class="welcome mb-10">
    <h1 class="text-4xl font-bold">{{ welcomeText }}, {{ name }}</h1>
    <div class="subtitle is-6">Hope you have great day!</div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  // import { useLottiStore } from "@/store/lotti";
  
   const welcomeText = computed(() => {
      const today = new Date();
      const curHr = today.getHours();
      if (curHr < 12) {
        return "Good morning";
      } else if (curHr < 18) {
        return "Good afternoon";
      } else {
        return "Good evening";
      }
    });

  const name = computed(() => {
    // return lotti.me ? lotti.me.name : "";
    return "TUAN"
  });

</script>
