import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
  IsPhoneNumber,
} from 'class-validator';

import { IsNotExist } from '../../../utils/validators/is-not-exists.validator';
import { IsExist } from '../../../utils/validators/is-exists.validator';
import { Status } from "../../../common/entities/status.entity";
import { FileEntity } from "../../../common/entities/file.entity";
import { Role } from "../../../common/entities/role.entity";

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: 'Email already exists',
  })
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'sonpham' })
  fullName?: string | null;

  @ApiProperty()
  birthday?: Date;

  @ApiProperty()
  gender?: number;

  @ApiProperty()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiProperty({ type: () => FileEntity })
  @IsOptional()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image not exists',
  })
  photo?: FileEntity | null;

  @ApiProperty({ type: Role })
  @Validate(IsExist, ['Role', 'id'], {
    message: 'roleNotExists',
  })
  role?: Role | null;

  @ApiProperty({ type: Status })
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status?: Status;

  hash?: string | null;
}
