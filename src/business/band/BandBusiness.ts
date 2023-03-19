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
}
