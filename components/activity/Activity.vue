<template>
  <BaseSection title="Activities" class="">
    <template #default>
      <div class="p-4">
        <div v-if="listing.length < 1">
          <base-iddle title="No activities" />
        </div>

        <div v-else>

            sdad
        </div>
      </div>
    </template>

    <!-- <template #footer>
      <p class="text-right"><em>footer note</em></p>
    </template> -->
  </BaseSection>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useActivitiesStore } from '@/store/activities'
  const activitiesStore = useActivitiesStore()
  await activitiesStore.fetchActivities()

   const { listing } = storeToRefs(activitiesStore)

</script>
