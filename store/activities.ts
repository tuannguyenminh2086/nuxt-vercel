import { useFetch } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth';


interface IActivity {
  loading: boolean
  error: any
  listing: any[]
  message?: any[]
  working?: any
}

export const useActivitiesStore = defineStore({
  id: 'activities',
  state: (): IActivity => {
    return {
      loading: false,
      error: null,
      listing: [1],
      message: [2]
    }
  },
  actions: {
    async fetchActivities () {
      this.loading = true;
      const auth = useAuthStore()
      const _token = auth.getAuthToken();
    
      const { isFetching, data } = await useFetch('https://lottie-backend.absolutagentur.ch/api/issues/working', {
        headers: {
          'Authorization': `Bearer ${_token}`,
          'Accept': 'application/json'
        }
      }).json()

      if (data.value) {
        this.loading = isFetching.value
         // if empty 
         this.listing = data.value.data
         // not
      }
      
    }
  },

  getters: {
  
  }
})

