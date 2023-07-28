import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Status } from "../../../common/entities/status.entity";

export class FilterBannerDto {
  @ApiProperty()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example:
      '1: main banner, 2: right banner, 3: simple big banner, 4: simple small banner, 5: left banner',
  })
  @IsOptional()
  type?: number;

  @ApiProperty()
  @IsOptional()
  link?: string;

  @ApiProperty()
  @IsOptional()
  status?: Status;
}
