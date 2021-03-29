import { ImATeapotException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './products.entity'

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(ProductEntity) private readonly productRepo: Repository<ProductEntity>) {}

    private async findProduct(id: string): Promise<ProductEntity> {
        const product: ProductEntity = await this.productRepo.findOne(id);
        if (!product) {
            throw new NotFoundException('Wrong product Id');
        }
        return product;
    }

    async insertProduct(title: string, desc: string, price: number) {
        const insertResult = await this.productRepo.insert({
            title: title,
            description: desc,
            price: price
        });

        if (!insertResult || !insertResult.identifiers) {
            throw new ImATeapotException();
        }
        return insertResult.identifiers[0];
    }

    async getSingleProduct(productId: string) {
        return await this.findProduct(productId);
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        const product = await this.findProduct(productId);
        const updatedProduct = {...product};
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        const updateResult = await this.productRepo.update(product.id, updatedProduct);
        
        if (!updateResult || updateResult.affected < 1)
            throw new NotFoundException('Wrong product Id');
    }
}