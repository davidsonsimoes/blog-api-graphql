import { commentMutations } from "./resources/comments/comment.schema";
import { userMudations } from "./resources/user/user.schema";
import { postMutations } from "./resources/post/post.schema";

const Mutation = `
    type Mutation {
        ${commentMutations}
        ${postMutations}
        ${userMudations}
    }
`;

export {
    Mutation
}