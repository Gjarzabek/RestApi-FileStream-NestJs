import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 55, unique: true })
    username: string;
    
    @Column({ length: 60 })
    firstname: string;

    @Column({ length: 60 })
    lastname: string;

    @Column({ type: 'text' })
    password: string;
}
