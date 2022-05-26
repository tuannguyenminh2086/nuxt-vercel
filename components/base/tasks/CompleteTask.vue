<template>
  <div>
    <button
      class="button rounded btn bg-indigo-500 px-4 py-2 hover:bg-indigo-600 text-white flex items-center ml-2 disabled:bg-slate-200"
      :disabled="disabled"
      @click.prevent.stop="completeHandle"
    >
      <span class="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9L13 24z"/></svg>
      </span>
      <span>Mark complete</span>
    </button>

  </div>
</template>

<script setup lang="ts">
  import { useFetch } from '@vueuse/core';
  import { useAuthStore } from '@/store/auth';

  interface IProps {
    id: string
    disabled: boolean
  }

  const props = defineProps<IProps>()
  const auth = useAuthStore()
  const nuxtApp = useNuxtApp();

  const completeHandle = async () => {
    const _token = auth.getAuthToken();

    if (_token) {
      const runtimeConfig = useRuntimeConfig()
      const url = runtimeConfig.public.API_URL + '/issues/' + props.id + '/close'
      const _headers = {
        Authorization: `Bearer ${_token}`,
        Accept: 'application/json'
      };

      const cuser = auth.getCurrentUser();

      const _comment = 'Task is closed at ' + cuser?.name + ' - ' + new Date() + '';

      const resp = await useFetch( url, {
          headers: _headers
        }).post({
          comment: _comment
        }).json()


      if ( resp.statusCode.value === 200) {
          nuxtApp.$bus.$emit('refetch-issue')
          nuxtApp.$notification({
            type: 'success',
            title: 'Success',
            text: resp.data.value.message.message
          })
      }
    
    }
    
  }
</script> 
