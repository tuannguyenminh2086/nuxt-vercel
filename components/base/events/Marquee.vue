<template>
  <div class="py-2 events-marquee mr-2 hidden lg:block">
    <div class="bg-gray-800 rounded-md text-white py-2 px-6">
        <vue3-marquee :pause-on-hover="true">
          <span class="text-lg text-orange-400 border-r border-white px-4">Swiss National Day 2022 in Switzerland</span>
          <span class="text-lg text-orange-400 border-r border-white px-4">Independence Day of Vietnam 2022</span>
      </vue3-marquee>
    </div>
    
  </div>
</template>

<script setup lang="ts">
  import { useEvents } from '~~/composables/events';
  const { fetchEvents } = useEvents()

  onMounted(() => {
    fetchEvents()
  })

</script>

<style scoped lang="scss">

  .events-marquee {
    width: 24rem;
  }

  @media screen and (min-width: 1440px) {
     .events-marquee {
        width: 44rem;
      }

  }

</style>