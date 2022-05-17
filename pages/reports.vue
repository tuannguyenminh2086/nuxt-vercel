<template>
  <NuxtLayout name='dashboard'>
    <h1 class='text-4xl font-bold'>Reports</h1>

    <NuxtLink to='/'> Home</NuxtLink>

    <form class='md:rounded border-gray-100 dark:bg-gray-900/70 bg-white border dark:border-gray-800' _lpchecked='1'>
      <header class='border-gray-100 flex items-stretch border-b dark:border-gray-800'>
        <p class='flex items-center py-3 grow font-bold px-4'><span
          class='inline-flex justify-center items-center w-6 h-6 mr-3'><svg viewBox='0 0 24 24' width='16' height='16'
                                                                            class='inline-block'><path
          fill='currentColor'
          d='M13,9.5H18V7.5H13V9.5M13,16.5H18V14.5H13V16.5M19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21M6,11H11V6H6V11M7,7H10V10H7V7M6,18H11V13H6V18M7,14H10V17H7V14Z'></path></svg></span>
          Report
        </p>

      </header>
      <div class='p-6'>
        <div class='mb-6 last:mb-0'>
          <label class='block font-bold mb-2'>Grouped with icons</label>
          <div class='grid grid-cols-1 gap-3 md:grid-cols-2'>
            <Datepicker v-model='state.date'
                        range
                        format='MM/dd/yyyy'
                        multiCalendars
                        closeOnScroll
                        autoApply
                        placeholder='Report Range'
                        class='relative max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 border bg-white dark:bg-gray-800'
            ></Datepicker>
            <!--            <div class='relative'><input type='text'-->
            <!--                                         class='px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-gray-800 pl-10'-->
            <!--                                         style='background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAfBJREFUWAntVk1OwkAUZkoDKza4Utm61iP0AqyIDXahN2BjwiHYGU+gizap4QDuegWN7lyCbMSlCQjU7yO0TOlAi6GwgJc0fT/fzPfmzet0crmD7HsFBAvQbrcrw+Gw5fu+AfOYvgylJ4TwCoVCs1ardYTruqfj8fgV5OUMSVVT93VdP9dAzpVvm5wJHZFbg2LQ2pEYOlZ/oiDvwNcsFoseY4PBwMCrhaeCJyKWZU37KOJcYdi27QdhcuuBIb073BvTNL8ln4NeeR6NRi/wxZKQcGurQs5oNhqLshzVTMBewW/LMU3TTNlO0ieTiStjYhUIyi6DAp0xbEdgTt+LE0aCKQw24U4llsCs4ZRJrYopB6RwqnpA1YQ5NGFZ1YQ41Z5S8IQQdP5laEBRJcD4Vj5DEsW2gE6s6g3d/YP/g+BDnT7GNi2qCjTwGd6riBzHaaCEd3Js01vwCPIbmWBRx1nwAN/1ov+/drgFWIlfKpVukyYihtgkXNp4mABK+1GtVr+SBhJDbBIubVw+Cd/TDgKO2DPiN3YUo6y/nDCNEIsqTKH1en2tcwA9FKEItyDi3aIh8Gl1sRrVnSDzNFDJT1bAy5xpOYGn5fP5JuL95ZjMIn1ya7j5dPGfv0A5eAnpZUY3n5jXcoec5J67D9q+VuAPM47D3XaSeL4AAAAASUVORK5CYII=&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;'><span-->
            <!--              class='inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-gray-400'><svg-->
            <!--              viewBox='0 0 24 24' width='16' height='16' class='inline-block'><path fill='currentColor'-->
            <!--                                                                                    d='M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z'></path></svg></span>-->
            <!--            </div>-->
            <!--            <div class='relative'><input type='email'-->
            <!--                                         class='px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-gray-800 pl-10'><span-->
            <!--              class='inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-gray-400'><svg-->
            <!--              viewBox='0 0 24 24' width='16' height='16' class='inline-block'><path fill='currentColor'-->
            <!--                                                                                    d='M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M17,17H7V15H17M17,13H7V11H17M20,9H17V6H20'></path></svg></span>-->
            <!--            </div>-->
          </div><!---->

        </div>
        <div class='mb-6 last:mb-0'><label class='block font-bold mb-2'>With help line</label>
          <div class=''>
            <div class='relative'><input placeholder='Your phone number' type='tel'
                                         class='px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-gray-800'>
              <!----></div>
          </div>
          <div class='text-xs text-gray-500 dark:text-gray-400 mt-1'>Do not enter the leading zero</div>
        </div>
        <hr class='border-gray-100 my-6 -mx-6 dark:border-gray-800 border-t'>

        <div class='flex items-center justify-start flex-wrap -mb-3'>
          <button
            class='inline-flex cursor-pointer justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border rounded ring-blue-700 p-2 bg-blue-600 text-white border-blue-700 hover:bg-blue-700 mr-3 last:mr-0 mb-3'
            type='button'
            @click.prevent='handleSubmit'
          ><!----><span class='px-2'>Submit</span>
          </button>
          <button
            class='inline-flex cursor-pointer justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border rounded ring-blue-700 p-2 text-blue-600 border-blue-700 hover:bg-blue-700 hover:text-white mr-3 last:mr-0 mb-3'
            type='reset'><!----><span class='px-2'>Reset</span></button>
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
const submit = async (startDate:string, endDate:string ) => {
  const runtimeConfig = useRuntimeConfig()

  const url = runtimeConfig.public.API_URL + '/reports/project-time-spent'
  await useFetch(url, {
    headers: {
      Authorization: `Bearer ${_token}`,
      Accept: 'application/json'
    }
  }).post({
    startDate,
    endDate
  }).json()

}
const transformDate = (date: string): string => {
  const dateInstance = new Date(date)
  return `${dateInstance.getFullYear()}/${dateInstance.getMonth()}/${dateInstance.getDate()}`
}
definePageMeta({
  middleware: 'auth'
})
</script>