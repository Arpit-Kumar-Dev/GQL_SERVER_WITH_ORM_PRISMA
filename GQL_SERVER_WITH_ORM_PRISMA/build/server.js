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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { ApolloServer } from "@apollo/server"
const express4_1 = require("@apollo/server/express4");
const server_1 = __importDefault(require("./graphql/server"));
const user_1 = __importDefault(require("./services/user"));
function iniit() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const PORT = Number(process.env.PORT) || 8000;
        app.use(express_1.default.json());
        //create graphql server
        // const gqlserver = new ApolloServer({
        //     typeDefs: `
        //     type Query{ 
        //        hellow: String
        //        Say(name:String): String 
        //     }
        //     type Mutation{
        //        createUser(firstName: String!,lastName: String!,email:String!,password:String!):Boolean
        //        }
        //     `,
        //     resolvers: {
        //         Query: {
        //             hellow: () => `hi arpit we re good to go`,
        //             Say: (_, { name }: { name: string },) => `hi ${name} we are good to go`
        //         },
        //         Mutation:{
        //             createUser:async(_,{firstName,lastName,email,password}:{firstName:string;lastName:string,email:string;password:string})=>{ await PrismaClienT.user.create({
        //                 data:{
        //                     email,
        //                     firstName,
        //                     lastName,
        //                     password,
        //                     salt:"random_salt"
        //                 }
        //             })
        //             return true
        //         }
        //         }
        //     },
        // })
        // await gqlserver.start ()
        app.get("/", (req, res) => {
            res.json({ message: "app is runing and up" });
        });
        const graphql = yield (0, server_1.default)();
        app.use("/graphql", (0, express4_1.expressMiddleware)(graphql, { context: (_a) => __awaiter(this, [_a], void 0, function* ({ req }) {
                const token = req.headers['token'];
                try {
                    const user = user_1.default.decodeJWTToken(token);
                    return { user };
                }
                catch (error) {
                    return {};
                }
            }) }));
        app.listen(PORT, () => console.log(`app is running on ${PORT}`));
    });
}
iniit();
