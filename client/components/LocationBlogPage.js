import gql from "graphql-tag";
import { ApolloConsumer, Mutation } from 'react-apollo'
import React from 'react';

export default () => {


    const ADD_LOCATION_BLOG = gql`
            query getUserById($id: ID!) {
                getUserById(id: $id) {
                    userName
                    firstName
                    lastName
                    email
                }
            }
        `;



    const AddLocationBlog = () => {
        return (
            <p>test</p>
        )
    }





}