<template>
  <div class="dashboard flex h-screen overflow-hidden">
    <the-sidebar />

    <!-- content -->
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <the-header />

      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import TheSidebar from '../components/master/TheSidebar.vue'
import TheHeader from '~~/components/master/TheHeader.vue'
export default {
  components: { TheHeader, TheSidebar },
  middleware: 'auth',
}
</script>
