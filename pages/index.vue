<template>
  <NuxtLayout name="dashboard">
    <div class="wrap pt-10">
      <div class="grid">
        <div class="col-auto">
          <base-welcome-item />
        </div>
      </div>
      <div class="grid gap-4 lg:grid-cols-12">
        <div class="col-span-12 mt-10">
          <base-activity />
          <base-projects-working class="mt-10" />
        </div>

        <!-- <div class="col-auto mt-10 lg:col-span-4">
           <base-tasks-user :issue-type="6" title="To do" />
        </div> -->
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: 'auth'
  })
  useHead({
    title: 'Dashboard'
  })
</script>

