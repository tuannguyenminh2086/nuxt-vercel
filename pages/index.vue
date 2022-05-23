<template>
  <NuxtLayout name="dashboard">
    <div class="grid">
      <div class="col-auto">
        <base-welcome-item />
      </div>
    </div>
    <div class="grid">
      <div class="col-auto mt-10">
        <activity />
      </div>

      <div class="col-auto mt-10">
        <working-projects />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
  import WorkingProjects from '~~/components/projects/WorkingProjects.vue';
  definePageMeta({
    middleware: 'auth'
  })
</script>

