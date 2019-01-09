"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_schema_1 = require("./resources/comments/comment.schema");
const user_schema_1 = require("./resources/user/user.schema");
const post_schema_1 = require("./resources/post/post.schema");
const Query = `
    type Query {
        ${comment_schema_1.commentQueries}
        ${post_schema_1.postQueires}
        ${user_schema_1.userQueries}
    }
`;
exports.Query = Query;
