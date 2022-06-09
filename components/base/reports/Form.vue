<template>
    <base-section title="Time Tracking Report">
      <template #default> 
            <form class='dark:bg-gray-900/70 bg-white dark:border-gray-800'>
     
              <div class='p-6'>
                <div class='mb-6 last:mb-0'>


                  <div class='grid grid-cols-4'>
                    <Datepicker
                      v-model='state.date'
                      range
                      format='yyyy-MM-dd'
                      close-on-scroll
                      auto-apply
                      placeholder='Report Range'
                      class='relative max-w-full focus:ring focus:outline-none border-slate-100 rounded w-full dark:placeholder-gray-400 border bg-white dark:bg-gray-800'
                    />

                    <button
                      class='ml-4 w-2/4  inline-flex cursor-pointer justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border rounded ring-blue-700 bg-blue-600 text-white border-blue-700 hover:bg-blue-700 '
                      type='button'
                      :disabled="state.isProcess"
                      @click.prevent='handleSubmit'
                    >
                      <span class='px-6 text-lg'>Download CSV</span>
                    </button>

                  </div>

                </div>

              </div>
            </form>
            
      </template>
    </base-section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

definePageMeta({
  middleware: 'auth',
  key: route => route.fullPath
})

const { exportTimeTracking } = useReports()
const state = reactive({
  date: '',
  isProcess: false
})

const handleSubmit = async () => {
  const [startDate, endDate] = state.date
  if (state.isProcess) return
  state.isProcess = true
  const res = await exportTimeTracking(startDate, endDate);

  if (res) state.date = ''

  setTimeout(() => {
    state.isProcess = false
  }, 3000)
}

</script>
