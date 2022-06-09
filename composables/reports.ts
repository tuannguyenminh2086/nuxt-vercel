import { useFetch } from '@vueuse/core'
import dayjs from 'dayjs'
import { useAuthStore } from '@store/auth'

export const useReports = () => {

  const auth = useAuthStore()
  const _token = auth.getAuthToken()
  const config = useRuntimeConfig()

  const exportTimeTracking = async (start:string, end:string) => {

    const _start = dayjs(start).format('YYYY-MM-DD');
    const _end = dayjs(end).format('YYYY-MM-DD');

    const { data, response } = await useFetch(config.public.API_URL + '/reports/project-time-spent', {
        headers: {
          Authorization: `Bearer ${_token}`,
          Accept: 'application/json'
        }
      }).post({
        "startDate": _start,
        "endDate": _end
      }).blob()

    const responseHeader = response.value?.headers.get('Content-Disposition')

    if (typeof responseHeader !== 'undefined' && responseHeader && data) {
      const startFileNameIndex = responseHeader.indexOf('=') + 1
      const filename = `${_start}_${_end}_` + responseHeader.substring(startFileNameIndex, responseHeader.length)
      const reportData = data.value as Blob
      const fileURL = window.URL.createObjectURL(reportData)
      const fileLink = document.createElement('a')

      fileLink.href = fileURL
      fileLink.setAttribute('download', filename)
      document.body.appendChild(fileLink)
      fileLink.click()

      return true
    }

  }

  return {
    exportTimeTracking
  }

}