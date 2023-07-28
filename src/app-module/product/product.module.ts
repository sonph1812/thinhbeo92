import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerModule } from 'src/app-module/banner/banner.module';
import { FilesModule } from 'src/app-module/files/files.module';
import { ModelModule } from 'src/app-module/model/model.module';
import { TierModelModule } from 'src/app-module/tier-model/tier-model.module';
import { UsersModule } from 'src/app-module/users/users.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from "../../common/entities/product.entity";
import { OrderProducts } from "../../common/entities/order-products.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, OrderProducts]),
    BannerModule,
    TierModelModule,
    ModelModule,
    FilesModule,
    UsersModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
