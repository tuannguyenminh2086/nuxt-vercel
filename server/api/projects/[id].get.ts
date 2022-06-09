import { CompatibilityEvent, useCookie } from 'h3'
import { GET_PROJECT_DETAIL } from '~~/graphql/queries/projectQuery'
import { responseError, responseSuccess } from '~/helpers/apiProcess'
import { apiClient, parseGraphQL } from '~/apollo/apiClient'
//
export default defineEventHandler(async (event: CompatibilityEvent) => {
  const token = useCookie(event, 'authorize');
  const {
    context: { params: id },
  } = event;
  const query = parseGraphQL(GET_PROJECT_DETAIL);
  const {
    data: {
      data: { project },
    },
  } = await apiClient(
    {
      query,
      variables: id,
    },
    token
  );
  try {
    if (project) {
      await responseSuccess(event, { status: true, project });
    }
  } catch (e) {
    await responseError(event, 'Not Authorized', 401);
  }
});
