import gql from 'graphql-tag'
// import { TimeTrackingFragments } from '../fragments'

export const GET_ISSUES_BY_STATUS = gql`
    query getIssues ($status: Int) {
        list_todo (status: $status) {
            id
            name,
            slug,
            state,
            status,
            assignees {
                username
                name
                image_path
            },
            project {
                id
                name
            }
            mapped_status {
                key
                name
            }
            mapped_priority
            current_user_spent,
            time_tracking {
                spent
                start_time
                end_time
            }
            created_at
        }
    }
`

export const GET_TASK_BY_ID = gql`
    query TaskByID($id: ID!)  {
        issue (id: $id) {
          id
          assignees {
            name
            id
            image_path
          }
          name
          description
          current_user_spent
          author_id
            created_at
            mapped_status {
            name
            key
          }
          state
          mapped_priority
          time_tracking {
            spent
            start_time
            end_time
            created_by
            updated_at
          }
          comments {
            id
            content
            created_at
          }
          project {
            name
            id
          }
          
        }
        
      }
`

export const GET_TASK_STATUS = gql`
  {
    issueStatus {
      name
      key
    }
  }
`
