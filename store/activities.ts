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
      listing: [],
      message: []
    }
  },
  actions: {
    async fetchActivities () {

      if ( process.client) {
        this.loading = true;
        const auth = useAuthStore()
        const _token = auth.getAuthToken();
  
        const { isFetching, data } = await useFetch(`${this.$nuxt.$config.public.API_URL}/issues/working`, {
          headers: {
            'Authorization': `Bearer ${_token}`,
            'Accept': 'application/json'
          }
        }).json()
  
        if (data.value) {
          this.loading = isFetching.value
          this.listing = data.value.data
        }
        
      }
    }
  },

  getters: {
  
  }
})

