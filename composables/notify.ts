// import { ref } from 'vue'
// import type { Ref } from 'vue'
// import { useFetch } from '@vueuse/core';

export const useNotification = () => {
  const uid = () => Date.now()
  
  const sendNotification = (message:string, type: string, title:string = '') => {
    const { $notify } = useNuxtApp();
    const id = uid()

    $notify({
        id,
        type,
        title,
        text: message
    });

    setTimeout(()=> {
      $notify.close(id)
    },1000)

  }

  return {
    sendNotification
  }
}
