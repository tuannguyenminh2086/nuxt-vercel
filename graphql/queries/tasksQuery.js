import gql from 'graphql-tag'

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