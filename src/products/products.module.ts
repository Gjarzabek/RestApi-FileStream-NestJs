import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from "./products.service";
import { ProductEntity } from './products.entity'

@Module({
    imports: [TypeOrmModule.forFeature([ProductEntity])],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}