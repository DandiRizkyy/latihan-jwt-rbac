import { Role } from "../enums/user.enums";

export class CreateUser{
    email:string;
    password: string;
    roles: Role
}