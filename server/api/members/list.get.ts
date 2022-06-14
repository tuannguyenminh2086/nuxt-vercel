import { CompatibilityEvent, useCookie } from 'h3'
import { responseError, responseSuccess } from '~/helpers/apiProcess'
import { apiClient, parseGraphQL } from '~/apollo/apiClient'
import { GET_ALL_USER } from '~/graphql/queries/userQuery'
//
export default defineEventHandler(async (event: CompatibilityEvent) => {
  const token = useCookie(event, 'authorize');
  const query = parseGraphQL(GET_ALL_USER);
  const {
    data: {
      data: { users },
    },
  } = await apiClient(
    {
      query
    },
    token
  );
  try {
    if (users) {
      await responseSuccess(event, { status: true, users });
    }
  } catch (e) {
    await responseError(event, 'Not Authorized', 401);
  }
});
