import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerModule } from 'src/app-module/banner/banner.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Categories } from "../../common/entities/categories.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Categories]), BannerModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
