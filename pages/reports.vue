<template>
  <NuxtLayout name='dashboard'>
    <h1 class='text-4xl font-bold'>Reports</h1>

    <NuxtLink to='/'> Home</NuxtLink>

    <form class='md:rounded border-gray-100 dark:bg-gray-900/70 bg-white border dark:border-gray-800' _lpchecked='1'>
      <header class='border-gray-100 flex items-stretch border-b dark:border-gray-800'>
        <p class='flex items-center py-3 grow font-bold px-4'>
          <span
            class='inline-flex justify-center items-center w-6 h-6 mr-3'>
            <svg viewBox='0 0 24 24' width='16' height='16' class='inline-block'>
              <path 
                fill='currentColor'
                d='M13,9.5H18V7.5H13V9.5M13,16.5H18V14.5H13V16.5M19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21M6,11H11V6H6V11M7,7H10V10H7V7M6,18H11V13H6V18M7,14H10V17H7V14Z'>
              </path>
            </svg>
          </span>
          Report
        </p>

      </header>
      <div class='p-6'>
        <div class='mb-6 last:mb-0'>
          <label class='block font-bold mb-2'>Spent time Report </label>
          <div class='grid grid-cols-1 gap-3 md:grid-cols-2'>
            <Datepicker v-model='state.date'
                        range
                        format='MM/dd/yyyy'
                        multi-calendars
                        close-on-scroll
                        auto-apply
                        placeholder='Report Range'
                        class='relative max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 border bg-white dark:bg-gray-800'
            ></Datepicker>
            <button
              class='w-1/3 inline-flex cursor-pointer justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border rounded ring-blue-700 bg-blue-600 text-white border-blue-700 hover:bg-blue-700 '
              type='button'
              @click.prevent='handleSubmit'
            ><!----><span class='px-2'>Download</span>
            </button>
          </div><!---->

        </div>

      </div>
    </form>

  </NuxtLayout>
</template>

<script setup lang='ts'>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { reactive } from 'vue'
import { useFetch } from '@vueuse/core'
import { useAuthStore } from '@store/auth'

definePageMeta({
  middleware: 'auth'
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