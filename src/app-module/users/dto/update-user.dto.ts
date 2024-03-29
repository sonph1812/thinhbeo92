import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  MinLength,
  Validate,
} from 'class-validator';
import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';
import { IsExist } from '../../../utils/validators/is-exists.validator';
import { Status } from "../../../common/entities/status.entity";
import { FileEntity } from "../../../common/entities/file.entity";
import { Role } from "../../../common/entities/role.entity";


export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @Validate(IsNotExist, ['User'], {
    message: 'Email already exists',
  })
  @IsEmail()
  email?: string | null;

  @ApiProperty()
  @IsOptional()
  @Validate(IsNotExist, ['User'], {
    message: 'userName already exists',
  })
  username?: string | null;

  @ApiProperty()
  @IsOptional()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty()
  @IsOptional()
  birthday?: Date;

  @ApiProperty()
  @IsOptional()
  gender?: number;

  @ApiProperty()
  @IsPhoneNumber('VN')
  phoneNumber?: string;

  @ApiProperty({ example: 'sonpham' })
  @IsOptional()
  fullName?: string | null;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image not exists',
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: Role })
  @IsOptional()
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null;

  @ApiProperty({ type: Status })
  @IsOptional()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status?: Status;

  hash?: string | null;
}
