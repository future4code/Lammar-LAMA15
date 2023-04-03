import { BandRepository } from "../../../src/business/band/BandRepository";
import { Band } from "../../../src/model/Band";
import { bandMock } from "./BandMock";

export class BandDatabaseMock implements BandRepository {
    public async insertBand(band: Band): Promise<void> {}

    public async getBandByName(name: string): Promise<Band | undefined> {
       return name === "banda teste" ? bandMock : undefined
    }

    public async getBandById(id: string): Promise<Band | undefined> {
        return id === "id" ? bandMock : undefined
    }
}
