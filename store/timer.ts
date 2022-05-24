import { defineStore } from 'pinia'
import { useFetch } from '@vueuse/core'
import { useAuthStore } from '~~/store/auth';

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
   
    setCurrentTracking (payload: any) {
      
      if ( payload ) {
        this.task = { ...payload }
        this.isRunning = true
        this.startedAt = payload.start_time;
      }
     
    },

    async startTimer( tid:string, name: string ) {
      this.task.name = name
      this.task.issue_id = tid
      this.isRunning = true

      await this.submitTrackingActivity(tid, 'start');
    },

    async stopTimer (tid: string) {
      await this.submitTrackingActivity(tid, 'stop');
      localStorage.removeItem('lotti-timer')
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

