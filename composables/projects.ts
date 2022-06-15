import { parseUrl } from 'query-string';
import { useNuxtApp } from '#app';
import { useProjectsStore } from '~~/store/projects';


type TProjectRequestParams = {
  page?: string;
  keyword?: string;
  status?: number;
  priority?: number;
};

export const useProjects = () => {
  const projectStore = useProjectsStore();
  // const { $graphqlClient } = useNuxtApp();

  const init = () => {
    const _projects = localStorage.getItem('lottiProjects');

    if (_projects) {
      projectStore.initProjects(JSON.parse(_projects));
    } else {
      fetch();
    }
  };

  // const fetch = async () => {
  //   projectStore.loading = true;

  //   try {
  //     const { projects } = (
  //       await $graphqlClient.query({
  //         query: GET_ALL_PROJECTS_FULL,
  //       })
  //     ).data;

  //     if (projects) {
  //       projectStore.initProjects(projects);
  //       localStorage.setItem('lottiProjects', JSON.stringify(projects));
  //     }
  //   } catch (_error) {
  //     projectStore.error = _error;
  //   } finally {
  //     projectStore.loading = false;
  //   }
  // };

  const fetchAPI = async (
    _page: string,
    _keyword?: string,
    _status?: number,
    _priority?: number
  ) => {
    const { $apiClient } = useNuxtApp();
    //
    // const url = config.public.API_URL + '/projects'

    try {
      const params: TProjectRequestParams = {};

      if (_page && _page !== '') {
        const url = parseUrl(_page);
        params.page = url.query.page as string;
      }

      if (_keyword) {
        params.keyword = _keyword;
      }
      if (_status) {
        params.status = _status;
      }
      if (_priority) {
        params.priority = _priority;
      }

      projectStore.loading = true;

      let result;

      if (Object.keys(params).length > 0) {
        result = await $apiClient('get', '/projects', params);
      } else {
        result = await $apiClient('get', '/projects');
      }
      const { data, status } = result;

      if (status === 200) {
        projectStore.initProjects(data);
      }
    } catch (_error) {
      projectStore.error = _error;
    } finally {
      projectStore.loading = false;
    }
  };

  const fetchTrackingProjects = async () => {
    
    const { $makeRequest } = useNuxtApp();

    try {
      projectStore.loading = true;
      const result = await $makeRequest( 'get', '/api/projects/tracking')

      if (result.status) {
        projectStore.setTrackingProjects(result.tracking_projects)
      } 

    } catch (error) {
      
    } finally {
      projectStore.loading = false;
    }
   
  };

  const newProject = async (payload:any) => {
   const { $apiClient} = useNuxtApp()

    try {
      const result = await $apiClient( 'post', '/projects', payload)
      return result
    } catch (_error) {
      
    }
  };

  return {
    fetchAPI,
    init,
    fetchTrackingProjects,
    newProject
  };
};
