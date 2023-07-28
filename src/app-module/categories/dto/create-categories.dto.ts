import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  Validate,
  IsNumber,
  IsArray,
} from 'class-validator';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { SubCategoriesEntity } from "../../../common/entities/sub-categories.entity";
import { Status } from "../../../common/entities/status.entity";

export class CreateCategoriesDto {
  @ApiProperty({})
  @IsNotEmpty()
  name: string;

  // @ApiProperty({
  //   required: true,
  //   description: 'ID of file',
  //   example: 'a62cf20f-abe3-4de6-b486-1fd3982c52e9',
  // })
  // @IsUUID()
  // @Validate(IsExist, ['FileEntity', 'id'], {
  //   message: 'Image not exists',
  // })
  // logo: string;

  @ApiProperty({
    // required: true,
    description: 'sub cate',
    // example: ,
  })
  @IsArray()
  subCategories: SubCategoriesEntity[] | string[];

  @ApiProperty({
    description: 'ID of status',
    example: 1,
  })
  @IsNumber()
  @Validate(IsExist, ['Status', 'id'], {
    message: 'Status not exists',
  })
  status: Status | number;
}
