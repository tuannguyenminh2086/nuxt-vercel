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
                    <span class="font-semibold">New Issue</span>
            </NuxtLink>
        </div>

        <div class="ml-auto flex justify-end items-center">
          <div class="w-80">
            <Datepicker
              v-model='date'
              range
              format='yyyy-MM-dd'
              close-on-scroll
              auto-apply
              placeholder=''
              class='relative max-w-full  border bg-whiteborder-slate-100 rounded w-full 
                    focus:ring 
                    focus:outline-none
                    dark:placeholder-gray-400
                    dark:bg-gray-800'
              />
          </div>
          
           <div class="ml-4 relative">
              <FormKit 
                type="button"
                input-class="bg-blue-500  text-white font-normal py-2 px-6 rounded hover:bg-blue-700 focus:bg-blue-700"
              >
                Filter
              </FormKit>
           </div>
        </div>

      
      </div>
    </template>
  </base-section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import Datepicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'


  interface IProps {
    pid: string | string []
  }

  const props = defineProps<IProps>()
  const date: Ref<string | string []>= ref('')

  const createUrl = computed(() => {
    return `/projects/${props.pid}/create`
  })

  onMounted(() => {
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    date.value = [startDate.toString(), endDate.toString()];
  })
  



</script>
