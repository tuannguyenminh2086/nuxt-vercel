import { CompatibilityEvent, useCookie } from 'h3'
import { GET_TRACKING_PROJECTS } from '~~/graphql/queries/projectQuery'
import { responseError, responseSuccess } from '~/helpers/apiProcess'
import { apiClient, parseGraphQL } from '~/apollo/apiClient'

export default defineEventHandler(async (event: CompatibilityEvent) => {
  const token = useCookie(event, 'authorize');
  
  const query = parseGraphQL(GET_TRACKING_PROJECTS);
  const { data: { data } } = await apiClient({ query }, token );



  try {
    if (data.tracking_projects) {
      await responseSuccess(event, { status: true, tracking_projects: data.tracking_projects });
    }

  } catch (e) {
    await responseError(event, 'Not Authorized', 401);
  }
});


