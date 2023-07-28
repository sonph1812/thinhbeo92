import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Status } from "../../../common/entities/status.entity";

export class FilterBrandDto {
  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  status?: Status;
}
