import { ref } from 'vue'
import type { Ref } from 'vue'
import { useFetch } from '@vueuse/core'
import { useAuthStore } from '@store/auth'

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
  const _token = auth.getAuthToken()
  const config = useRuntimeConfig()

  const createTask = async (payload: TCreateIssue) => {

    if (payload.assignee === 0) {
      const _cuser = auth.getCurrentUser()
      payload.assignee = parseInt(_cuser!.id)
    }


    const resp = await useFetch(
      config.apiURL + '/issues',
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
      `${config.apiURL}/uploads/image`,
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

  return {
    error,
    createTask,
    uploadImageForTask
  }

}