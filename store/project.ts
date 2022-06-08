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
      this.filteredTasks = useOrderBy(project.issues, 'id','desc'); 

      this.tracked = this.setTracked(project.issues)

    },
    filterBy () {},
    setTracked (issues: IIssues[]) {      
      const _tracked = issues.reduce((allIssues, issue) => {

        if ( issue.time_tracking.length < 1) return allIssues;

        const sum = issue.time_tracking.reduce((total:number, record:any) => {
          return total + record.spent
        },0)

        return allIssues + sum
      },0)
      return _tracked
    }
  }, 

  getters: {}
})


