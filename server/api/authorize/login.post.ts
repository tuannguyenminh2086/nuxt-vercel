import { CompatibilityEvent, defineEventHandler, setCookie, useBody } from 'h3';
import graphqlClient from '@graphql/lottie-be-client';
import { LOGIN_MUTATION } from '~/graphql/mutations/authMutation';
import { responseError, responseSuccess } from '~/helpers/apiProcess';

const loginApi = async (event: CompatibilityEvent) => {
  const body = await useBody(event);
  const { login } = (
    await graphqlClient.mutate({
      mutation: LOGIN_MUTATION,
      variables: body,
    })
  ).data;
  if (login.token) {
    setCookie(event, 'authorize', login.token);
    await responseSuccess(event, {
      status: true,
      loginData: login,
      message: login.message,
    });
  }
  await responseError(event, login.message, 404);
};
export default defineEventHandler((event) => loginApi(event));
