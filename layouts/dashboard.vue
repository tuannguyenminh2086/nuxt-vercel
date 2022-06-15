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
        <notifications position="top right" width="30%"  />
      </client-only>
  </div>
</template>

<script setup lang="ts">
  const { $echoClient, $notification, $bus } = useNuxtApp();

  const updateActive = (message:any) => {
      const id = Date.now()

      $notification({
        id,
        type: 'warning',
        title: 'Activity Tracking',
        text: message
      });

      setTimeout(() => {
        $notification.close(id);
      }, 2000)
      
      $bus.$emit('refetch-activity');          
  }

  onMounted(() => {
      $echoClient.private("TaskInProcess").listen(".task-in-process", (_e:any) => {
          const { data: { action, message } } = _e;
        
          if ( action) {
            switch (action) {
              case "reload":
                 updateActive(message)
              break;
            }
          }
      
      })
  })




</script>