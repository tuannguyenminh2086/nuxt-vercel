import { defineStore } from 'pinia'
import { IIssues, IProject } from '../models/interfaces'

interface IProjectState {
  project: IProject | null
  filteredTasks: IIssues[]
  loading: boolean
  error: any
  sort: '',
  tracked: number
}

export const useProjectStore = defineStore({
  id: 'project-detail',
  state: (): IProjectState => {
    return {
      project: null,
      filteredTasks: [],
      loading: false,
      error: '',
      tracked: 0,
      sort: ''
    }
  },
  actions: {
    init ( project: IProject ) {
      this.project = {...project}
      this.filteredTasks = project.issues
    },
    filterBy () {

    }
  }, 

  getters: {}
})


