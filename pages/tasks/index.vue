<template>
  <div class="mt-8">
    <h1 class="text-4xl font-bold mb-2">My Tasks</h1>

    <!-- <div class="mt-10">
      <base-section title="Statistic">
        <template #default>
          <div class="p-4">is coming soon </div>
        </template>
      </base-section>
    </div> -->

    <div class="grid gap-4 mt-10">
      <div class="col-auto mb-10">
        <base-tasks-user :issue-type="2" title="Doing" />
      </div>

      <div class="col-auto mb-10">
        <base-tasks-user :issue-type="6" title="To do" />
      </div>
      
      <div class="col-auto mb-10">
        <base-tasks-user :issue-type="4"  title="Review"  />
      </div>

       <div class="col-auto">
        <base-tasks-user :issue-type="5"  title="Done"  />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Tasks'
  })
</script>