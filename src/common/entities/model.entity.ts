import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from "./status.entity";

@Entity()
export class Model extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price?: number;

  @Column({
    nullable: true,
  })
  parent: string;

  @Column()
  priceBeforeDiscount: number;

  @Column()
  stock: number;

  @Column({ default: 0 })
  sold?: number;

  // @Column({nullable:true})
  // image?: string;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
