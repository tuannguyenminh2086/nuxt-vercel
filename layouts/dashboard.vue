<template>
  <div class="dashboard flex h-screen overflow-hidden">

      <the-sidebar />

      <!-- content -->
      <div
        class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
      >
        <the-header />

        <main>
          <div class="px-4 sm:px-6 py-8 w-full max-w-9xl mx-auto pb-32">
            <slot />
          </div>
        </main>
      </div>


    <client-only>
       <base-timer-issue-tracking/>
       <notifications position="top center" :duration="4000"  width="40%"></notifications>
    </client-only>


  </div>
</template>

<script setup lang="ts">
import TheSidebar from '../components/master/TheSidebar.vue'
import TheHeader from '~~/components/master/TheHeader.vue'


</script>