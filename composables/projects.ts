import { useFetch } from '@vueuse/core';
import { useProjectStore } from '~~/store/projects';
import { GET_ALL_PROJECTS_FULL } from '~~/graphql/queries/projectQuery'
import { useAuthStore } from '@store/auth';

export const useProjects = () => {
  const projectStore = useProjectStore()
  const { $graphqlClient} = useNuxtApp()

  const auth = useAuthStore()
  const _token = auth.getAuthToken();
  const runtimeConfig = useRuntimeConfig()

  const init = () => {
    
    const _projects = localStorage.getItem('lottiProjects')

    if (_projects) {
      projectStore.initProjects(JSON.parse(_projects))
    } else {
      fetch()
    }
  }

  const fetch = async () => {
    projectStore.loading = true
    
    try {
      const { projects } = ( await $graphqlClient.query({
        query: GET_ALL_PROJECTS_FULL
      })).data;

      if (projects) {
        projectStore.initProjects(projects)
        localStorage.setItem('lottiProjects', JSON.stringify(projects))
      }

    } catch (_error) {
      projectStore.error = _error
    } finally {
      projectStore.loading = false
    }
  }


  const fethAPI = async () => {

    try {
      if (_token) {
        const url = runtimeConfig.public.API_URL + '/projects'
        await useFetch( url, {
          headers: {
            'Authorization': `Bearer ${_token}`,
            'Accept': 'application/json'
          }
        }).json()
      }


    } catch (error) {
      projectStore.error = error
    }
  }


  return {
    fetch,
    fethAPI,
    init
  }
}
