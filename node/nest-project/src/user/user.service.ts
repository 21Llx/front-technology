import { Injectable } from '@nestjs/common';

import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(@InjectRepository(Order) private readonly order: Repository<Order>) { }
  create(createUserDto) {
    const data = new Order()
    data.order_id = createUserDto.id
    data.order_name = createUserDto.name
    return this.order.save(data)
  }
 
  async findAll(query: { name: string, page: number, pageSize: number }={name:'',page:1,pageSize:10}) {

    
    const data = await this.order.find({
      where: {
        order_name: Like(`%${query.name}%`)
      },
      order: {
        order_id: "DESC"
      },
      skip: (query.page - 1)* query.pageSize,
      take:query.pageSize,
    })
    const total = await this.order.count({
      where: {
        order_name: Like(`%${query.name}%`)
      },
    })
    return {
      data,
      total
    }
  }
  findOne(id){

  }
  update(id: number, updateUserDto) {
    return this.order.update(id, updateUserDto)
  }
 
  remove(id: number) {
    return this.order.delete(id)
  }
}