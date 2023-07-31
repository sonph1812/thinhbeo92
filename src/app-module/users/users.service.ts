import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from "../shared/services/base.service";
import { User } from "../../common/entities/user.entity";

@Injectable()
export class UsersService extends BaseService<User, Repository<User>> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(usersRepository, 'user');
  }

  async softDelete(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
 async  save(data){
    return await this.usersRepository.save(data)
 }
}
