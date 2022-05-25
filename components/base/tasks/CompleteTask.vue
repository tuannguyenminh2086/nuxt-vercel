<template>
  <button
    class="button rounded btn bg-indigo-500 px-4 py-2 hover:bg-indigo-600 text-white flex items-center ml-2"

    @click.prevent.stop="completeHandle"
  >
    <span class="mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9L13 24z"/></svg>
    </span>
    <span>Mark complete</span>
  </button>
</template>

<script setup lang="ts">
  import { useFetch } from '@vueuse/core';
  import { useAuthStore } from '@/store/auth'

  interface IProps {
    id: string
  }

  const props = defineProps<IProps>()
  const auth = useAuthStore()

  const completeHandle = async () => {
    const _token = auth.getAuthToken();

    if (_token) {
      const runtimeConfig = useRuntimeConfig()
      const url = runtimeConfig.public.API_URL + '/issues/' + props.id + '/close'
      const _headers = {
        Authorization: `Bearer ${_token}`,
        Accept: 'application/json'
      };

      const resp = await useFetch( url, {
          headers: _headers
        }).post().json()

      console.log(resp);
      
    }
    
  }
</script> 