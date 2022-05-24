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

    const url = runtimeConfig.public.API_URL + '/notification/announcement'
    const { isFetching, data } = await useFetch( url, {
      headers: {
        'Authorization': `Bearer ${_token}`,
        'Accept': 'application/json'
      }
    }).json()

    if (data.value) {
      listing.value = data.value.announcements
    }

    loading.value = isFetching.value

  }


  return {
    loading,
    fetchEvents
  }
}
