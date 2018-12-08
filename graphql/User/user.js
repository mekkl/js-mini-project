import userFacade from '../../facades/userFacade';

export const typeDef = `
    scalar Date

    type User {
        id: ID
        firstName: String
        lastName: String
        userName: String
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

    extend type Query {
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

    extend type Mutation {
        addUser(input: addUserInput): User
    }

    
`;

// resolver map
export const resolvers = { 
    Query: {
        getUsers: () => {
            return userFacade.getAllUsers();
        },
        getUserById: (root, {id}) => {
            return userFacade.findById(id);
        },
        getUserByUserName: (root, {userName}) => {
            return userFacade.findByUsername(userName);
        }
    },
    Mutation: {
        addUser: (root, {input}) => {
            return userFacade.addUser(input.firstName, input.lastName, input.userName, input.password, input.email)
        },
        
    }
};
