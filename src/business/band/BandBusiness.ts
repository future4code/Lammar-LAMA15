import { CustomError } from "../../error/CustomError";
import { Band, BandInputDTO, BandOutput } from "../../model/Band";
import {  IAuthenticator, IIdGenerator } from "../ports";
import { BandRepository } from "./BandRepository";
import * as BandErrors from "../../error/BandErrors";

export class BandBusiness {
    constructor(
        private bandDatabase: BandRepository,
        private idGenerator: IIdGenerator,
        private Authenticator: IAuthenticator
    ) {}
 
    public async registerBand(input: BandInputDTO) {
        try {
            const id = this.idGenerator.generate()
            const { name, musicGenre, responsible, userToken } = input
            
            if (!name  && !musicGenre && !responsible && !userToken) {
                throw new BandErrors.NotBody()
            }
            
            if (!name) {
                throw new BandErrors.NotName()
            }
    
            if (!musicGenre) {
                throw new BandErrors.NotmusicGenre()
            }

            if (!responsible) {
                throw new BandErrors.Notresponsible()
            }

            if (!userToken) {
                throw new BandErrors.NotUserToken()
            }
    
            if (typeof name !== "string") {
                throw new BandErrors.NameIsNotString()
            }
    
            if (typeof musicGenre !== "string") {
                throw new BandErrors.MusicGenreIsNotString()
            }

            if (typeof responsible !== "string") {
                throw new BandErrors.ResponsibleIsNotString()
            }

            const band = await this.bandDatabase.getBandByName(name)
        
            if (band) {
                throw new BandErrors.RegisteredBand()
            }

            const userRole = this.Authenticator.getTokenData(userToken).role

            if (userRole === "NORMAL") {
                throw new BandErrors.UserUnauthorized()
            }

            await this.bandDatabase.insertBand(
                new Band(id, name, musicGenre, responsible)
            )

        } catch (error:any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public async getBandByIdOrName( idOrName: string ) {
        try {

            if (!idOrName) {
               throw new BandErrors.NotidOrName()
            }
                
            const bandByID = await this.bandDatabase.getBandById(idOrName)

            if (bandByID) {
                const band: BandOutput = {
                    id: bandByID?.getId(),
                    name: bandByID?.getName().replace("-", " "),
                    musicGenre: bandByID?.getMusicGenre(),
                    responsible: bandByID?.getResponsible()
                }

                return band

            } else if (!bandByID) {
                const bandByName = await this.bandDatabase.getBandByName(idOrName)

                if (bandByName) {
                    const band: BandOutput = {
                        id: bandByName?.getId(),
                        name: bandByName?.getName().replace("-", " "),
                        musicGenre: bandByName?.getMusicGenre(),
                        responsible: bandByName?.getResponsible()
                    }
                    
                    return band
                } else {
                    throw new BandErrors.BandNotFound()
                }
            } 

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}
