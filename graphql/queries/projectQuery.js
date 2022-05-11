import gql from 'graphql-tag'

export const GET_PROJECT_BY_ID = gql`
    query getProjectById($path: ID!, $startDate: Time, $endDate: Time) {
        project(fullPath: $path) {
            id
            issues(createdAfter: $startDate, createdBefore: $endDate) {
                nodes {
                    iid
                    state
                    title
                    description
                    totalTimeSpent
                    timeEstimate
                    createdAt
                    updatedAt
                    dueDate
                    webUrl
                    labels {
                        nodes {
                            color
                            title
                        }
                    }
                    milestone {
                        id
                        title
                        description
                        dueDate
                        startDate
                    }
                    assignees {
                        nodes {
                            name
                        }
                    }
                }
            }
        }
    }
`

export const GET_ALL_PROJECTS_FULL = gql`
query {
    projects {
      name
      id
      project_id
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
      members {
        name
        image_path
        image_name
        id
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
        members {
            id
            name
            avatar
            pivot {
                is_leader
            }
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

