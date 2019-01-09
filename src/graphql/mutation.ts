import { commentMutations } from "./resources/comments/comment.schema";
import { userMutations } from "./resources/user/user.schema";
import { postMutations } from "./resources/post/post.schema";

const Mutation = `
    type Mutation {
        ${commentMutations}
        ${postMutations}
        ${userMutations}
    }
`;

export {
    Mutation
}