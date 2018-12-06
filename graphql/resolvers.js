import userFacade from '../facades/userFacade';

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
        }
    }
};