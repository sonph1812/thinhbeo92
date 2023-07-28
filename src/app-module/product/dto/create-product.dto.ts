import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { CreateModelDto } from 'src/app-module/model/dto/create-model.dto';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { TierModel } from "../../../common/entities/tier-model.entity";
import { Model } from "../../../common/entities/model.entity";
import { FileEntity } from "../../../common/entities/file.entity";
import { Categories } from "../../../common/entities/categories.entity";
import { Brand } from "../../../common/entities/brand.entity";
import { Status } from "../../../common/entities/status.entity";

class TierModelDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  tierModel?: TierModel | string;

  @ApiProperty({ type: [CreateModelDto] })
  @IsNotEmpty()
  @IsArray()
  models: Model[] | CreateModelDto[];
}

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Validate(IsNotExist, ['Product'], {
    message: 'Name already exists',
  })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'ID of file',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  @Validate(IsExist, ['FileEntity', 'id'], {
    message: 'Image not exists',
  })
  image: FileEntity | string;

  @ApiPropertyOptional({
    description: 'ID of file',
    type: [String],
    required: false,
  })
  @IsNotEmpty()
  @IsArray()
  images: FileEntity[] | string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  discount?: number | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stock?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  priceBeforeDiscount?: number | null;

  @ApiProperty({ description: 'Id of categories', type: String })
  @IsNotEmpty()
  @IsNumber()
  @Validate(IsExist, ['Categories', 'id'], {
    message: 'Categories not exists',
  })
  categories: Categories | number;

  @ApiProperty({ description: 'Id of brand', type: String })
  @IsNotEmpty()
  @IsNumber()
  @Validate(IsExist, ['Brand', 'id'], {
    message: 'Brand not exists',
  })
  brand: Brand | number;

  @ApiProperty({ type: [TierModelDto] })
  @IsNotEmpty()
  @IsArray()
  tierModels?: TierModelDto[] | TierModel[];

  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsArray()
  keywords: string[] | null;

  @ApiProperty({
    description: 'ID of status',
    type: Number,
  })
  @IsNumber()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status: Status | number;
}
