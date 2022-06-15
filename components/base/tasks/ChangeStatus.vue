<template>
  <div v-if="status" class="">
    <select
      v-model="selected"
      :disabled="isProgress"
      class="mr-2 outline-none font-bold border border-slate-200 py-2 px-4 rounded mb-2 lg:mb-0" 
    >
      <option value="">Choose a Status</option>
      <option 
        v-for="item in listing"
        :key="item.key"
        :value="item.key"
      >
        {{ item.name }}
      </option>

    </select>

    <button
      class="text-white bg-green-500 rounded px-4 py-2 hover:bg-green-600"
      :disabled="isProgress"
      @click.prevent="handleChangeStatus"
    >
      Change Status
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'

import { useNuxtApp } from '#app'
import { useAuthStore } from '@/store/auth'


interface IStatus {
    name: string,
    key: string
  }

  interface IProps {
    id: string
    status: string
  }

  const props = defineProps<IProps>()

  const listing: Ref<IStatus[] | null> = ref([])
  const selected: Ref<string> = ref('')
  const auth = useAuthStore()
  const isProgress: Ref<boolean> = ref(false)
  const {$makeRequest} = useNuxtApp()
  const { sendNotification } = useNotification()

  const fetch = async () => {
    const { status,issueStatus } = await $makeRequest('get',
      '/api/tasks/status'
     );

    if (status) {
      listing.value = issueStatus
      init()
    }
  }

  const init = () => {
    const res = listing.value?.filter( item => item.name.toLowerCase() === props.status)

    if (res && res.length > 0) {
      selected.value = res.shift()!.key.toString()
    }
  }

  const handleChangeStatus = async () => {
    const _token = auth.getAuthToken();
    const nuxtApp = useNuxtApp();

    if (_token) {
       isProgress.value = true

       	const _headers = {
					Authorization: `Bearer ${_token}`,
					Accept: 'application/json'
				};

        const runtimeConfig = useRuntimeConfig()
        const url = runtimeConfig.public.API_URL + '/issues/' + props.id + '/status'

        const resp = await useFetch( url, {
          headers: _headers
        } ).put({
          status: selected.value
        }).json()

        if (resp) {
         
          const { statusCode } = resp
          if (statusCode.value === 200) {
            if (process.client) {
                nuxtApp.$bus.$emit('refetch-issue')
                sendNotification('Successfully updated!', 'success', 'Update Status' )
            }
            
          }

          isProgress.value = false
        }
      
    }
  }

  onMounted(() => {
    fetch()
  })

</script>


