import { User, UserOutput, UserRole } from "../../src/model/User";

export const userMock = new User(
    "id",
    "Usuário de teste",
    "teste@email.com",
    "12345678",
    UserRole.NORMAL
)

export const userMockOutput: UserOutput = {
    id: userMock.getId(),
    name: userMock.getName(),
    email: userMock.getEmail(),
    role: userMock.getRole()
}
