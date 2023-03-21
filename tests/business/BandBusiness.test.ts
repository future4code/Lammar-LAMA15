import { BandBusiness } from "../../src/business/band/BandBusiness";
import { CustomError } from "../../src/error/CustomError";
import { AuthenticatorMock } from "../mocks/services/AuthenticatorMock";
import { IdGeneratorMock } from "../mocks/services/IdGeneratorMock";
import { BandDatabaseMock } from "../mocks/band/BandDatabaseMock";
import { bandMockOutput } from "../mocks/band/BandMock";

const bandBusiness = new BandBusiness (
    new BandDatabaseMock(),
    new IdGeneratorMock(),
    new AuthenticatorMock()
)

describe("Endpoint tests register bands", () => {

    test("Test 1: Error that should return when the input is empty.", async () => {
        expect.assertions(3)

        try {
            await bandBusiness.registerBand({
                name:"", 
                musicGenre:"", 
                responsible:"", 
                userToken:""
            })

        } catch (err:any) {  
            expect(err).toBeInstanceOf(CustomError)
            expect(err.statusCode).toBe(422)
            expect(err.message).toBe(`Por favor, insira todos os parâmetros corretamente. 
            Parâmetros 'name' 'musicGenre', 'responsible' e 'userToken' não foram informados ou estão incorretos!`
            )   
        }
    })
})

describe("Endpoint tests get band", () => {

    test("Test 1: Error that should return when the id or name entered is invalid.", async () => {
        expect.assertions(3)

        try {
            await bandBusiness.getBandByIdOrName("not id")

        } catch (err:any) {  
            expect(err).toBeInstanceOf(CustomError)
            expect(err.statusCode).toBe(404)
            expect(err.message).toBe(
                "Banda não encontrada, por favor verifique o id ou nome informado e tente novamente!"
            )   
        }
    })

    test("Test 2: Successful request.", async () => {

        const result = await bandBusiness.getBandByIdOrName("id")

        expect(result).toBeDefined()
        expect(result).toEqual(bandMockOutput)
    })
})
