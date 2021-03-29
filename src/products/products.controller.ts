import { Controller, Post, Body, Get, Param, Patch, UseGuards} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ProductsService } from "./products.service";

@Controller('product')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @UseGuards(JwtAuthGuard)
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