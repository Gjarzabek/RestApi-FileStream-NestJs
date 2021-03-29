import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'products' })
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 60})
    title: string;

    @Column({type: 'text'})
    description: string;

    @Column()
    price: number;

}