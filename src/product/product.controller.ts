import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    // get all products
    @Get()
    async getAllProducts(){}

    // get product by id
    @Get(':id')
    async getProductById(@Param('id', ParseIntPipe) id: number){}
    
    // search product using query
    

    // create product

    // update product

    // put product

    // patch product

    // delete product

}
