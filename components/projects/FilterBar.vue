<template>
  <base-section class="mb-6">
    <template #default>
      <div class="flex items-center">
        <div class="mr-6">
             <NuxtLink
                :to='createUrl'
                class="inline-flex cursor-pointer justify-center items-center whitespace-nowrap px-4 py-3 transition-colors duration-150 border rounded-md p-1 btn bg-indigo-500 text-white border-blue-500 mr-3 
                      focus:outline-none 
                      hover:bg-indigo-600 
                      last:mr-0"
              >
                    <span class="mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </span>
                    <span class="font-semibold">New Project</span>
            </NuxtLink>
        </div>

        <div class="ml-auto flex justify-end">
          <div class="w-80">
       
              <FormKit
                  v-model="keyword"
                  type="search"
                  placeholder="Search..."
                  minlength="3"
                  inner-class="rounded-md bg-slate-50 overflow-hidden border outline-none focus-within:border-blue-500 formkit-invalid:border-red-500"
                  input-class="w-full px-4 bg-transparent py-3 text-base text-gray-700 placeholder-gray-400 outline-none"
                  message-class="text-red-500 mb-1 mt-3 text-xs"
                  validation="length:3"             
                />
            </div>
      
          
           <div class="ml-4 relative">
              <FormKit 
                type="button"
                input-class="bg-blue-500  text-white font-normal py-3 px-6 rounded hover:bg-blue-700 focus:bg-blue-700"
                @click.prevent.stop="filterHandle"
              >
                Filter
              </FormKit>
           </div>
        </div>

      
      </div>

      <div v-if="keyword !==''" class="flex mt-4">
        <span>Keyword: <span class="font-bold">{{ keyword }}</span></span>
      </div>
    </template>
  </base-section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  const { fetchAPI } = useProjects()
  // interface VariablesObject {
  //   [key: string]: any
  // }

  // const status: Ref<number> = ref(0)
  const keyword: Ref<string> = ref('')

  const createUrl = computed(() => {
    return `/projects/new`
  })

  const filterHandle = () => {
    // const payload:VariablesObject = {}
    if (keyword.value.length > 3) {
      fetchAPI("", keyword.value)
    }
    
  }

  



</script>
