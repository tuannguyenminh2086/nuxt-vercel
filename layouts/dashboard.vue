<template>
  <div class="dashboard flex h-screen overflow-hidden">

      <global-the-sidebar />

      <!-- content -->
      <div
        class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
      >
        <global-the-header />

        <main>
          <div class="px-4 sm:px-6 py-8 w-full max-w-9xl mx-auto pb-32">
            <slot />
          </div>
        </main>
      </div>
      
      <div id="modal-area"></div>

      <client-only>
        <base-timer-issue-tracking />
        <notifications position="top right" :duration="2000"  width="30%"  />
      </client-only>
  </div>
</template>

<script setup lang="ts">
const { $echoClient, $notification, $bus } = useNuxtApp();

  onMounted(() => {
      $echoClient.private("TaskInProcess").listen(".task-in-process", (_e:any) => {
          const { data: { action, message } } = _e;
          const id = Date.now()

          if ( action) {
            switch (action) {
              case "reload":
              
                $notification({
                  id,
                  type: 'warning',
                  title: 'Activity Tracking',
                  text: message
                })

                 $bus.$emit('refetch-activity')
                
              break;
            }
          }
      
      })
  })

</script>