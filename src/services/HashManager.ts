import * as bcrypt from "bcryptjs";
import { IHashManager } from "../business/ports";

export class HashManager implements IHashManager {

    public async generateHash( plainText: string ): Promise<string> {
        const cost: number =  Number(process.env.BCRYPT_COST)
        const salt: string = await bcrypt.genSalt(cost)
        const hash: string = await bcrypt.hash(plainText, salt)

        return hash
    }

    public async compareHash( plainText: string, hashText: string ): Promise<boolean> {
        const result = await bcrypt.compare( plainText, hashText )
        
        return result
    }
}
