<template>
  <NuxtLayout name='dashboard'>
    <h1 class='text-4xl font-bold mb-10'>Reports</h1>


    <base-section title="Time Tracking Report">
      <template #default>


            <form class='dark:bg-gray-900/70 bg-white dark:border-gray-800'>
     
              <div class='p-6'>
                <div class='mb-6 last:mb-0'>


                  <div class='grid grid-cols-4'>
                    <Datepicker
                      v-model='state.date'
                      range
                      format='MM/dd/yyyy'
                      close-on-scroll
                      auto-apply
                      placeholder='Report Range'
                      class='relative max-w-full focus:ring focus:outline-none border-slate-100 rounded w-full dark:placeholder-gray-400 border bg-white dark:bg-gray-800'
                    />

                    <button
                      class='ml-4 w-2/4  inline-flex cursor-pointer justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border rounded ring-blue-700 bg-blue-600 text-white border-blue-700 hover:bg-blue-700 '
                      type='button'
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


  </NuxtLayout>
</template>

<script setup lang='ts'>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { reactive } from 'vue'
import { useFetch } from '@vueuse/core'
import { useAuthStore } from '@store/auth'

definePageMeta({
  middleware: 'auth',
  key: route => route.fullPath
})

const state = reactive({
  date: ''
})

const auth = useAuthStore()
const _token = auth.getAuthToken()

const handleSubmit = () => {
  let [startDate, endDate] = state.date
  startDate = transformDate(startDate)
  endDate = transformDate(endDate)
  submit(startDate, endDate)
}

const submit = async (startDate: string, endDate: string) => {
  const runtimeConfig = useRuntimeConfig()

  const url = runtimeConfig.public.API_URL + '/reports/project-time-spent'
  const { data, response } = await useFetch(url, {
    headers: {
      Authorization: `Bearer ${_token}`,
      Accept: 'application/json'
    }
  }).post({
    startDate,
    endDate
  }).blob()

  const responseHeader = response.value?.headers.get('Content-Disposition')

  if (typeof responseHeader !== 'undefined' && responseHeader && data) {
    const startFileNameIndex = responseHeader.indexOf('=') + 1
    const filename = `${startDate}_${endDate}_` + responseHeader.substring(startFileNameIndex, responseHeader.length)
    const reportData = data.value as Blob
    const fileURL = window.URL.createObjectURL(reportData)
    const fileLink = document.createElement('a')
    fileLink.href = fileURL
    fileLink.setAttribute('download', filename)
    document.body.appendChild(fileLink)
    fileLink.click()
    state.date = ''
  }

}

const transformDate = (date: string): string => {
  const dateInstance = new Date(date)
  const month = `${dateInstance.getMonth()}`;
  const day = `${dateInstance.getDate()}`;
  return `${dateInstance.getFullYear()}/${month.padStart(2,'0')}/${day.padStart(2,'0')}`
}


</script>