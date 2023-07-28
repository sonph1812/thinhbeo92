import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Status } from "../../../common/entities/status.entity";

export class FilterCategoriesDto {
  @ApiProperty({
    example: 'Iphone',
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  status?: Status;
}
