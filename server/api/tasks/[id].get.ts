import { CompatibilityEvent, useCookie } from 'h3'
import { responseError, responseSuccess } from '~/helpers/apiProcess'
import { apiClient, parseGraphQL } from '~/apollo/apiClient'
import { GET_TASK_BY_ID } from '~/graphql/queries/tasksQuery'
//
export default defineEventHandler(async (event: CompatibilityEvent) => {
  const token = useCookie(event, 'authorize');
  const {
    context: { params: id },
  } = event;
  const query = parseGraphQL(GET_TASK_BY_ID);
  const {
    data: {
      data: { issue },
    },
  } = await apiClient(
    {
      query,
      variables: id,
    },
    token
  );
  try {
    if (issue) {
      await responseSuccess(event, { status: true, issue });
    }
  } catch (e) {
    await responseError(event, 'Not Authorized', 401);
  }
});
