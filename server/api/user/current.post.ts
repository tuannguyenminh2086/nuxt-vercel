import { CompatibilityEvent, useCookie } from 'h3'
import { GET_CURRENT_USER } from '~/graphql/queries/userQuery'
import graphqlClient from '~/apollo/lottie-be-client'
import { responseError, responseSuccess } from '~/helpers/apiProcess'
//
export default defineEventHandler(async (event: CompatibilityEvent) => {
  const token = useCookie(event, 'authorize');
  if (token === undefined) {
    await responseError(event,'Not Authorized',401);
  }
  try{
    const {
      data: { me },
    } = await graphqlClient.mutate({
      mutation: GET_CURRENT_USER,
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    if(me){
      await responseSuccess(event, { status: true,me });
    }
  }catch (e) {
    await responseError(event,'Not Authorized',401);
  }


});
