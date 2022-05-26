import { useProjectStore } from '~~/store/projects';
import { GET_ALL_PROJECTS_FULL } from '~~/graphql/queries/projectQuery'


export const useProjects = () => {
  const projectStore = useProjectStore()
  const { $graphqlClient} = useNuxtApp()

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


  return {
    fetch,
    init
  }
}
