import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsOptional, Validate } from "class-validator";
import { Categories } from "../entity/categories.entity";

export class CreateSubCategories {
  @ApiProperty({
  })
  @IsNotEmpty()
  subcategories: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  parentCategory: Categories

}
