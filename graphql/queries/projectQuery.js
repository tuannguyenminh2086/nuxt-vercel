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

export const GET_CURRENT_PROJECT = gql`
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
        }
        issues {
            name
            assignees {
                id
                name
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
              }
            }
          }
  }
`

