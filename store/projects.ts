
import { defineStore } from 'pinia'
import { GET_ALL_PROJECTS_FULL } from '~~/graphql/queries/projectQuery'
import cmsClient from '~~/apollo/cmsClient';

interface IIssues {
  name: string
}

interface IStatus {
  name: string
}

interface IUser {
  name: string,
  image_path: string | null
}

interface IProject {
  client?: string | null;
  created_at?: string | null;
  id: string;
  issues: IIssues[];
  mapped_priority: string;
  mapped_status?: IStatus;
  name: string;
  state: number;
  status: string;
  total_spent: number;
  updated_at: string;
  leader: IUser
}

interface IProjectsState {
  list: IProject[],
  filteredList: IProject[],
  loading: boolean,
  error: any,
  sort: ''
}

export const useProjectStore = defineStore({
  id: 'projects',
  state: (): IProjectsState => {
    return {
      list: [],
      filteredList: [],
      loading: false,
      error: '',
      sort: ''
    }
  },
  actions: {
    async fetchAllProjects () {
      try {
        // const { $graphqlClient } = this.$nuxt.config.globalProperties;

        this.loading = true
        const { projects } = (await cmsClient.query({
          query: GET_ALL_PROJECTS_FULL
        })).data;

        if (projects) {
          this.list = useOrderBy(projects, 'name','asc');
          this.filteredList = this.list
        }

      } catch (_error) {
        this.error = _error
      } finally {
        this.loading = false
      }
    },

    initProjects ( projects: IProject[] ) {
      this.list = useOrderBy(projects, 'name','asc');
      this.filteredList = projects
    },

    searchProject (keyword:string) {
      if (keyword === '') {
        this.filteredList = this.list
      } else {
        this.filteredList = this.list.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()))
      }
    },

  },

  getters: {
  
  }
})

