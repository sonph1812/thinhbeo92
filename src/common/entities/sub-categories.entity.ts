import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityHelper } from "../../utils/entity-helper";
import { Categories } from "./categories.entity";

@Entity()
export class SubCategoriesEntity  extends EntityHelper{
  @PrimaryGeneratedColumn({type:"bigint"})
  // @ManyToOne(()=>Categories,(Cate)=>Cate.subCategories)
  id:number

  @Column({type:"varchar"})
  subcategories:string

}
