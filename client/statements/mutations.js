import gql from "graphql-tag";

export const ADD_USER = gql`
  mutation ADDUSER(
      $firstName: String!,
      $lastName: String!,
      $userName: String!,
      $email: String!,
      $password: String!,
    ){
    addUser(input: {
        firstName: $firstName
        lastName: $lastName
        userName: $userName
        email: $email
        password: $password
    }) {
        id
        firstName
        lastName
        userName
        email
    }
  }
`;


export const ADD_LOCATION_BLOG = gql`
  mutation ADDLOCATIONBLOG(
      $info: String!,
      $author: String!,
      $longitude: Int!,
      $latitude: Int!
    ){
    addLocationBlog(
        info: $info
        author: $author
        longitude: $longitude
        latitude: $latitude
    ){
      info
      author
    }
  }
`;


export const LIKE_LOCATION_BLOG = gql`
  mutation LikeLocationBlog(
      $id: String!,
      $user_id: String!,
    ){
    likeLocationBlog(
        id: $id
        user_id: $user_id
    ){
    author
    created
    }
  }
`;