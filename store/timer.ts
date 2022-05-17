import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'
import { useAuthStore } from '~~/store/auth';
// import moment from "moment";


interface ITask {
  name: string
  id?: string,
  issue_id: string
  created_by: number,
  spent: number
}

interface ITimer {
  isRunning: boolean
  seconds: number
  startedAt: any
  task: ITask
}

export const useTimerStore = defineStore({
  id: 'tracking',
  state: ():ITimer => {
    return {
      task: {
        name: '',
        issue_id: '',
        created_by: 0,
        spent: 0
      },
      isRunning: false,
      seconds: 0,
      startedAt: null
    }
  },
  actions: {
    async getCurrentTracking() {
      // if (process.client) {
        const auth = useAuthStore();
        const _token = auth.getAuthToken()

        const { data } = await useFetch(`${this.$nuxt.$config.public.API_URL}/activity/current-tracking`, {
          headers: {
            'Authorization': `Bearer ${_token}`,
            'Accept': 'application/json'
          }
        },{ 
          refetch: true
        }).json()

       
        if ( data.value && data.value.data ) {
          const _received = data.value.data
          this.task = { ..._received }
          this.isRunning = true
          this.startedAt = _received.start_time;
          return true
        }

        return false
      // }
    },

   async startTimer( tid:string, name: string ) {
      this.task.name = name
      this.task.issue_id = tid
      this.isRunning = true

      await this.submitTrackingActivity(tid, 'start');
    },

    async stopTimer (tid: string) {
      await this.submitTrackingActivity(tid, 'stop');
    },

    async submitTrackingActivity( tid:string, action:string, comment:string = "", isConfirmed:boolean = false) {
      if (process.client) {

        const requestBody = {
          type: 2,
          action: '',
          comment: "",
          confirm: isConfirmed
        }

        switch (action) {
          case 'start':
            requestBody.action = "start"
            break;
          case 'stop':
            requestBody.action = "stop"
            requestBody.comment = comment;
            break;
          case 'stopWithConfirm':
            requestBody.action = "stop"
            requestBody.comment = comment;
            break;
          default:
            return false;
        }

        const auth = useAuthStore();
        const _token = auth.getAuthToken()

        if (_token) {

          const headers = {
            'Authorization': `Bearer ${_token}`,
            'Accept': 'application/json'
          }

          try {
            const { data } = await useFetch(`${this.$nuxt.$config.public.API_URL}/issues/${tid}/tracking`, {
              headers
            }).post(requestBody).json()

            if (data.value) {
              const { message } = data.value
              alert (message[0])
            }

          } catch (_error) {
           
          }


        }

      }
    }
 
  },

  getters: {
    getCurrentTimer: (state) => state.task
  }
})

