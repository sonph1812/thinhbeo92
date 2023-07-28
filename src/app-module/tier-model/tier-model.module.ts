import { Module } from '@nestjs/common';
import { TierModelService } from './tier-model.service';
import { TierModelController } from './tier-model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelModule } from 'src/app-module/model/model.module';
import { Model } from "../../common/entities/model.entity";
import { TierModel } from "../../common/entities/tier-model.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TierModel, Model]), ModelModule],
  controllers: [TierModelController],
  providers: [TierModelService],
  exports: [TierModelService],
})
export class TierModelModule {}
