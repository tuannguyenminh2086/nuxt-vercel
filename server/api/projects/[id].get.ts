import { CompatibilityEvent, useCookie } from 'h3'
import { GET_PROJECT_DETAIL } from '~~/graphql/queries/projectQuery'
import { responseError, responseSuccess } from '~/helpers/apiProcess'
import { apiClient, parseGraphQL } from '~/apollo/apiClient'
//
export default defineEventHandler( async (event: CompatibilityEvent ) => {
  const token = useCookie(event, 'authorize');

  const {
    context: { params: { id } },
  } = event;
  
  const payload = useQuery(event)

  const page:number = parseInt(payload.pageNumber as string)
  const query = parseGraphQL(GET_PROJECT_DETAIL);

  const {
    data: {
      data: { project },
    },
  } = await apiClient(
    {
      query,
      variables: {
        id,
        pageNumber: page,
        filter: {
          status: 1
        }
      }
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
