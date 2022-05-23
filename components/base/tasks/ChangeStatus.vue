<template>
  <div v-if="status" class="px-4">
    <select
      class="mr-2 outline-none font-bold border border-slate-200 py-2 px-4 rounded " 
      v-model="selected"
      :disabled="isProgress"
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
      @click.prevent="handleChangeStatus"
      :disabled="isProgress"
    >
      Change Status
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { useFetch } from '@vueuse/core';
  import { GET_TASK_STATUS } from '~~/graphql/queries/tasksQuery';
  import cmsClient from '~~/apollo/cmsClient';

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
  const nuxtApp = useNuxtApp();

  const fetch = async () => {
    const { data } = await cmsClient.query({
      query: GET_TASK_STATUS
    });

    if (data) {
      listing.value = data.issueStatus
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
         
          const { statusCode, data } = resp
          if (statusCode.value === 200) {
            if (process.client) {
                nuxtApp.$bus.$emit('refetch-issue')
                nuxtApp.$notification({
                  type: 'success',
                  title: 'Success',
                  text: data.value.message ?  data.value.message.message : ''
                })
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


