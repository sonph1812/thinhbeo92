import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/app-module/categories/categories.module';
import { Brand } from 'src/common/entities/brand.entity';
import { IsNotExistSub } from 'src/utils/validators/is-not-exsist-sub.validator';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand]), CategoriesModule],
  controllers: [BrandController],
  providers: [BrandService, IsNotExistSub],
})
export class BrandModule {}
