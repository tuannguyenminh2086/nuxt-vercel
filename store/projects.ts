
import { defineStore } from 'pinia'

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

  getters: {}
})

