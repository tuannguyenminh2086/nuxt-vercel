import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      user {
        id
        name
        username
        email
        dob
        gitlab_id
        gitlab_token
        roles
        permissions
        enabled
        image_name
      }
      message
      roles
      permissions
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      status
      message
    }
  }
`
