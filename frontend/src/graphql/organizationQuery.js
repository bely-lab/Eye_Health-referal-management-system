//src/graphql/organizationQuery.js
import gql from 'graphql-tag';

export const ORGANIZATION_QUERY = gql`
  query GetOrganizationName($userId: Int!) {
    users_by_pk(id: $userId) {
      organization {
        name
      }
    }
  }
`;
