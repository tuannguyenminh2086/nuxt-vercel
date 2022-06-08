
export interface IUser {
  name: string,
  image_path: string | null,
  avatar?: string,
  pivot?: any
}


export interface IIssues {
  id: string,
  name: string
  state: number
  assignees: IUser[]
  created_at: string
  time_tracking?: any
}

export interface IStatus {
  name: string
}


export interface IProject {
  client?: string | null
  created_at?: string | null
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
  leader: IUser
}

