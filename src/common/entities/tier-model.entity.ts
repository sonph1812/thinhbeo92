
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from "./status.entity";
import { Model } from "./model.entity";

@Entity()
export class TierModel extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status: Status;

  @ManyToMany(() => Model, {
    eager: true,
  })
  @JoinTable({
    name: 'tierModel_model',
  })
  models: Model[] | string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
