import { CompatibilityEvent, useCookie } from 'h3'
import { GET_PROJECT_DETAIL } from '~~/graphql/queries/projectQuery'
import { responseError, responseSuccess } from '~/helpers/apiProcess'
import { apiClient, parseGraphQL } from '~/apollo/apiClient'
//

interface VariablesObject {
  [key: string]: any
}


export default defineEventHandler( async (event: CompatibilityEvent ) => {
  const token = useCookie(event, 'authorize');

  const {
    context: { params: { id } },
  } = event;
  
  const content = useQuery(event)
  const page:number = parseInt(content.pageNumber as string)
  const query = parseGraphQL(GET_PROJECT_DETAIL);
  const { filter } = content

  const payload: VariablesObject = {
    id
  }


  if (page) {
    payload.page = page
  }

  if (filter) {
    payload.filter = JSON.parse(filter.toString());
  }

  const {
    data: {
      data: { project },
    },
  } = await apiClient(
    {
      query,
      variables: payload
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
