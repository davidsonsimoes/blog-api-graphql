"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_schema_1 = require("./resources/comments/comment.schema");
const user_schema_1 = require("./resources/user/user.schema");
const post_schema_1 = require("./resources/post/post.schema");
const Mutation = `
    type Mutation {
        ${comment_schema_1.commentMutations}
        ${post_schema_1.postMutations}
        ${user_schema_1.userMutations}
    }
`;
exports.Mutation = Mutation;
