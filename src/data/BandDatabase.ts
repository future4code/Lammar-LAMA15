import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../model/Band";
import { BandRepository } from "../business/band/BandRepository";
import { CustomError } from "../error/CustomError";

export class BandDatabase extends BaseDatabase implements BandRepository {

    protected tableName: string = "lama_bands"

    public async insertBand(band: Band): Promise<void> {
        try {
            await BaseDatabase.connection.raw(`
                INSERT INTO ${this.tableName} (id, name, music_genre, responsible)
                VALUES (
                    '${band.getId()}', 
                    '${band.getName().trim().replace(" ", "-")}', 
                    '${band.getMusicGenre()}',
                    '${band.getResponsible()}'
                )`
            )
            
        } catch (err:any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    public async getBandByName(name: string ): Promise<Band | undefined> {
        try {
            const result = await BaseDatabase.connection.raw(`
                SELECT * from ${this.tableName} WHERE LOWER(name) = '${name.toLowerCase()}'
            `)

            return Band.toBandModel(result[0][0])

        } catch (err:any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    public async getBandById(id: string): Promise<Band | undefined> {
        try {
            const result = await BaseDatabase.connection.raw(`
                SELECT * from ${this.tableName} WHERE id = '${id}'
            `)

            return Band.toBandModel(result[0][0])
            
        } catch (err:any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}
