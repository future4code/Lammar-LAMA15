import { CustomError } from "./CustomError";

export class NotBody extends CustomError {
    constructor(){
        super(
            422, 
            `Por favor, insira todos os parâmetros corretamente. 
            Parâmetros 'name', 'email', 'password' e 'role' não foram informados ou estão incorretos!`
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

export class NotEmail extends CustomError {
    constructor(){
        super(
            422, 
            `Por favor, insira todos os parâmetros corretamente. 
            Parâmetro 'email' não foi informado ou está incorreto!`
        )
    }
}

export class NotPassword extends CustomError {
    constructor(){
        super(
            422, 
            `Por favor, insira todos os parâmetros corretamente. 
            Parâmetro 'password' não foi informado ou está incorreto!`
        )
    }
}

export class NotRole extends CustomError {
    constructor(){
        super(
            422, 
            `Por favor, insira todos os parâmetros corretamente. 
            Parâmetro 'role' não foi informado ou está incorreto!`
        )
    }
}

export class NameIsNotString extends CustomError {
    constructor(){
        super(422, "O valor do parâmetro 'name' deve ser do tipo string!")
    }
}

export class EmailIsNotString extends CustomError {
    constructor(){
        super(422, "O valor do parâmetro 'email' deve ser do tipo string!")
    }
}

export class PasswordIsNotString extends CustomError {
    constructor(){
        super(422, "O valor do parâmetro 'password' deve ser do tipo string!")
    }
}

export class InvalidRole extends CustomError {
    constructor(){
        super(422, "Função de usuário inválida. Parâmetro 'role' deve ser 'NORMAL' ou 'ADMIN'.")
    }
}

export class InvalidEmail extends CustomError {
    constructor(){
        super(422, "Email inválido, ex: emailexemplo@email.com")
    }
}

export class InvalidPassword extends CustomError {
    constructor(){
        super(422, "Senha inválida, O valor do parâmetro 'password' deve conter 8 caracteres ou mais!")
    }
}

export class PasswordNoSpaces extends CustomError {
    constructor(){
        super(422, "Senha inválida, O valor do parâmetro 'password' não pode conter espaços!")
    }
}

export class RegisteredUser extends CustomError {
    constructor(){
        super(409, "Já existe um usuário cadastrado com o email informado!")
    }
}

export class UserNotFound extends CustomError{ 
    constructor(){
        super(404, "Usuário não encontrado, por favor verifique o email informado e tente novamente!")
    }
}

export class NotBodyLogin extends CustomError {
    constructor(){
        super(
            422, 
            `Por favor, insira todos os parâmetros corretamente. 
            Parâmetros 'email' ou 'password' não foram informados ou estão incorretos!`
        )
    }
}

export class InvalidPasswordLogin extends CustomError {
    constructor(){
        super(422, "Senha incorreta!")
    }
}

export class UserUnauthorized extends CustomError{ 
    constructor(){
        super(401, "Usuário não autorizado. Token de acesso Inválido!")
    }
}

export class NotUserToken extends CustomError {
    constructor(){
        super(422, "Informe o token de usuário através do parâmetro 'Authorization'!" )
    }
}
