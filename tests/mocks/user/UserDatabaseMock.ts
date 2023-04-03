import { UserRepository } from "../../../src/business/user/UserRepository";
import { User } from "../../../src/model/User";
import { userMock } from "./UserMock";

export class UserDatabaseMock implements UserRepository {
    public async insertUser(user: User): Promise<void> {}

    public async getUserByEmail(email: string): Promise<User | undefined> {
       return email === "teste@email.com" ? userMock : undefined
    }

    public async getUserById(id: string): Promise<User | undefined> {
        return id === "id" ? userMock : undefined
    }
}
