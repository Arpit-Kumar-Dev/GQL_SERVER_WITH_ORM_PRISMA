"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const server_2 = require("./user/server");
function create() {
    return __awaiter(this, void 0, void 0, function* () {
        const gqlserver = new server_1.ApolloServer({
            typeDefs: `
        ${server_2.User.typeDefs}
        type Query{ 
           ${server_2.User.queries}
           getContext:String
        }
        type Mutation{
          ${server_2.User.mutations}
        }
        `,
            resolvers: {
                Query: Object.assign({}, server_2.User.resolvers.queries),
                Mutation: Object.assign({}, server_2.User.resolvers.mutations),
            },
        });
        yield gqlserver.start();
        return gqlserver;
    });
}
exports.default = create;
