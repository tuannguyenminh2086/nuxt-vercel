
export interface IUser {
  name: string,
  image_path: string | null,
  avatar?: string,
  pivot?: any
}

export interface IStatus {
  name: string
}

export type Paging = {
  current_page: number
  last_page: number
}

export interface IIssues {
  id: string,
  name: string
  state: number
  description: string
  assignees: IUser[]
  created_at: string
  time_tracking?: any
  mapped_status?: IStatus
  mapped_priority?: string
}


export interface IProject {
  client?: string | null
  created_at?: string | null
  description?: string
  id: string
  issues: IIssues[]
  mapped_priority: string
  mapped_status?: IStatus
  name: string
  state: number
  status: string
  total_active_issue: number
  total_issue: number
  total_spent?: number
  issues_count?: number
  updated_at: string
  has_repo?: number
  leader: IUser
  projectType?: {
    name: string
  }
  issue_paging: Paging
}

