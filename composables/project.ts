import { useProjectStore } from '~~/store/project';
import { GET_PROJECT_DETAIL } from '~~/graphql/queries/projectQuery';

export const useProject = () => {

  const projectStore = useProjectStore()
  const { $graphqlClient} = useNuxtApp()

  const fetch = async (pid:string) => {
    projectStore.loading = true
    
    try {
      const { data: { project }, loading } = await $graphqlClient.query({
        query: GET_PROJECT_DETAIL,
        variables: {
          id: pid
        }
      });

      if (project) {
        projectStore.init(project)
        projectStore.loading = loading
      }

    } catch (_error) {
      projectStore.error = _error
    } finally {
      projectStore.loading = false
    }
  }


  return {
    fetch
  }
}
