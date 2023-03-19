import { Band, BandOutput } from "../../../src/model/Band"

export const bandMock = new Band(
    "id",
    "banda teste",
    "genero musical",
    "resonsavel"
)

export const bandMockOutput: BandOutput = {
    id: bandMock.getId(),
    name: bandMock.getName(),
    musicGenre: bandMock.getMusicGenre(),
    responsible: bandMock.getResponsible()
}
