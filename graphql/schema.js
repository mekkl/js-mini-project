import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

// import schemas
import { 
    typeDef as User,
    resolvers as userResolvers
} from './User/user';

// If you had Query fields not associated with a
// specific type you could put them here
const Query = `
    type Query {
        _empty: String
    }
`;
const resolvers = {}

const schema = makeExecutableSchema({ 
    typeDefs: [Query, User], 
    resolvers: merge(resolvers, userResolvers),
});

export { schema };

