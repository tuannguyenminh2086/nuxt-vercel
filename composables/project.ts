import { useProjectStore } from '~~/store/project';

export const useProject = () => {
  const projectStore = useProjectStore();
  const { $makeRequest } = useNuxtApp();

  const fetch = async (pid: string) => {
    projectStore.loading = true;

    try {
      const { project } = await $makeRequest('get', `/api/projects/${pid}`);
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

  return {
    fetch,
  };
};
