import { ref } from 'vue'
import type { Ref } from 'vue'
import { useFetch } from '@vueuse/core';
import { useAuthStore } from '@store/auth';

export const useEvents = () => {

  const loading:Ref<boolean> = ref(false)
  const listing: Ref<any[]> = ref([])

  const auth = useAuthStore()
  const _token = auth.getAuthToken();
  const runtimeConfig = useRuntimeConfig()

  const fetchEvents = async () => {
    loading.value = true

    if (!_token) navigateTo('/login')
    
    const url = runtimeConfig.public.API_URL + '/notification/announcement'
    const resp = await useFetch( url, {
      headers: {
        'Authorization': `Bearer ${_token}`,
        'Accept': 'application/json'
      }
    }).json()
    
    if (resp) {
      if (resp.statusCode.value === 401 ) {
        navigateTo('/login')
      }
      
      if (resp.data.value) {
        listing.value = resp.data.value.announcements
      }

      loading.value = resp.isFetching.value
    }
    

  }


  return {
    loading,
    fetchEvents
  }
}
