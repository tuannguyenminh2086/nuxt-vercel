<template>
  <div class="pt-10 px-4">
    <base-common-header 
      title="New Project" 
      subtitle="Create a blank project to house your files, plan your work, and collaborate on code, among other things." 
    />
    <div class="grid mt-10 gap-4 lg:grid-cols-4 ">
      <div class="lg:col-span-2">
        <projects-create-form />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  useHead({
    title: 'Create new Project'
  })

  

</script>
