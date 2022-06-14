import { defineStore } from 'pinia'
import { IIssues, IProject } from '../models/interfaces'

interface IProjectState {
  project: IProject | null
  filteredTasks: IIssues[]
  loading: boolean
  error: any
  sort: '',
  tracked: number,
  pagination: {
    current: number
    last: number
  }
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
      sort: '',
      pagination: {
        current: 1,
        last: 1
      }
    }
  },
  actions: {
    init ( project: IProject ) {
      this.project = {...project}
      this.filteredTasks = useOrderBy(project.issues, 'created_at','desc'); 
      this.tracked = this.setTracked(project.issues)
      this.pagination.current = project.issue_paging.current_page
      this.pagination.last =  project.issue_paging.last_page
    },
    setTracked (issues: IIssues[]) {      
      // currently it's wrong for now. due to pagination
      const _tracked = issues.reduce((allIssues, issue) => {

        if ( issue.time_tracking.length < 1) return allIssues;

        const sum = issue.time_tracking.reduce((total:number, record:any) => {
          return total + record.spent
        },0)

        return allIssues + sum
      },0)
      return _tracked
    },
    setPaginationView (issues: IIssues[], issuePaging: any) {
      this.filteredTasks = useOrderBy(issues, 'created_at','desc'); 
      this.pagination.current = issuePaging.current_page
      this.pagination.last = issuePaging.last_page
    }


  }, 

  getters: {}
})


