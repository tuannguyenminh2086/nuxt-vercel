import { useFetch } from '@vueuse/core';

import { useProjectStore } from '~~/store/projects';
import { GET_ALL_PROJECTS_FULL, GET_CURRENT_PROJECT } from '~~/graphql/queries/projectQuery'
import { useAuthStore } from '@store/auth';



export const useProjects = () => {
  const projectStore = useProjectStore()
  const { $graphqlClient } = useNuxtApp()
  const auth = useAuthStore()
  const _token = auth.getAuthToken();
  const config = useRuntimeConfig()

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


  const fetchAPI = async (_url:string) => {
    const url = _url !=='' ? _url : config.public.API_URL + '/projects'

    try {
        
        projectStore.loading = true

        const { data, statusCode } = await useFetch( url, {
          headers: {
            'Authorization': `Bearer ${_token}`,
            'Accept': 'application/json'
          }
        }).json()

        if ( statusCode.value === 200 ) {
          
          projectStore.initProjects(data.value)

        }
       

    } catch (_error) {
      projectStore.error = _error
    } finally {
      projectStore.loading = false
    }
  }

  const fetchProjectWorking = async () => {
    projectStore.loading = true
    const res:any = []
    
    try {
      const data = await $graphqlClient.query({
        query: GET_CURRENT_PROJECT
      });

      if (data && data.data.tracking_projects) {
        return data.data.tracking_projects
      }

    
    } catch (_error) {
      // projectStore.error = _error
    } finally {
      projectStore.loading = false
    }

    return res;
    
  }


  return {
    fetch,
    fetchAPI,
    init,
    fetchProjectWorking
  }
}
