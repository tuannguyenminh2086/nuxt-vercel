<template>
  <div class="mt-8">
    <div class="grid gap-4 mt-2">
      <div class="col-auto">
        <base-tasks-user :issue-type="2" title="Doing" />
      </div>

      <div class="col-auto">
        <base-tasks-user :issue-type="6" title="To do" />
      </div>
      
      <div class="col-auto">
        <base-tasks-user :issue-type="4"  title="Review"  />
      </div>

       <div class="col-auto">
        <base-tasks-user :issue-type="5"  title="Done"  />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>