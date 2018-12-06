import postitionFacade from '../../facades/positionFacade';
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

    extend type Query {
        getPositions: [Position]
    }

    
`;

// resolver map
export const resolvers = { 
    Query: {
        getPositions: () => {
            console.log('getpos')
            return postitionFacade.getAll()
        }
    },
    Position: {
        user: (position) => {
            console.log(position)
            return userFacade.findById(position.user);
        },
    },
};
