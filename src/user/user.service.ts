import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService){}

    // business logic get all users
    async getAllUsers(){
        return `this functtion return all users`
    }

    // business logic patch user
    async updateUser(id: number){
        return `this function update current user`
    }

    // business logic delete user
    async deleteUser(id: number){
        return `this function delete user with id ${id}`
    }
}
