import { User, UserRole } from "../../src/model/User";

export const userMock = new User(
    "id",
    "Usuário de teste",
    "teste@email.com",
    "12345678",
    UserRole.NORMAL
)
