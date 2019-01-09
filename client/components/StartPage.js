import React, { Component } from 'react';
import { GET_ALL_USERS, GET_ALL_LOCATIONBLOGS, FIND_BY_USERNAME, FIND_BY_ID  } from "../statements/queries"
import { ADD_USER, ADD_LOCATION_BLOG, LIKE_LOCATION_BLOG } from "../statements/mutations"
import { GETALLUSERS, GETALLBLOGS, FINDBYUSERNAME, FINDBYID } from './Queries';
import { ADDUSER, ADDLOCATIONBLOG, LIKELOCATIONBLOG } from './Mutations';


export default class Startpage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: 'select'
        }
    }

    change = (event) => {
        this.setState({ category: event.target.value })
    }

    render() {
        return (
            <div >
                <select name="category" id="category" onChange={this.change} value={this.state.category}>
                    <option value="">Choose a category</option>
                    <option value="getallusers">get all users</option>
                    <option value="getallblogs">get all locationblogs</option>
                    <option value="adduser">Add user</option>
                    <option value="addlocationblog">Add locationblog</option>
                    <option value="likelocationblog">Like locationblog</option>
                    <option value="findbyusername">Find by username</option>
                    <option value="findbyid">Find by user_id</option>
                </select>
                <DisplayComponent category={this.state.category} />
            </div>
        )
    }
}

function DisplayComponent({ category }) {
    switch (category) {
        case 'getallusers':
            return <GETALLUSERS statement={GET_ALL_USERS} />
        case 'getallblogs':
            return <GETALLBLOGS statement={GET_ALL_LOCATIONBLOGS} />
        case 'adduser':
            return <ADDUSER statement={ADD_USER} />
        case 'addlocationblog':
            return <ADDLOCATIONBLOG statement={ADD_LOCATION_BLOG} />
        case 'likelocationblog':
            return <LIKELOCATIONBLOG statement={LIKE_LOCATION_BLOG} />
        case 'findbyusername':
            return <FINDBYUSERNAME statement={FIND_BY_USERNAME} />
        case 'findbyid':
            return <FINDBYID statement={FIND_BY_ID} />
        default:
            return null;
    }
}