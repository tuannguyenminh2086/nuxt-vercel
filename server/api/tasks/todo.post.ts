import { CompatibilityEvent, useBody, useCookie } from 'h3'
import { responseError, responseSuccess } from '~/helpers/apiProcess'
import { apiClient, parseGraphQL } from '~/apollo/apiClient'
import { GET_ISSUES_BY_STATUS } from '~/graphql/queries/tasksQuery'
//
export default defineEventHandler(async (event: CompatibilityEvent) => {
  const token = useCookie(event, 'authorize');
  const body = await useBody(event);
  const query = parseGraphQL(GET_ISSUES_BY_STATUS);
  const {
    data: {
      data ,
    },
  } = await apiClient(
    {
      query,
      variables: body,
    },
    token
  );
  try {
    const listTodo = data.list_todo;
    
    if (listTodo) {
      await responseSuccess(event, { status: true, listTodo });
    }
  } catch (e) {
    await responseError(event, 'Not Authorized', 401);
  }
  await responseError(event, 'Not Authorized', 404);
});
