import gql from "graphql-tag";

export const GET_ALL_USERS = gql`
   {
    getUsers {
        id
        firstName
        lastName
        userName
        email
    }
  }
`;

export const GET_ALL_LOCATIONBLOGS = gql`
   {
    getLocationBlogs {
        info
        position {
            location {
                coordinates
            }
        }
        author {
            firstName
        }
        created
        slug
        likedByCount
    }
  }
`;

export const FIND_BY_USERNAME = gql`
query FindByUsername($username: String!) {
    getUserByUserName(userName: $username) {
    id
    userName
    firstName
    lastName
    email
  }
}
`;

export const FIND_BY_ID = gql`
query FindById($id: ID!) {
    getUserById(id: $id) {
    id
    userName
    firstName
    lastName
    email
  }
}
`