<script setup lang="ts">
</script>

<template>
  <NuxtLayout name="dashboard">
    <div className="grid grid-cols-12 gap-6">
      <div class="test">
        <NuxtLink to="/projects">
          <span class="text-black">Projects</span>
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
.test {
  min-height: 1000px;
}
</style>
