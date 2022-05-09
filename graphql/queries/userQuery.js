import gql from "graphql-tag";

export const GET_CURRENT_USER = gql`
    query {
        me {
            id
            name
            username
            email
            dob
            roles
            permissions
            enabled
            image_name
            image_path
        }
    }
`

export const GET_ALL_USER = gql`
    query {
        users {
            id
            name
            username
            gitlab_id
            email
            dob
            gitlab_token
            enabled
            image_name
            image_path
        }
    }
`

export const GET_ALL_ROLES = gql`
    query {
        roles {
            name
        }
    }
`
