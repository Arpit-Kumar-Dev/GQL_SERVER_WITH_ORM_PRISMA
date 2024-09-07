
import { PrismaClienT } from "../lib/db"
import {createHmac,randomBytes} from 'node:crypto'
import JWT from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"


const JWT_SECRET='$uperM@n@123'


export interface CreateUserPayload{
    firstName:string
    lastName ? :string
    email:string;
    password:string;
}
export interface GetUserTokenPayload{
    email:string;
    password:string;
}

class UserService{
   public static createUser(payload:CreateUserPayload){
    const {firstName,lastName,email,password}=payload
    const salt = randomBytes(32).toString()
    const hashedPassword = UserService.GenarateHash(salt,password)

          return PrismaClienT.user.create({
            data:{
                firstName,
                lastName,
                email,
                salt,
                password: hashedPassword,
            }
        })
    }
    public static async getUserByEmail(email:string){
         return PrismaClienT.user.findUnique({where:{email}})
    }


    public static getUserById(id:string){
             return PrismaClienT.user.findUnique({where:{id}})
    }
    private static GenarateHash(salt:string,password:string){
        const hashedPassword = createHmac('sha256',salt).update(password).digest('hex')
        return hashedPassword
    }
    public static async getUserToken(payload:GetUserTokenPayload){
        const {email,password}=payload
        const user = await UserService.getUserByEmail(email)
        if(!user){
            throw new Error('user not found')
        }
        const userSalt = user.salt
        const usersHashPassword = UserService.GenarateHash(userSalt,password)
        if(usersHashPassword!==user.password){
            throw new Error("incrrect Password")
        }
        const token = JWT.sign({id:user.id,email:user.email},JWT_SECRET)
        return token
    }
    public static decodeJWTToken(token:string){
        return JWT.verify(token,JWT_SECRET)
    }

}
export default UserService