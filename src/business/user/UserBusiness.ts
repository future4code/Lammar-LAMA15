import { CustomError } from "../../error/CustomError";
import { LoginInputDTO, User, UserInputDTO, UserOutput } from "../../model/User";
import { IHashManager, IIdGenerator, IAuthenticator } from "../ports";
import { UserRepository } from "./UserRepository";
import * as UserErrors from "../../error/UserErrors";

export class UserBusiness {
    constructor(
        private userDatabase: UserRepository,
        private hashManager: IHashManager,
        private idGenerator: IIdGenerator,
        private Authenticator: IAuthenticator
    ) {}
 
    public async signup(input: UserInputDTO) {
        try {
            const id = this.idGenerator.generate()
            const { name, email, password, role } = input
            
            if (!name  && !email && !password && !role) {
                throw new UserErrors.NotBody()
            }
            
            if (!name) {
                throw new UserErrors.NotName()
            }
    
            if (!email) {
                throw new UserErrors.NotEmail()
            }

            if (!password) {
                throw new UserErrors.NotPassword()
            }

            if (!role) {
                throw new UserErrors.NotRole()
            }
    
            if (typeof name !== "string") {
                throw new UserErrors.NameIsNotString()
            }
    
            if (typeof email !== "string") {
                throw new UserErrors.EmailIsNotString()
            }
    
            if (typeof password !== "string") {
                throw new UserErrors.PasswordIsNotString()
            }

            if(!email.includes("@")) {
                throw new UserErrors.InvalidEmail()
            }

            if (password.length < 8) {
                throw new UserErrors.InvalidPassword()
            }
            

            if (password.includes(" ") === true) {
                throw new UserErrors.PasswordNoSpaces()
            }

            const registeredEmail = await this.userDatabase.getUserByEmail(email)
        
            if (registeredEmail) {
                throw new UserErrors.RegisteredUser()
            }
            
            const hashPassword  = await this.hashManager.generateHash(password)

            await this.userDatabase.insertUser(
                new User(id, name, email, hashPassword, User.stringToUserRole(role.toUpperCase()))
            )

            const accessToken = this.Authenticator.generateToken({id, role})

            return accessToken 

        } catch (error:any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async login( input: LoginInputDTO ) {

        try {    
            const { email, password } = input

            if ( !email && !password ) {
                throw new UserErrors.NotBodyLogin() 
            }

            if(!email.includes("@")) {
                throw new UserErrors.InvalidEmail()
            }

            if(password.length < 8) {
                throw new UserErrors.InvalidPassword()
            }

            const userOutput = await this.userDatabase.getUserByEmail(email)

            if(!userOutput) {
              throw new UserErrors.UserNotFound()
            }

            const compareResult = await this.hashManager.compareHash(password, userOutput.getPassword())

            if(!compareResult) {
              throw new UserErrors.InvalidPasswordLogin()
            }

            const accessToken =  this.Authenticator.generateToken({id: userOutput.getId()})

            return accessToken

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async profile( userToken: string ) {
        try {

            if ( !userToken ) {
               throw new UserErrors.NotUserToken()
            }

            const payload = this.Authenticator.getTokenData(userToken).id

            const userOutput = await this.userDatabase.getUserById(payload)

            const user: UserOutput = {
                id: userOutput?.getId(),
                name: userOutput?.getName(), 
                email: userOutput?.getEmail(),
                role: userOutput?.getRole()
            }

            return user 

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}
