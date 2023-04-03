import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { UserRepository } from "../business/user/UserRepository";
import { CustomError } from "../error/CustomError";

export class UserDatabase extends BaseDatabase implements UserRepository {

    protected tableName: string = "lama_users"

    public async insertUser(user: User): Promise<void> {
        try {
            await BaseDatabase.connection.raw(`
                INSERT INTO ${this.tableName} (id, name, email, password, role)
                VALUES (
                    '${user.getId()}', 
                    '${user.getName()}', 
                    '${user.getEmail()}',
                    '${user.getPassword()}', 
                    '${user.getRole()}'
                )`
            )
            
        } catch (err:any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    public async getUserByEmail(email: string): Promise<User | undefined> {
        try {
            const result = await BaseDatabase.connection.raw(`
                SELECT * from ${this.tableName} WHERE email = '${email}'
            `)

            return User.toUserModel(result[0][0])

        } catch (err:any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    public async getUserById(id: string): Promise<User | undefined> {
        try {
            const result = await BaseDatabase.connection.raw(`
                SELECT * from ${this.tableName} WHERE id = '${id}'
            `)

            return User.toUserModel(result[0][0])
            
        } catch (err:any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}
