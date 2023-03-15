import { Request, Response } from "express";
import { UserBusiness } from "../business/user/UserBusiness";
import { UserInputDTO } from "../model/User";

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

            res.status(200).send({ message: "Novo usuário cadastrado com sucesso!", accessToken })
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}
