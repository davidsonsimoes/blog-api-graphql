import { GraphQLResolveInfo } from "graphql";
import { DbConnectionInterface } from "../../../interfaces/DbConnectionInterface";
import { UserInstance } from "../../../models/UserModel";

export const userResolvers = {
    Query: {
        users: (parent, {first = 10, offset = 0}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
            return db.User
                .findAll({
                    limit: first,
                    offset: offset
                });
        },
        user: (parent, {id}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
            return db.User
                .findById(id)
                .then((user: UserInstance) => {
                    if(!user) {
                        throw new Error(`O usuário com o ID ${id} não foi encontrado!`)
                    }
                    return user;
                });
        }
    }
}