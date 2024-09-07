import express from "express"
// import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4'
import create from "./graphql/server"
import UserService from "./services/user"

async function iniit() {
    const app = express()
    const PORT = Number(process.env.PORT) || 8000
    app.use(express.json())

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
        res.json({ message: "app is runing and up" })
    })
    const graphql = await create()
   
    app.use("/graphql", expressMiddleware(graphql,{context: async({ req })=>{
      
        const token = req.headers['token']
        try{
            const user = UserService.decodeJWTToken(token as string)
            return {user}
        }catch(error){
            return{}
        }
    }}))
    app.listen(PORT, () => console.log(`app is running on ${PORT}`))
}
iniit()