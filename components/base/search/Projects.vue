<template>
  <div class="">
    <input
      v-model="keyword"
      type="text"
      class="form-input px-6 py-3 rounded-full min-w-full bg-slate-200" 
      placeholder="Type project name"
      @change="filterProjects"
    />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useProjects } from '#imports'

const keyword: Ref<string> = ref('');
  const { fetchAPI } = useProjects();
  const filterProjects = () => {
    fetchAPI('',keyword.value);
  };
</script>
