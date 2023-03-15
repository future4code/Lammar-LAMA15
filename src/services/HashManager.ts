import * as bcrypt from "bcryptjs";

export class HashManager {

    public generateHash = async ( plainText: string ): Promise<string> => {
        const cost: number =  Number(process.env.BCRYPT_COST)
        const salt: string = await bcrypt.genSalt(cost)
        const hash: string = await bcrypt.hash(plainText, salt)
        return hash
    }

    public compareHash = async ( plainText: string, hashText: string ): Promise<boolean> => {
        const result = await bcrypt.compare( plainText, hashText )
        return result
    }

}
