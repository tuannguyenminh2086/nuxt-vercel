import { ref } from 'vue'
import { GET_ALL_USER } from '~~/graphql/queries/userQuery';
// import { useAuthStore } from '@store/auth';

export const useMembers = async () => {

  const { $graphqlClient} = useNuxtApp()
  const users = ref(null)
  
  try {
    const resp = await $graphqlClient.query({
      query: GET_ALL_USER
    });

    if ( resp && resp.data.users) {
      users.value = resp.data.users
    }
    

  } catch (_error) {
    
  }

  return users
}

