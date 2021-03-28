import { Controller, Post, Body, Get, Param, Patch, Delete} from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('product')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ): any {
        const generatedId = this.productsService.insertProcut(prodTitle, prodDesc, prodPrice);
        return {id : generatedId};
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
        ) {
        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;      
    }
}