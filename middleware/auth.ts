import { useAuthStore } from "~~/store/auth";

export default async function() {

  if (process.client) {
  const authStore = useAuthStore()
  const _token = authStore.getAuthToken()

    if (!_token) {
      return navigateTo('/login')
    } else {
      await authStore.setCurrentUser()
      authStore.setAuthToken()
    }
  }
}


