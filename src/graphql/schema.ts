import { makeExecutableSchema } from 'graphql-tools';

import { Query } from './query';
import { Mutation } from './mutation';
import { userTypes } from './resources/user/user.schema';
import { postTypes } from './resources/post/post.schema';
import { commentTypes } from './resources/comments/comment.schema';
 
import { postResolvers } from './resources/post/post.resolvers';
// import { tokenResolvers } from './resources/token/token.resolvers';
import { userResolvers } from './resources/user/user.resolvers';
import { merge } from 'lodash';
import { commentResolvers } from './resources/comments/comment.resolvers';

const resolvers = merge(
    commentResolvers,
    postResolvers,
    // tokenResolvers,
    userResolvers
);

const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`;

export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation,
        userTypes,
        postTypes,
        commentTypes
    ]
});