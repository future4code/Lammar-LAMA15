import { UserBusiness } from "../../src/business/user/UserBusiness";
import { CustomError } from "../../src/error/CustomError";
import { UserRole } from "../../src/model/User";
import { AuthenticatorMock } from "../mocks/AuthenticatorMock";
import {  HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

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
