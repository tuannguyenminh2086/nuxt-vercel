import { ref } from 'vue'
// import { useAuthStore } from '@store/auth';

export const useMembers = async () => {

  const { $makeRequest} = useNuxtApp()
  const users = ref(null)
  
  try {
    const resp = await $makeRequest('get','/api/members/list');
    if ( resp.status && resp.users) {
      users.value = resp.users
    }
    

  } catch (_error) {
    
  }

  return users
}

