import { Request, Response } from "express";
import { UserBusiness } from "../business/user/UserBusiness";
import { LoginInputDTO, UserInputDTO } from "../model/User";

export class UserController {
    constructor(private userBusiness: UserBusiness){}

    public async signup(req: Request, res: Response) {
        try {
            const { name, role, email, password } = req.body

            const input: UserInputDTO = {
                name,
                email,
                password, 
                role
            }

            const accessToken = await this.userBusiness.signup(input)

            res.status(201).send({ message: "Novo usuário cadastrado com sucesso!", accessToken })
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }

    public async login( req: Request, res: Response ): Promise<void> {
        try {
            const { email, password } = req.body

            const input: LoginInputDTO = {
                email,
                password
            }

            const accessToken = await this.userBusiness.login(input)

            res.status(200).send({ message: "Login feito com sucesso!", accessToken })

        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}
