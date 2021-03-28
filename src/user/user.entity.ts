import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum UserType {
    basic = 'basic',
    premium = 'premium'
}

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 55, unique: true })
    name: string;

    @Column({ type: 'text'})
    password: string;

    @Column({ length: 60, unique: true })
    email: string;

    @Column({ type:'enum', enum: UserType, default: UserType.basic})
    role: UserType;
}
