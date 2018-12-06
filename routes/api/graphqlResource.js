const GraphqlHTTP = require('express-graphql');
const { schema } = require('../../graphql/schema');

module.expores = (res, req, next) => {
    GraphqlHTTP({
        schema,
        graphiql: true
})};