import { GraphQLResolveInfo } from "graphql";
import { DbConnectionInterface } from "../../../interfaces/DbConnectionInterface";
import { UserInstance } from "../../../models/UserModel";
import { Transaction } from "sequelize";
import { handleError } from "../../../utils/utils";
import { RequestedFields } from "../../ast/RequestedFields";

export const userResolvers = {

    User: {

        posts: (user, { first = 10, offset = 0 }, {db, requestedFields}: {db: DbConnectionInterface, requestedFields: RequestedFields}, info: GraphQLResolveInfo) => {
            return db.Post
                .findAll({
                    where: {author: user.get('id')},
                    limit: first,
                    offset: offset,
                    attributes: requestedFields.getFields(info, {keep: ['id'], exclude: ['comments']})
                }).catch(handleError);
        }

    },
    
    Query: {
        users: (parent, {first = 10, offset = 0}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
            return db.User
                .findAll({
                    limit: first,
                    offset: offset
                }).catch(handleError);
        },
        user: (parent, {id}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.User
                .findById(id)
                .then((user: UserInstance) => {
                    if(!user) {
                        throw new Error(`O usuário com o ID ${id} não foi encontrado!`)
                    }
                    return user;
                }).catch(handleError);
        }
    },

    Mutations: {
        createUser: (parent, {input}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .create(input, {transaction: t});
            }).catch(handleError);
        },

        updateUser: (parent, {id, input}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if(!user) {
                            throw new Error(`O usuário com o ID ${id} não foi encontrado!`);
                        }
                        return user.update(input, {transaction: t});
                    });

            }).catch(handleError)
        },
        updateUserPassword: (parent, {id, input}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if(!user) {
                            throw new Error(`O usuário com o ID ${id} não foi encontrado!`);
                        }
                        return user.update(input, {transaction: t})
                            .then((user: UserInstance) => !!user);
                    });

            }).catch(handleError)
        },
        deleteUser: (parent, {id}, {db}: {db: DbConnectionInterface}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.User
                    .findById(id)
                    .then((user: UserInstance) => {
                        if(!user) {
                            throw new Error(`O usuário com o ID ${id} não foi encontrado!`);
                        }
                        return user.destroy({transaction: t})
                            .then((user: void | UserInstance) => !!user);
                    });
            }).catch(handleError);
        }
    }
};