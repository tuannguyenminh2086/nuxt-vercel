import gql from 'graphql-tag'

export const GET_ALL_PROJECTS_FULL = gql`
query {
    projects {
      name
      id
      mapped_status {
        name
      }
      mapped_priority
      client {
        name
      }
      total_spent
      issues {
        name
      }
      state
      status
      created_at
      updated_at
      leader {
        name
        image_path
        avatar
      }
    }
}
`

export const GET_ALL_PROJECTS_SHORT = gql`
query {
    projects {
      name
      id
    }
}
`

export const GET_TRACKING_PROJECTS = gql`
query {
    tracking_projects {
        id
        name
        total_spent
        mapped_priority
        mapped_status{
            name
        }
        projectType {
        name
        }
        client {
            name
            email
        }
        users {
            name
            id
        }
        slug
        path
        status
        state
        leader {
          name
          image_path
          avatar
        }
        issues {
            name
            assignees {
                id
                name
                avatar
            }
        }
  }
}
`

export const GET_PROJECT_DETAIL = gql`
    query ProjectByID($id: ID!)  {
        project (id: $id) {
            name
            projectType{
              name
            }
            mapped_status {
              name
            }
            mapped_priority
            members {
              name
              image_path
              id
              email
              username
            }
            created_at
            client {
              name
            },
            leader {
              name
            }
            total_issue
            total_active_issue
            issues {
              id,
              name,
              author_id
              created_at
              state
              time_tracking {
                spent
              }
              assignees {
                name
                image_path
                id
                avatar
              }
            }
          }
  }
`

