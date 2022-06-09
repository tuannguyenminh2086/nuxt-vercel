import { CompatibilityEvent, defineEventHandler, setCookie, useBody } from 'h3';
// import graphqlClient from '@graphql/lottie-be-client';
import { LOGIN_MUTATION } from '~/graphql/mutations/authMutation';
import { responseError, responseSuccess } from '~/helpers/apiProcess';
import { apiClient, parseGraphQL } from '~/apollo/apiClient'

const loginApi = async (event: CompatibilityEvent) => {
  const body = await useBody(event);
  const query = parseGraphQL(LOGIN_MUTATION);
  const result =  await apiClient({
    query,
    variables: body,
  });
  const {login} = result.data.data;
  if (login.token) {
    setCookie(event, 'authorize', login.token, {
      httpOnly: true,
      path: '/',
    });
    await responseSuccess(event, {
      status: true,
      loginData: login,
      message: login.message,
    });
  }
  await responseError(event, login.message, 404);
};
export default defineEventHandler((event) => loginApi(event));
