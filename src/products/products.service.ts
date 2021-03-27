import { Injectable, NotFoundException } from "@nestjs/common";
import { INSTANCE_ID_SYMBOL } from "@nestjs/core/injector/instance-wrapper";

import {Product} from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod=>prod.id === id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Wrong product Id');
        }
        return [product, productIndex];
    }

    insertProcut(title: string, desc: string, price: number) {
        const prodId = Math.random().toString().substring(2, 8);
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getSingleProduct(productId: string) {
        return {...this.findProduct(productId)[0]};
    }

    updateProduct(productId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productId);
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
        this.products[index] = updatedProduct;
    }
}