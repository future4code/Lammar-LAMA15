export class Band{
    constructor(
        private id: string,
        private name: string,
        private musicGenre: string,
        private responsible: string
    ){}

    getId(){
        return this.id
    }

    getName(){
        return this.name
    }

    getMusicGenre(){
        return this.musicGenre
    }

    getResponsible(){
        return this.responsible
    }

    setId(id: string){
        this.id = id
    }

    setName(name: string){
        this.name = name
    }

    setMusicGenre(musicGenre: string){
        this.musicGenre = musicGenre
    }

    setResponsible(responsible: string){
        this.responsible = responsible
    }

    static toBandModel(band: any): Band | undefined {
        return band && new Band(band.id, band.name, band.musicGenre, band.responsible)
    }
}

export interface BandInputDTO {    
    name: string,
    musicGenre: string,
    responsible: string,
    userToken: string
}

export interface BandOutput {
    id: string | undefined,
    name: string | undefined,
    musicGenre: string | undefined,
    responsible: string | undefined
}
