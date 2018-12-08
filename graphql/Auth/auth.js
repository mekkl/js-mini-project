import authFacade from '../../facades/authWrapFacade';


export const typeDef = `
    input loginInput {
        userName: String!
        password: String!
        latitude: Float!
        longitude: Float!
        radius: Int!
    }

    extend type Mutation {
        login(input: loginInput): [Position]
    }
`;

// resolver map
export const resolvers = { 
    Mutation: {
        login: (root, {input}) => {
            return authFacade.loginGQL(
                input.userName,
                input.password,
                input.latitude,
                input.longitude,
                input.radius,
            )
        }
    }
};
