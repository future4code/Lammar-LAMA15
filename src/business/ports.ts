import { AuthenticationData } from "../model/User";

export interface IHashManager {
    generateHash(plainText: string): Promise <string>

    compareHash(plainText: string, hashText: string): Promise <boolean>
}

export interface IIdGenerator {
    generate(): string
}

export interface IAuthenticator {
    generateToken(input: AuthenticationData): string

    getTokenData(token: string): AuthenticationData
}
