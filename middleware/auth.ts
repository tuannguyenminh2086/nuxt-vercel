import { useAuthStore } from "~~/store/auth";

export default function() {
  const store = useAuthStore()
  const isAuthenticated = store.getAuth
  if (!isAuthenticated) {
    return navigateTo('/login')
  }
}