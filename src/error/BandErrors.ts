import { CustomError } from "./CustomError";

export class NotBody extends CustomError {
    constructor(){
        super(
            422, 
            `Por favor, insira todos os parâmetros corretamente. 
            Parâmetros 'name' 'musicGenre', 'responsible' e 'userToken' não foram informados ou estão incorretos!`
        )
    }
}

export class NotName extends CustomError {
    constructor(){
        super(
            422, 
            `Por favor, insira todos os parâmetros corretamente. 
            Parâmetro 'name' não foi informado ou está incorreto!`
        )
    }
}

export class NotmusicGenre extends CustomError {
    constructor(){
        super(
            422, 
            `Por favor, insira todos os parâmetros corretamente. 
            Parâmetro 'musicGenre' não foi informado ou está incorreto!`
        )
    }
}

export class Notresponsible extends CustomError {
    constructor(){
        super(
            422, 
            `Por favor, insira todos os parâmetros corretamente. 
            Parâmetro 'responsible' não foi informado ou está incorreto!`
        )
    }
}

export class NotUserToken extends CustomError {
    constructor(){
        super(
            422, 
            `Por favor, insira todos os parâmetros corretamente. 
            Parâmetro 'userToken' não foi informado ou está incorreto!`
        )
    }
}

export class NameIsNotString extends CustomError {
    constructor(){
        super(422, "O valor do parâmetro 'name' deve ser do tipo string!")
    }
}

export class MusicGenreIsNotString extends CustomError {
    constructor(){
        super(422, "O valor do parâmetro 'musicGenre' deve ser do tipo string!")
    }
}

export class ResponsibleIsNotString extends CustomError {
    constructor(){
        super(422, "O valor do parâmetro 'responsible' deve ser do tipo string!")
    }
}

export class RegisteredBand extends CustomError {
    constructor(){
        super(409, "Já existe uma banda cadastrado com o nome informado!")
    }
}

export class UserUnauthorized extends CustomError{ 
    constructor(){
        super(401, "Usuário não autorizado. Somente Usuário do tipo 'ADMIN' podem registra bandas.")
    }
}

export class NotidOrName extends CustomError{ 
    constructor(){
        super(401, "Por favor insira o 'id' ou 'name' da banda que deseja buscar!")
    }
}

export class BandNotFound extends CustomError{ 
    constructor(){
        super(404, "Banda não encontrada, por favor verifique o id ou nome informado e tente novamente!")
    }
}
