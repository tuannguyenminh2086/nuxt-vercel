
import { useProjectStore } from '~~/store/project';

export const useProject = () => {
  const projectStore = useProjectStore();
  const { $makeRequest } = useNuxtApp();

  const fetch = async (pid: string) => {
    projectStore.loading = true;

    try {
      const { project } = await $makeRequest(
          'get', 
          `/api/projects/${pid}`,
          {
            pageNumber: 1
          }
        );

      if (project) {
        projectStore.init(project);
        projectStore.loading = false;
      }
    } catch (_error) {
      projectStore.error = _error;
    } finally {
      projectStore.loading = false;
    }
  };

  const gotoPage = async (pid: string, page:number) => {
    try {
      const { project } = await $makeRequest(
          'get', 
          `/api/projects/${pid}`,
          {
            pageNumber: page
          }
        );

      if (project) {
        projectStore.setPaginationView(project.issues, project.issue_paging)
      }
    } catch (_error) {
      projectStore.error = _error;
    } finally {
      projectStore.loading = false;
    }
  }

  const filterIssues = async (pid: string, _filter:any) => {
    try {
      const { project } = await $makeRequest(
          'get', 
          `/api/projects/${pid}`,
          {
            filter: JSON.stringify(_filter)
          }
        );

      if (project) {
        projectStore.setPaginationView(project.issues, project.issue_paging)
      }
    } catch (_error) {
      projectStore.error = _error;
    } finally {
      projectStore.loading = false;
    }
  }

  return {
    fetch,
    gotoPage,
    filterIssues
  };
};
