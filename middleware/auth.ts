import { useAuthStore } from "~~/store/auth";

export default function() {

  if (process.client) {
  const authStore = useAuthStore()
  const _token = authStore.getAuthToken()

    if (!_token) {
      return navigateTo('/login')
    }
  }
}


