
import { ApolloServer } from "@apollo/server"
import { User } from "./user/server"


async function create(){

   

    const gqlserver = new ApolloServer({     // cannot leave query empty
        typeDefs: `
        ${User.typeDefs}
        type Query{ 
           ${User.queries}
           getContext:String
        }
        type Mutation{
          ${User.mutations}
        }
        `,
        resolvers: {
            Query: {...User.resolvers.queries},
            Mutation: {...User.resolvers.mutations},

        },
    })

    await gqlserver.start()

    return gqlserver 
}
export default create