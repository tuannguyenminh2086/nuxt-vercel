<template>
  <div>
    <h2 class="text-4xl font-bold my-10">
      Update Issue<span v-if="issue">: {{issue.name}}</span></h2>

    <base-section>
      <template #default>
        <base-tasks-edit :issue="issue"/>
      </template>
    </base-section>
  </div>
</template>

<script setup lang='ts'>
import type { Ref } from 'vue'
import { ref } from 'vue'
import { IIssues } from '~~/models/interfaces'

const route = useRoute()
if (!route.params.id) navigateTo('/projects')

const isLoading: Ref<boolean> = ref(true)
const issue: Ref<IIssues|null> = ref(null)

const { $makeRequest, $bus } = useNuxtApp()

const fetch = async () => {
  const result = await $makeRequest('get', `/api/tasks/${route.params.id}`);
  const issueDetail = result.issue;
  if (issueDetail) {
    isLoading.value = false
    issue.value = Object.assign(issueDetail);
    useHead({
      title: issue.value ? '#' + issue.value.id + ' - ' + issue.value.name : ''
    })
  }
}



onMounted(() => {
  fetch()

  $bus.$on('refetch-issue', () => {
    fetch()
  })


})

</script>

<style lang="scss">
  .desc {
    pre {
      overflow: auto;
      background-color: #fafafa;
      border: 1px solid #ccc;
      padding: 5px;
    }
  }
</style>
