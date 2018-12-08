import positionFacade from '../../facades/positionFacade';
import userFacade from '../../facades/userFacade';

export const typeDef = `
    type Position {
        id: ID
        user: User
        created: Date
        location: Location
    }

    type Location {
        type: Type
        coordinates: [Float]
    }

    enum Type {
        POSITION
    }

    input updateOrCreateInput {
        userId: ID!
        longitude: Float!
        latitude: Float!
    }

    input findNearbyInput {
        longitude: Float!
        latitude: Float!
        maxDistance: Int!
        minDistance: Int
    }

    extend type Query {
        getPositions: [Position]
        getPositionByUserId(id: ID!): Position
        findNearby(input: findNearbyInput): [Position]
    }

    extend type Mutation {
        updateOrCreate(input: updateOrCreateInput): Position
    }
`;

// resolver map
export const resolvers = { 
    Query: {
        getPositions: () => {
            return positionFacade.getAll()
        },
        getPositionByUserId: (root, {id}) => {
            return positionFacade.getByUser(id)
        },
        findNearby: (root, {input}) => {
            return positionFacade.findNearby(
                input.longitude,
                input.latitude,
                input.maxDistance,
                input.minDistance,
            )
        },
    },
    Position: {
        user: (position) => {
            return userFacade.findById(position.user);
        },
    },
    Mutation: {
        updateOrCreate: (root, {input}) => {
            return positionFacade.updateOrCreate(input.userId, input.longitude, input.latitude)
        }
    }
};
