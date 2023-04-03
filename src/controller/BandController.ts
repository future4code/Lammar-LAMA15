import { Request, Response } from "express";
import { BandBusiness } from "../business/band/BandBusiness";
import { BandInputDTO } from "../model/Band";

export class BandController {
    constructor(private bandBusiness: BandBusiness){}

    public async registerBand(req: Request, res: Response) {
        try {
            const { name, musicGenre, responsible, userToken } = req.body

            const input: BandInputDTO = {
                name, 
                musicGenre, 
                responsible, 
                userToken
            }

            await this.bandBusiness.registerBand(input)

            res.status(201).send({ message: "Nova Banda cadastrada com sucesso!"})
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }

    public async getBandByIdOrName( req: Request, res: Response ): Promise<void> {
        try {
            const idOrName = req.params.idOrName

            const band = await this.bandBusiness.getBandByIdOrName(idOrName)

            res.status(200).send(band)

        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}
