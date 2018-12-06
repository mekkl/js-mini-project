import { resolvers } from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = `
    scalar Date

    type User {
        id: ID
        firstName: String
        lastName: String
        userName: String
        password: String
        email: String
        job: [Job]
        created: Date
        lastUpdated: Date
    }

    type Job {
        id: ID
        type: String
        company: String
        companyUrl: String
    }

    type Query {
        getUsers: [User]
        getUserById(id: ID!): User
        getUserByUserName(userName: String!): User
    }

    input addUserInput {
        firstName: String!
        lastName: String!
        userName: String!
        password: String!
        email: String!
    }

    type Mutation {
        addUser(input: addUserInput): User
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };

