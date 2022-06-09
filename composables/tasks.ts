import { ref } from 'vue'
import type { Ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { useAuthStore } from '@store/auth'
import { useTimerStore } from '@/store/timer'

type TCreateIssue = {
  project_id: number,
  name: string
  description: string,
  assignee: number,
  status: number,
  priority: number,
  due_date: string
}

export const useTask = () => {
  const error: Ref<any> = ref(null)

  const auth = useAuthStore();
  const timerStore = useTimerStore();
  const _token = auth.getAuthToken()
  const config = useRuntimeConfig()
  

  const createTask = async (payload: TCreateIssue) => {

    if (payload.assignee === 0) {
      const _cuser = auth.getCurrentUser()
      payload.assignee = parseInt(_cuser!.id)
    }


    const resp = await useFetch(
      config.public.API_URL + '/issues',
      {
        headers: {
          Authorization: `Bearer ${_token}`,
          Accept: 'application/json',
        },
      }
    )
    .post({...payload})
    .json();

    return resp
  }

  const uploadImageForTask = async (formData:any) => {

    const { data }:any = await useFetch(
      config.public.API_URL + '/uploads/image',
      {
        headers: {
          Authorization: `Bearer ${_token}`,
          Accept: 'application/json',
        },
      }
    )
    .post(formData)
    .json();

    return data

  }

  const assigneeTo = async (issueID: string, assigneeID: string) => {
    const { data }= await useFetch(
      config.public.API_URL + '/issues/' + issueID + '/assign',
      {
        headers: {
          Authorization: `Bearer ${_token}`,
          Accept: 'application/json',
        },
      }
    )
    .post({
      "userId": assigneeID
    })
    .json();

    return data.value
  }

  const fetchTasksActivity = async () => {

    const { data } = await useFetch( config.public.API_URL + '/issues/working', 
    {
      headers: {
        'Authorization': `Bearer ${_token}`,
        'Accept': 'application/json'
      }
    }).json()

    return data

  }

  // timer
  const startTimer = async (tid:string, name:string, startAt: string) => {
    timerStore.startTimer(tid, name, startAt)
          
    const { data }:any = await useFetch(`${config.public.API_URL}/issues/${tid}/status`,
      {
        headers: {
          Authorization: `Bearer ${_token}`,
          Accept: 'application/json',
        }
      }
    )
    .put({
      status: 2
    })
    .json();

    return data
  }

  const stopTimer = (tid:string) => {
    timerStore.stopTimer(tid);
    timerStore.$reset();
  }

  const fetchTimer = async () => {
      const resp = await useFetch(  config.public.API_URL + '/activity/current-tracking', {
        headers: {
          'Authorization': `Bearer ${_token}`,
          'Accept': 'application/json'
        }
      }).json()

      if ( resp.data.value && resp.data.value.data ) {
          const _received = resp.data.value.data
          timerStore.setCurrentTracking(_received)
      }
  }


  return {
    error,
    createTask,
    uploadImageForTask,
    fetchTasksActivity,
    assigneeTo,
    startTimer,
    stopTimer,
    fetchTimer
  }

}

