import { ApiProperty } from '@nestjs/swagger';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { FileEntity } from './file.entity';
import { Status } from "./status.entity";
import { Categories } from "./categories.entity";
import { Brand } from "./brand.entity";
import { TierModel } from './tier-model.entity';
import { User } from "./user.entity";

@Entity()
export class Product extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @BeforeInsert()
  @BeforeUpdate()
  setSlug() {
    this.slug = `${this.name?.split(' ').join('_')}_${new Date().getTime()}`;
  }

  @BeforeInsert()
  @BeforeUpdate()
  setPrice() {
    if (this.discount) {
      this.price =
        this.priceBeforeDiscount -
        Math.floor((this.priceBeforeDiscount * this.discount) / 100);
    } else {
      this.price = this.priceBeforeDiscount;
    }
  }

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  @JoinColumn()
  image: FileEntity | string;

  @ApiProperty()
  @ManyToMany(() => FileEntity, {
    eager: true,
  })
  @JoinTable()
  images: FileEntity[] | string[];

  @ApiProperty()
  @Column({ default: 0 })
  likedCount?: number;

  @ApiProperty()
  @Column()
  discount?: number | null;

  @ApiProperty()
  @Column({ type: "bigint", default: 0 })
  stock?: number;

  @ApiProperty()
  @Column()
  price?: number;

  @ApiProperty()
  @Column()
  priceBeforeDiscount: number | null;

  @ApiProperty()
  @Column({ default: 0 })
  sold?: number | null;

  @ApiProperty()
  @Column({ default: 0 })
  viewCount?: number | null;

  @ApiProperty()
  @ManyToOne(() => Status, (status) => status.id)
  status?: Status | number;

  @ApiProperty()
  @ManyToOne(() => Categories, (cate) => cate.id)
  categories: Categories | number;

  @ApiProperty()
  @ManyToOne(() => Brand, {
    eager: true,
  })
  brand: Brand | number;

  @ManyToMany(() => TierModel, {
    eager: true,
  })
  @JoinTable({
    name: 'product_tierModel',
  })
  tierModels: TierModel[] | string[];

  @ManyToMany(() => User, { eager: false })
  @JoinTable({
    name: 'likes',
  })
  likedUsers: User[];

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  keywords?: string[] | null;

  @ApiProperty()
  @Column({ nullable: true, default: {}, name: 'params', type: 'jsonb' })
  params?: Record<string, unknown>;

  @ApiProperty()
  @Column({ nullable: true })
  slug?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
