import { useNuxtApp } from '#app';
import { useProjectStore } from '~~/store/projects';
import {
  GET_ALL_PROJECTS_FULL,
  GET_CURRENT_PROJECT,
} from '~~/graphql/queries/projectQuery';

type TProjectRequestParams = {
  keyword?: string;
  status?: number;
  priority?: number;
};

export const useProjects = () => {
  const projectStore = useProjectStore();
  const { $graphqlClient } = useNuxtApp();

  const init = () => {
    const _projects = localStorage.getItem('lottiProjects');

    if (_projects) {
      projectStore.initProjects(JSON.parse(_projects));
    } else {
      fetch();
    }
  };

  const fetch = async () => {
    projectStore.loading = true;

    try {
      const { projects } = (
        await $graphqlClient.query({
          query: GET_ALL_PROJECTS_FULL,
        })
      ).data;

      if (projects) {
        projectStore.initProjects(projects);
        localStorage.setItem('lottiProjects', JSON.stringify(projects));
      }
    } catch (_error) {
      projectStore.error = _error;
    } finally {
      projectStore.loading = false;
    }
  };

  const fetchAPI = async (
    _keyword?: string,
    _status?: number,
    _priority?: number
  ) => {
    const { $apiClient } = useNuxtApp();
    //
    // const url = config.public.API_URL + '/projects'

    try {
      const params: TProjectRequestParams = {};
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

  const fetchProjectWorking = async () => {
    projectStore.loading = true;
    let res: any = [];

    try {
      const data = await $graphqlClient.query({
        query: GET_CURRENT_PROJECT,
      });

      if (data && data.data.tracking_projects) {
        res = data.data.tracking_projects;
      }
    } catch (_error) {
      // projectStore.error = _error
    } finally {
      // projectStore.loading = false
    }

    return res;
  };

  return {
    fetch,
    fetchAPI,
    init,
    fetchProjectWorking,
  };
};
