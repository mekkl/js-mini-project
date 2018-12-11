import blogFacade from '../../facades/blogFacade';
import userFacade from '../../facades/userFacade';

export const typeDef = `
    type LocationBlog {
        id: ID
        info: String
        position: Position
        author: User
        likedBy: [User]
        created: Date
        slug: String
        likedByCount: Int
    }

    input addLocationBlogInput {
        info: String!
        author: ID!
        longitude: Float!
        latitude: Float!
    }
    
    input likeLocationBlogInput {
        id: ID!
        likedBy: ID!
    }

    extend type Query {
        getLocationBlogs: [LocationBlog]
    }

    extend type Mutation {
        addLocationBlog(input: addLocationBlogInput): LocationBlog
        likeLocationBlog(input: likeLocationBlogInput): LocationBlog
    }
`;

// resolver map
export const resolvers = { 
    Query: {
        getLocationBlogs: () => {
            return blogFacade.getAllBlogs()
        },
    },
    LocationBlog: {
        author: (locationBlog) => {
            return userFacade.findById(locationBlog.author)
        },
        likedBy: (locationBlog) => {
            return userFacade.findAllByIds(locationBlog.likedBy)
        },
    },
    Mutation: {
        addLocationBlog: (root, {input}) => {
            return blogFacade.addLocationBlog(input.info, input.author, input.longitude, input.latitude)
        },
        likeLocationBlog: (root, {input}) => {
            return blogFacade.likeLocationBlog(input.id, input.likedBy)
        },
    }
};
