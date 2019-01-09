import React from 'react';
import { Mutation } from "react-apollo";
import { ADD_USER, ADD_LOCATION_BLOG, LIKE_LOCATION_BLOG } from '../statements/mutations'

export const ADDUSER = () => {
    let firstName;
    let lastName;
    let userName;
    let email;
    let password;

    return (
        <Mutation mutation={ADD_USER}>
            {(ADDUSER, { data }) => (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            ADDUSER({
                                variables: {
                                    firstName: firstName.value,
                                    lastName: lastName.value,
                                    userName: userName.value,
                                    email: email.value,
                                    password: password.value
                                }
                            });
                            firstName.value = "";
                            lastName.value = "";
                            userName.value = "";
                            email.value = "";
                            password.value = "";
                        }}
                    >
                        firstName
              <input ref={node => { firstName = node }} />
                        lastName
              <input ref={node => { lastName = node }} />
                        userName
              <input ref={node => { userName = node }} />
                        email
              <input ref={node => { email = node }} />
                        password
              <input ref={node => { password = node }} />
                        <button type="submit">Add User</button>
                    </form>
                </div>
            )}
        </Mutation>
    );
};



export const ADDLOCATIONBLOG = () => {
    let info;
    let author;
    let longitude;
    let latitude;

    return (
        <Mutation mutation={ADD_LOCATION_BLOG}>
            {(ADDLOCATIONBLOG, { data }) => (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            ADDLOCATIONBLOG({
                                variables: {
                                    info: info.value,
                                    author: author.value,
                                    longitude: parseInt(longitude.value),
                                    latitude: parseInt(latitude.value),
                                }
                            });
                            info.value = "";
                            author.value = "";
                            longitude.value = "";
                            latitude.value = "";
                        }}
                    >
                        info
              <input ref={node => { info = node }} />
                        author
              <input ref={node => { author = node }} />
                        longitude
              <input ref={node => { longitude = node }} />
                        latitude
              <input ref={node => { latitude = node }} />
                        <button type="submit">Add User</button>
                    </form>
                </div>
            )}
        </Mutation>
    );
};



export const LIKELOCATIONBLOG = () => {
    let id;
    let user_id;

    return (
        <Mutation mutation={LIKE_LOCATION_BLOG}>
            {(LIKELOCATIONBLOG, { data }) => (
                <div>
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            LIKELOCATIONBLOG({
                                variables: {
                                    id: id.value,
                                    user_id: user_id.value,
                                }
                            });
                            id.value = "";
                            user_id.value = "";
                        }}
                    >
                        id
              <input ref={node => { id = node }} />
                        user_id
              <input ref={node => { user_id = node }} />
                        <button type="submit">Add User</button>
                    </form>
                </div>
            )}
        </Mutation>
    );
};