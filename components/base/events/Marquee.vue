<template>
  <div class="py-2 events-marquee mr-2 hidden lg:block">
    <div class="bg-gray-800 rounded-md text-white py-2 px-6">
        <vue3-marquee :pauseOnHover="true">
          <span class="text-lg text-orange-400 border-r border-white px-4">Event: sdadsadasd sads</span>
          <span class="text-lg text-orange-400 border-r border-white px-4">Event 2 sdadsadasd sads</span>
          <span class="text-lg text-orange-400 border-r border-white px-4">Event 3: sdadsadasd sads</span>
          <span class="text-lg text-orange-400 border-r border-white px-4">Event 4: 4 sdadsadasd sads</span>
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
    width: 44rem;
  }

</style>