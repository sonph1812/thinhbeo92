
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Role } from "../../../common/entities/role.entity";
import { Status } from "../../../common/entities/status.entity";

export class FliterUserDto {
  @ApiProperty()
  @IsOptional()
  fullName?: string | null;

  @ApiProperty()
  @IsOptional()
  birthday?: Date;

  @ApiProperty()
  @IsOptional()
  gender?: number;

  @ApiProperty()
  @IsOptional()
  role?: Role | null;

  @ApiProperty()
  @IsOptional()
  status?: Status;
}
