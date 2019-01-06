import { commentQueries } from "./resources/comments/comment.schema";
import { userQueries } from "./resources/user/user.schema";
import { postQueires } from "./resources/post/post.schema";

const Query = `
    type Query {
        ${commentQueries}
        ${postQueires}
        ${userQueries}
    }
`;

export {
    Query
}