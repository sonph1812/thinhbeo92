import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from "../statuses/entities/status.entity";
import { Role } from "../roles/entities/role.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User,Role,Status])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
