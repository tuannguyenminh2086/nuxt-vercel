import { ref } from 'vue'
import type { Ref } from 'vue'
import { useNuxtApp } from '#app'
import { useFetch } from '@vueuse/core'
import { useAuthStore } from '@store/auth'
import { useTimerStore } from '@/store/timer'
const { sendNotification } = useNotification()

type TCreateIssue = {
  project_id: number,
  name: string
  description: string,
  assignee: number,
  status: number,
  priority: number,
  due_date: string
}

type TUpdateIssue = {
  name: string,
  description: string,
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


  const updateTask = async (issueId: number, payload: TUpdateIssue) => {

    const resp = await useFetch(
      config.public.API_URL + '/issues/' + issueId,
      {
        headers: {
          Authorization: `Bearer ${_token}`,
          Accept: 'application/json',
        },
      }
    )
    .put({...payload})
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

  const changeTaskStatus = async (taskID: string, taskStatus: number) => {
    const auth = useAuthStore()
    const _token = auth.getAuthToken();
    const nuxtApp = useNuxtApp();

    if (_token) {
      const _headers = {
        Authorization: `Bearer ${_token}`,
        Accept: 'application/json'
      };

      const runtimeConfig = useRuntimeConfig()
      const url = runtimeConfig.public.API_URL + '/issues/' + taskID + '/status'

      const resp = await useFetch( url, {
        headers: _headers
      } ).put({
        status: taskStatus
      }).json()

      if (resp) {
        const { statusCode } = resp
        if (statusCode.value === 200) {
          if (process.client) {
            nuxtApp.$bus.$emit('refetch-issue')
            sendNotification('Successfully updated!', 'success', 'Update Status' )
          }
        }
      }
    }
  }

  return {
    error,
    createTask,
    updateTask,
    uploadImageForTask,
    fetchTasksActivity,
    assigneeTo,
    startTimer,
    stopTimer,
    fetchTimer,
    changeTaskStatus
  }

}
