import React from 'react';
import { Query, ApolloConsumer } from "react-apollo";
import { FIND_BY_USERNAME, FIND_BY_ID } from '../statements/queries'


export const GETALLUSERS = ({ statement }) => (
    <Query query={statement}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            var key = Object.keys(data)[0]

            return data[key].map((user, idx) => {
                var keys = Object.keys(user)
                var displayUser = keys.map(key => {
                    if (key !== '__typename') {
                        return <p>{key}: {JSON.stringify(user[key])}</p>
                    }
                })
                return <div>
                    {/* Element {idx+1} */}
                    {displayUser}
                    <hr></hr>
                </div>
            });
        }}
    </Query>
)
export const GETALLBLOGS = ({ statement }) => (
    <Query query={statement}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) {
                return <p>Error :(</p>;
            }

            var key = Object.keys(data)[0]

            return data[key].map((blog, idx) => {
                var keys = Object.keys(blog)
                var displayBlog = keys.map(key => {
                    if (key !== '__typename') {
                        return <p>{key}: {JSON.stringify(blog[key])}</p>
                    }
                })
                return <div>
                    {/* Element {idx+1} */}
                    {displayBlog}
                    <hr></hr>
                </div>
            });
        }}
    </Query>
)

export class FINDBYUSERNAME extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        username: "",
        id: "",
        user: null
      }
    }
  
    onUserFetched = user => this.setState(() => ({ user })); // actually fetching the user
    handleChange = event => this.setState({username: event.target.value}); // handles user input
  
    render() {
      var showUser = this.state.user != null ? JSON.stringify(this.state.user) : ""
      return (
        <ApolloConsumer>
              {client => (
                <div>
                  <input type="text" value={this.state.username} onChange={this.handleChange} />
                  <button
                    onClick={async () => {
                      const { data } = await client.query({
                        query: FIND_BY_USERNAME,
                        variables: { username: this.state.username }
                      });
                      this.onUserFetched(data.findByUsername);
                    }}
                  >
                    Find user!
                  </button>
                  <p>{showUser}</p>
                </div>
              )}
        </ApolloConsumer>
      )
    }
  };

export class FINDBYID extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        id: "",
        user: null
      }
    }
  
    onUserFetched = user => this.setState(() => ({ user })); // actually fetching the user
    handleChange = event => this.setState({id: event.target.value}); // handles user input
  
    render() {
      var showUser = this.state.user != null ? JSON.stringify(this.state.user) : ""
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
                      this.onUserFetched(data.findById);
                    }}
                  >
                    Find user!
                  </button>
                  <p>{showUser}</p>
                </div>
              )}
        </ApolloConsumer>
      )
    }
  }