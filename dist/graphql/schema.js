"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const query_1 = require("./query");
const mutation_1 = require("./mutation");
const user_schema_1 = require("./resources/user/user.schema");
const post_schema_1 = require("./resources/post/post.schema");
const comment_schema_1 = require("./resources/comments/comment.schema");
const post_resolvers_1 = require("./resources/post/post.resolvers");
// import { tokenResolvers } from './resources/token/token.resolvers';
const user_resolvers_1 = require("./resources/user/user.resolvers");
const lodash_1 = require("lodash");
const comment_resolvers_1 = require("./resources/comments/comment.resolvers");
const resolvers = lodash_1.merge(comment_resolvers_1.commentResolvers, post_resolvers_1.postResolvers, 
// tokenResolvers,
user_resolvers_1.userResolvers);
const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`;
exports.default = graphql_tools_1.makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        query_1.Query,
        mutation_1.Mutation,
        user_schema_1.userTypes,
        post_schema_1.postTypes,
        comment_schema_1.commentTypes
    ]
});
