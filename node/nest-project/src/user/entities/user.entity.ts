
import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'
 
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    order_id: string
 
    @Column()
    order_name: string
}