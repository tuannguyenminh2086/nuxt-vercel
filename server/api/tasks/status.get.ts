import { CompatibilityEvent, useCookie } from 'h3'
import { responseError, responseSuccess } from '~/helpers/apiProcess'
import { apiClient, parseGraphQL } from '~/apollo/apiClient'
import { GET_TASK_STATUS } from '~/graphql/queries/tasksQuery'
//
export default defineEventHandler(async (event: CompatibilityEvent) => {
  const token = useCookie(event, 'authorize');
  const query = parseGraphQL(GET_TASK_STATUS);
  const {
    data: {
      data: { issueStatus },
    },
  } = await apiClient(
    {
      query,
    },
    token
  );
  try {
    if (issueStatus) {
      await responseSuccess(event, { status: true, issueStatus });
    }
  } catch (e) {
    await responseError(event, 'Not Authorized', 401);
  }
});
