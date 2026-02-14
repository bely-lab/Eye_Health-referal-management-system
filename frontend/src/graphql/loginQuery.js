import gql from 'graphql-tag';

export const LOGIN_QUERY = gql`
  query Login($username: String!, $password: String!) {
    users(where: {username: {_eq: $username}, password: {_eq: $password}}) {
      id
      username
      role
    }
  }
`;
