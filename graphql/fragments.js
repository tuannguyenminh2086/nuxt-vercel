import gql from 'graphql-tag'

export const TimeTrackingFragments = {
  time_tracking: gql`
    fragment TimeTrackingIssue on TimeTracking {
        spent
        start_time
        end_time
        created_by
        updated_at
    }`
  }
;

