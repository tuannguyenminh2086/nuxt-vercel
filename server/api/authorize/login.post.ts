import { useBody } from 'h3'
import graphqlClient from '@graphql/lottie-be-client'
import { LOGIN_MUTATION } from '~/graphql/mutations/authMutation'

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const { login } = (await graphqlClient.mutate({
      mutation: LOGIN_MUTATION,
      variables: body
    })
  ).data
  if (login.token) {
    return {
      status: true,
      loginData: login,
      message: login.message
    }
  }
  return {
    status: false,
    message: login.message
  }
})