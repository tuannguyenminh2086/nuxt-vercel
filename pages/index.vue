<template>
  <NuxtLayout name="dashboard">
    <div class="wrap">
      <div class="grid">
        <div class="col-auto">
          <base-welcome-item />
        </div>
      </div>
      <div class="grid">
        <div class="col-auto mt-10">
          <base-activity />
        </div>

        <div class="col-auto mt-10">
          <base-projects-working />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: 'auth'
  })
</script>

