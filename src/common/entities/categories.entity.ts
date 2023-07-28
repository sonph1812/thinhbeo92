import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { FileEntity } from "./file.entity";
import { Banner } from "./banner.entity";
import { Status } from "./status.entity";

@Entity()
export class Categories extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  logo: FileEntity | string;

  @ManyToMany(() => Banner, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinTable({
    name: 'categories_banners',
  })
  banners: Banner[] | number[];

  @ManyToOne(() => Status, {
    eager: true,
  })
  status: Status | number;

  @Column({ nullable: true })
  slug: string;

  @BeforeInsert()
  @BeforeUpdate()
  setSlug() {
    this.slug = `${this.name?.split(' ').join('_')}_${new Date().getTime()}`;
  }
}
