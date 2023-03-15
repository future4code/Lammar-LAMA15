import * as jwt from "jsonwebtoken";
import { IAuthenticator } from "../business/ports";
import { UserUnauthorized } from "../error/UserErrors";
import { AuthenticationData } from "../model/User";

export class Authenticator implements IAuthenticator {
    
    public generateToken(input: AuthenticationData): string {
        const token = jwt.sign(
            {id: input.id, role: input.role},
            process.env.JWT_KEY as string,
            {expiresIn: "1h"}
        )

        return token
    }

    public getTokenData(token: string): AuthenticationData {

        try {
            const payload = jwt.verify(token, process.env.JWT_KEY as string)  as AuthenticationData

            const result = {
                id: payload.id,
                role: payload.role
            }
            
            return result

        } catch (error:any) {
            console.log(error.message)
            throw new UserUnauthorized()
        }
    }
}
