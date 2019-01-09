import gql from "graphql-tag";
import { ApolloConsumer } from 'react-apollo'
import React from 'react';

export default class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            user: null
        }
    }

    onUserFetched = user => this.setState({ user }); // actually fetching the user
    handleChange = event => this.setState({ id: event.target.value }); // handles user input

    render() {
        var showUser = this.state.user != null ? JSON.stringify(this.state.user) : ""
        
        const FIND_BY_ID = gql`
            query getUserById($id: ID!) {
                getUserById(id: $id) {
                    userName
                    firstName
                    lastName
                    email
                }
            }
        `;

        return (
            <ApolloConsumer>
                {client => (
                    <div>
                        <input type="text" value={this.state.id} onChange={this.handleChange} />
                        <button
                            onClick={async () => {
                                const { data } = await client.query({
                                    query: FIND_BY_ID,
                                    variables: { id: this.state.id }
                                });
                                this.onUserFetched(data.getUserById);
                            }}
                        >
                            Find user by ID!
                  </button>
                        <p>{showUser}</p>
                    </div>
                )}
            </ApolloConsumer>
        )
    }
}