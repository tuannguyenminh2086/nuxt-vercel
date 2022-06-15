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
          <div class="mx-4 ml-10">
            <FormKit
              v-model="status"
              label="Status"
              type="select"
              name="status"
              :options="{
                0: 'All',
                1: 'Open',
                2: 'Doing',
                6: 'To Do',
                4: 'Review',
                5: 'Done'
              }"
              wrapper-class="flex items-center"
              label-class="mr-4 font-bold"
              input-inner="max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden formkit-invalid:border-red-500 focus-within:border-blue-500"
              input-class="w-full h-10 px-4 border border-gray-300 rounded-lg text-base text-gray-700 placeholder-gray-400"
            />
          </div>
          
           <div class="ml-4 relative">
              <FormKit 
                type="button"
                input-class="bg-blue-500  text-white font-normal py-2 px-6 rounded hover:bg-blue-700 focus:bg-blue-700"
                @click.prevent.stop="filterHandle"
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
  import dayjs from 'dayjs'
  import '@vuepic/vue-datepicker/dist/main.css'
  

  interface VariablesObject {
    [key: string]: any
  }

  interface IProps {
    pid: string | string []
  }

  const props = defineProps<IProps>()
  const date: Ref<string | string []>= ref('')
  const status: Ref<number> = ref(0)
  const { filterIssues } = useProject()

  const createUrl = computed(() => {
    return `/projects/${props.pid}/create`
  })

  const filterHandle = () => {
    const payload:VariablesObject = {}
    
    if ( date.value.length > 0) {

      const _start = dayjs(date.value[0]).format('YYYY-MM-DD');
      const _end = dayjs(date.value[1]).format('YYYY-MM-DD');

      const _datetime = { start_time: _start, end_time: _end }
      payload.create_time = {..._datetime}
    }

    if (status.value.toString() !== '0') {
      payload.status = parseInt(status.value.toString())
    } 
    filterIssues(props.pid.toString(), payload)

  }

  onMounted(() => {
    // const startDate = new Date();
    // const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
    // date.value = [startDate.toString(), endDate.toString()];

    // const now = dayjs();
    // console.log(now.month())


  })
  



</script>
