<template>
  <div class="welcome mb-10">
    <h1 class="text-2xl font-semibold capitalize lg:text-2xl">{{ welcomeText }}, 
      <span class="text-4xl font-bold inline-block lg:text-4xl">{{ name }}</span>
    </h1>
    <div class="subtitle is-6 text-lg mt-3">Hope you have great day!</div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { storeToRefs } from 'pinia'
  import { useAuthStore } from "~~/store/auth";

  const authStore = useAuthStore()
  const { me } = storeToRefs( authStore )
  
   const welcomeText = computed(() => {
      const today = new Date();
      const curHr = today.getHours();
      if (curHr < 12) {
        return "Morning";
      } else if (curHr < 18) {
        return "Afternoon";
      } else {
        return "Evening";
      }
    });

  const name = computed(() => {
    return me ? me.value?.name : "";
  });

</script>
