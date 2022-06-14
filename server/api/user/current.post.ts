import { CompatibilityEvent, useBody, useCookie } from 'h3'
import { GET_CURRENT_USER } from '~/graphql/queries/userQuery'
import { responseError, responseSuccess } from '~/helpers/apiProcess'
import { apiClient, parseGraphQL } from '~/apollo/apiClient'
//
export default defineEventHandler(async (event: CompatibilityEvent) => {
  const token = useCookie(event, 'authorize');

  const body = await useBody(event);
  const query = parseGraphQL(GET_CURRENT_USER);
  const {data:{data:{me}}} =  await apiClient({
    query,
    variables: body,
  },token);
  try{
    if(me){
      await responseSuccess(event, { status: true,me });
    }
  }catch (e) {
    await responseError(event,'Not Authorized',401);
  }


});
