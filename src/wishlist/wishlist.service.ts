import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishlistService {
    constructor(private prismaService: PrismaService){}

    // business logic get all wishlist

    // business logic get wishlist by id + show relation between wishlist and product

    // business logic create wishlist
    
    // business logic update wishlist (PUT)

    // business logic update wishlist (PATCH)

    // business logic delete wishlist
}
