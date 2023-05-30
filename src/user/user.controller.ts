import { Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    // get all users
    @Get()
    async getAllUsers(){
        await this.userService.getAllUsers()
    }

    // update user(PATCH)
    @Patch(':id')
    async updateUserPatch(@Param('id', ParseIntPipe) id: number){
        await this.userService.updateUser(id)
    }

    // delete user
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number){
        await this.userService.deleteUser(id)
    }
}
