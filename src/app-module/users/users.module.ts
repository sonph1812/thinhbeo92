import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "../../common/entities/user.entity";
import { Role } from "../../common/entities/role.entity";
import { Status } from "../../common/entities/status.entity";


@Module({
  imports: [TypeOrmModule.forFeature([User,Role,Status])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
