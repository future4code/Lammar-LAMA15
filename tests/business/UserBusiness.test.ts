import { UserBusiness } from "../../src/business/user/UserBusiness";
import { CustomError } from "../../src/error/CustomError";
import { UserRole } from "../../src/model/User";
import { AuthenticatorMock } from "../mocks/AuthenticatorMock";
import {  HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import { userMockOutput } from "../mocks/UserMock";

const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new HashManagerMock(),
    new IdGeneratorMock(),
    new AuthenticatorMock()
)

describe("Endpoint signup tests", () => {

    test("Test 1: Error that should return when the input is empty.", async () => {
        expect.assertions(3)

        try {
            await userBusiness.signup({
                name:"", 
                email:"", 
                password:"", 
                role:""
            })

        } catch (err:any) {  
            expect(err).toBeInstanceOf(CustomError)
            expect(err.statusCode).toBe(422)
            expect(err.message).toBe(`Por favor, insira todos os parâmetros corretamente. 
            Parâmetros 'name', 'email', 'password' e 'role' não foram informados ou estão incorretos!`
            )   
        }
    })

    test("Test 2: Error that should return when the email is invalid.", async () => {
        expect.assertions(3)

        try {
            await userBusiness.signup({
                name:"Usuário de teste", 
                email:"email.com", 
                password:"12345678", 
                role:UserRole.NORMAL 
            })
            
        } catch (error:any) {  
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Email inválido, ex: emailexemplo@email.com")   
        }
    })

    test("Test 3: Error that should return when the password is invalid.", async () => {
        expect.assertions(3)

        try {
            await userBusiness.signup({
                name:"Usuário de teste", 
                email:"teste@email.com", 
                password:"12345", 
                role:UserRole.NORMAL 
            })

        } catch (error:any) {  
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe(
                "Senha inválida, O valor do parâmetro 'password' deve conter 8 caracteres ou mais!"
            )   
        }
    })

    test("Test 4: Successful registration and access token verification.", async () => {

        const result =  await userBusiness.signup({
            name:"Usuário de teste 2", 
            email:"teste2@email.com", 
            password:"12345678", 
            role:UserRole.NORMAL 
        })

        expect(result).toBeDefined()
        expect(result).toBe("token")
    })
})

describe("Endpoint login tests", () => {

    test("Test 1: Error that should return when the input is empty.", async () => {
        expect.assertions(3)

        try {
            await userBusiness.login({
                email:"", 
                password:""
            })

        } catch (err:any) {  
            expect(err).toBeInstanceOf(CustomError)
            expect(err.statusCode).toBe(422)
            expect(err.message).toBe(`Por favor, insira todos os parâmetros corretamente. 
            Parâmetros 'email' ou 'password' não foram informados ou estão incorretos!`
            )   
        }
    })

    test("Test 2: Error that should return when the email is invalid.", async () => {
        expect.assertions(3)

        try {
            await userBusiness.signup({
                name:"Usuário de teste", 
                email:"email.com", 
                password:"12345678", 
                role:UserRole.NORMAL 
            })
            
        } catch (error:any) {  
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Email inválido, ex: emailexemplo@email.com")   
        }
    })

    test("Test 3: Error that should return when the password is invalid.", async () => {
        expect.assertions(3)

        try {
            await userBusiness.signup({
                name:"Usuário de teste", 
                email:"teste@email.com", 
                password:"12345", 
                role:UserRole.NORMAL 
            })

        } catch (error:any) {  
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe(
                "Senha inválida, O valor do parâmetro 'password' deve conter 8 caracteres ou mais!"
            )   
        }
    })

    test("Test 4: Error that should return when user is not found.", async () => {
        expect.assertions(3)

        try {
            await userBusiness.login({
                email:"emailnouser@email.com", 
                password:"12345678"
            })

        } catch (error:any) {  
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe(
                "Usuário não encontrado, por favor verifique o email informado e tente novamente!"
            )   
        }
    })

    test("Test 5: Error that should return when the password is incorrect.", async () => {
        expect.assertions(3)

        try {
            await userBusiness.login({ 
                email:"teste@email.com", 
                password:"senhaincorreta"
            })

        } catch (error:any) {  
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Senha incorreta!")   
        }
    })

    test("Test 6: Successful login and access token verification.", async () => {

        const result =  await userBusiness.login({
            email:"teste@email.com", 
            password:"12345678"
        })

        expect(result).toBeDefined()
        expect(result).toBe("token")
    })
})

describe("Endpoint profile tests", () => {

    test("Test 1: Error that should return when the token is not informed", async () => {
        expect.assertions(3)

        try {
            await userBusiness.profile("")

        } catch (err:any) {  
            expect(err).toBeInstanceOf(CustomError)
            expect(err.statusCode).toBe(422)
            expect(err.message).toBe("Informe o token de usuário através do parâmetro 'Authorization'!")   
        }
    })

    test("Test 2: authorized user", async () => {

        const result =  await userBusiness.profile("token")

        expect(result).toBeDefined()
        expect(result).toEqual(userMockOutput)
    })
})
