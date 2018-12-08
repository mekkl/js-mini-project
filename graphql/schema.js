import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

/**
 * importing typeDefs
 */
import { 
    typeDef as User,
    resolvers as userResolvers
} from './User/user';
import {
    typeDef as Position,
    resolvers as positionResolvers
} from './Position/position';
import {
    typeDef as Auth,
    resolvers as authResolvers
} from './Auth/auth';

/**
 * If you had Query fields not associated with a
 * specific type you could put them here
 */ 
const Query = `
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;
const resolvers = {}

const schema = makeExecutableSchema({ 
    typeDefs: [
        Query, 
        User, 
        Position, 
        Auth
    ], 
    resolvers: merge(
        resolvers, 
        userResolvers, 
        positionResolvers, 
        authResolvers
        ),
});

export { schema };

