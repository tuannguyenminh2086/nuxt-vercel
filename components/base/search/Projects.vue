<template>
  <div class="">
    <input
      type="text"
      v-model="keyword"
      class="form-input px-6 py-3 rounded-full min-w-full bg-slate-200" 
      placeholder="Type project name"
      @change="filterProjects"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { useProjectStore } from "@/store/projects";

  const keyword: Ref<string> = ref('');
  const projectsStore = useProjectStore();

  const filterProjects = () => {
    projectsStore.searchProject(keyword.value);
  };
</script>
