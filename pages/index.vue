<template>
  <NuxtLayout name="dashboard">
    <div className="grid">
        <div class="col-auto">
          <base-welcome-item />
        </div>
    </div>
    <div className="grid">
        <div class="col-auto">


          <BaseSection title="Activities" class="">
            <template #default>
              {{ text }}
            </template>

            <template #footer>
              <p class="text-right"><em>footer note</em></p>
            </template>
          </BaseSection>

        </div>

         <div class="col-auto">
          <BaseSection>
            <template #default>
              <BaseLoader />

            </template>
          </BaseSection>
         </div>
    </div>

    <div className="grid grid-cols-12 mt-10">
        <NuxtLink to="/projects">
          <span class="text-black">Projects</span>
        </NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
  const text = useToUpper('it works!');
</script>